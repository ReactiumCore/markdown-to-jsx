"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Registry = void 0;
var _underscore = _interopRequireDefault(require("underscore"));
var _objectPath = _interopRequireDefault(require("object-path"));
var _uuid = require("uuid");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Registry = exports.Registry = /*#__PURE__*/function () {
  function Registry(name, idField) {
    var mode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Registry.MODES.HISTORY;
    _classCallCheck(this, Registry);
    this.__name = name || 'Registry';
    this.__idField = idField || 'id';
    this.__registered = [];
    this.__protected = {};
    this.__unregister = {};
    this.__banned = {};
    this.__subscribers = {};
    this.__mode = mode in Registry.MODES ? mode : Registry.MODES.HISTORY;
  }
  return _createClass(Registry, [{
    key: "protected",
    get: function get() {
      return Object.values(this.__protected);
    }
  }, {
    key: "registered",
    get: function get() {
      return this.__registered;
    }
  }, {
    key: "unregistered",
    get: function get() {
      return Object.values(this.__unregister);
    }
  }, {
    key: "banned",
    get: function get() {
      return Object.values(this.__banned);
    }
  }, {
    key: "listById",
    get: function get() {
      var _this = this;
      var unregister = this.__unregister;
      var banned = this.__banned;
      var registered = Array.from(this.__registered).filter(function (item) {
        return !(item[_this.__idField] in unregister) && !(item[_this.__idField] in banned);
      });
      return _underscore.default.chain(registered).sortBy('order').indexBy(this.__idField).value();
    }
  }, {
    key: "list",
    get: function get() {
      return Object.values(this.listById);
    }
  }, {
    key: "mode",
    get: function get() {
      return this.__mode;
    },
    set: function set() {
      var newMode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Registry.MODES.HISTORY;
      this.__mode = newMode in Registry.MODES ? newMode : Registry.MODES.HISTORY;
    }
  }, {
    key: "get",
    value: function get(id, defaultValue) {
      return _objectPath.default.get(this.listById, [id], defaultValue);
    }
  }, {
    key: "isProtected",
    value: function isProtected(id) {
      return id in this.__protected;
    }
  }, {
    key: "isRegistered",
    value: function isRegistered(id) {
      return !!_underscore.default.findWhere(this.__registered, {
        id: id
      });
    }
  }, {
    key: "isUnRegistered",
    value: function isUnRegistered(id) {
      return !(id in this.listById);
    }
  }, {
    key: "isBanned",
    value: function isBanned(id) {
      return id in this.__banned;
    }
  }, {
    key: "ban",
    value: function ban(id) {
      var _this2 = this;
      var ids = _underscore.default.flatten([id]);
      ids.forEach(function (id) {
        return _objectPath.default.set(_this2.__banned, [id], id);
      });
      if (this.__mode === Registry.MODES.CLEAN) {
        this.cleanup(id);
      }
      this.notify({
        type: 'ban',
        id: id
      });
      return this;
    }
  }, {
    key: "cleanup",
    value: function cleanup(id) {
      var _this3 = this;
      var _$flatten = _underscore.default.flatten([id]),
        _$flatten2 = _slicedToArray(_$flatten, 1),
        remove = _$flatten2[0];
      if (this.isProtected(remove)) return this;
      this.__registered = this.__registered.filter(function (item) {
        return item[_this3.__idField] !== remove;
      });
      this.notify({
        type: 'cleanup',
        id: id
      });
      return this;
    }
  }, {
    key: "flush",
    value: function flush() {
      this.__registered = [];
      this.__protected = {};
      this.__unregister = {};
      this.__banned = {};
      this.notify({
        type: 'flush'
      });
    }
  }, {
    key: "protect",
    value: function protect(id) {
      var _this4 = this;
      var ids = _underscore.default.flatten([id]);
      ids.forEach(function (id) {
        return _objectPath.default.set(_this4.__protected, [id], id);
      });
      this.notify({
        type: 'protect',
        id: id
      });
      return this;
    }
  }, {
    key: "register",
    value: function register(id) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      // one argument register
      if (_typeof(id) === 'object' && this.__idField in id) {
        data = id;
        id = data[this.__idField];
      }
      if (!id) id = (0, _uuid.v4)();
      if (this.isBanned(id)) {
        return new Error("".concat(this.__name, " unable to register banned item ").concat(id));
      }
      if (this.isProtected(id) && this.isRegistered(id)) {
        return new Error("".concat(this.__name, " unable to replace protected item ").concat(id));
      }
      data['order'] = _objectPath.default.get(data, 'order', 100);
      var item = _objectSpread(_objectSpread({}, data), {}, _defineProperty({}, this.__idField, id));
      if (this.__mode === Registry.MODES.CLEAN) {
        this.cleanup(id);
      }
      this.__registered.push(item);
      _objectPath.default.del(this.__unregister, [id]);
      this.notify({
        type: 'register',
        id: id,
        data: item
      });
      return this;
    }
  }, {
    key: "unprotect",
    value: function unprotect(id) {
      var _this5 = this;
      var ids = _underscore.default.flatten([id]);
      ids.forEach(function (id) {
        return _objectPath.default.del(_this5.__protected, id);
      });
      this.notify({
        type: 'unprotect',
        id: id
      });
      return this;
    }
  }, {
    key: "unregister",
    value: function unregister(id) {
      var _this6 = this;
      if (!id) return this;
      var ids = _underscore.default.chain([id]).flatten().uniq().value();
      ids.forEach(function (id) {
        if (id in _this6.__protected) return;
        if (_this6.__mode === Registry.MODES.CLEAN) {
          _this6.cleanup(id);
          return;
        }
        _objectPath.default.set(_this6.__unregister, [id], id);
      });
      this.notify({
        type: 'unregister',
        id: id
      });
      return this;
    }
  }, {
    key: "subscribe",
    value: function subscribe(cb, id) {
      var _this7 = this;
      if (!id) id = (0, _uuid.v4)();
      if (typeof cb === 'function') {
        this.__subscribers[id] = cb;
      }
      return function () {
        return _this7.unsubscribe(id);
      };
    }
  }, {
    key: "unsubscribe",
    value: function unsubscribe(id) {
      _objectPath.default.del(this.__subscribers, [id]);
    }
  }, {
    key: "unsubscribeAll",
    value: function unsubscribeAll() {
      this.__subscribers = {};
    }
  }, {
    key: "notify",
    value: function notify(context) {
      var _this8 = this;
      Object.entries(this.__subscribers).forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
          id = _ref2[0],
          cb = _ref2[1];
        if (typeof cb === 'function') cb(_this8, context);
      });
    }
  }]);
}();
Registry.MODES = {
  HISTORY: 'HISTORY',
  CLEAN: 'CLEAN'
};

//# sourceMappingURL=Registry.js.map