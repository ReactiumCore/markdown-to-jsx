import _ from 'underscore';
import op from 'object-path';
import { v4 as uuid } from 'uuid';

export class Registry {
    constructor(name, idField, mode = Registry.MODES.HISTORY) {
        this.__name = name || 'Registry';
        this.__idField = idField || 'id';
        this.__registered = [];
        this.__protected = {};
        this.__unregister = {};
        this.__banned = {};
        this.__subscribers = {};
        this.__mode = mode in Registry.MODES ? mode : Registry.MODES.HISTORY;
    }

    get protected() {
        return Object.values(this.__protected);
    }

    get registered() {
        return this.__registered;
    }

    get unregistered() {
        return Object.values(this.__unregister);
    }

    get banned() {
        return Object.values(this.__banned);
    }

    get listById() {
        const unregister = this.__unregister;
        const banned = this.__banned;
        const registered = Array.from(this.__registered).filter(
            (item) =>
                !(item[this.__idField] in unregister) &&
                !(item[this.__idField] in banned),
        );

        return _.chain(registered)
            .sortBy('order')
            .indexBy(this.__idField)
            .value();
    }

    get list() {
        return Object.values(this.listById);
    }

    set mode(newMode = Registry.MODES.HISTORY) {
        this.__mode =
            newMode in Registry.MODES ? newMode : Registry.MODES.HISTORY;
    }

    get mode() {
        return this.__mode;
    }

    get(id, defaultValue) {
        return op.get(this.listById, [id], defaultValue);
    }

    isProtected(id) {
        return id in this.__protected;
    }

    isRegistered(id) {
        return !!_.findWhere(this.__registered, { id });
    }

    isUnRegistered(id) {
        return !(id in this.listById);
    }

    isBanned(id) {
        return id in this.__banned;
    }

    ban(id) {
        const ids = _.flatten([id]);
        ids.forEach((id) => op.set(this.__banned, [id], id));

        if (this.__mode === Registry.MODES.CLEAN) {
            this.cleanup(id);
        }

        this.notify({ type: 'ban', id });

        return this;
    }

    cleanup(id) {
        const [remove] = _.flatten([id]);
        if (this.isProtected(remove)) return this;

        this.__registered = this.__registered.filter(
            (item) => item[this.__idField] !== remove,
        );

        this.notify({ type: 'cleanup', id });

        return this;
    }

    flush() {
        this.__registered = [];
        this.__protected = {};
        this.__unregister = {};
        this.__banned = {};

        this.notify({ type: 'flush' });
    }

    protect(id) {
        const ids = _.flatten([id]);
        ids.forEach((id) => op.set(this.__protected, [id], id));

        this.notify({
            type: 'protect',
            id,
        });

        return this;
    }

    register(id, data = {}) {
        // one argument register
        if (typeof id === 'object' && this.__idField in id) {
            data = id;
            id = data[this.__idField];
        }

        if (!id) id = uuid();
        if (this.isBanned(id)) {
            return new Error(
                `${this.__name} unable to register banned item ${id}`,
            );
        }

        if (this.isProtected(id) && this.isRegistered(id)) {
            return new Error(
                `${this.__name} unable to replace protected item ${id}`,
            );
        }

        data['order'] = op.get(data, 'order', 100);
        const item = { ...data, [this.__idField]: id };

        if (this.__mode === Registry.MODES.CLEAN) {
            this.cleanup(id);
        }

        this.__registered.push(item);
        op.del(this.__unregister, [id]);

        this.notify({
            type: 'register',
            id,
            data: item,
        });

        return this;
    }

    unprotect(id) {
        const ids = _.flatten([id]);
        ids.forEach((id) => op.del(this.__protected, id));

        this.notify({
            type: 'unprotect',
            id,
        });

        return this;
    }

    unregister(id) {
        if (!id) return this;

        const ids = _.chain([id]).flatten().uniq().value();

        ids.forEach((id) => {
            if (id in this.__protected) return;

            if (this.__mode === Registry.MODES.CLEAN) {
                this.cleanup(id);
                return;
            }

            op.set(this.__unregister, [id], id);
        });

        this.notify({
            type: 'unregister',
            id,
        });

        return this;
    }

    subscribe(cb, id) {
        if (!id) id = uuid();

        if (typeof cb === 'function') {
            this.__subscribers[id] = cb;
        }

        return () => this.unsubscribe(id);
    }

    unsubscribe(id) {
        op.del(this.__subscribers, [id]);
    }

    unsubscribeAll() {
        this.__subscribers = {};
    }

    notify(context) {
        Object.entries(this.__subscribers).forEach(([id, cb]) => {
            if (typeof cb === 'function') cb(this, context);
        });
    }
}

Registry.MODES = {
    HISTORY: 'HISTORY',
    CLEAN: 'CLEAN',
};
