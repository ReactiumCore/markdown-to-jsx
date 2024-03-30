import React from 'react';
import { marked } from 'marked';
import PropTypes from 'prop-types';
import JsxParser from 'react-jsx-parser';

export const MarkdownJSX = ({
    value,
    markdownParser,
    plainTextParser,
    ...props
}) => {
    const parser = (str) => {
        let plain = String(str).trim();

        if (plainTextParser && typeof plainTextParser === 'function') {
            plain = plainTextParser(plain, marked);
        }

        const ids = [];
        const replacers = Array.from(MarkdownJSX.replacers).filter(({ id }) => {
            if (id && !ids.includes(id)) {
                ids.push(id);
                return true;
            }

            return false;
        });

        let markdown = marked.parse(plain);

        markdown = replacers.reduce((s, item) => {
            if (item.match && item.replace) {
                s = String(s).replace(item.match, item.replace);
            }
            return s;
        }, markdown);

        return markdown;
    };

    return <JsxParser {...props} jsx={parser(value)} />;
};

MarkdownJSX.propTypes = {
    value: PropTypes.string.isRequired,
    plainTextParser: PropTypes.func,
    renderInWrapper: PropTypes.bool,
    renderUnrecognized: PropTypes.func,
};

MarkdownJSX.defaultProps = {
    renderInWrapper: false,
};

MarkdownJSX.replacers = [];

MarkdownJSX.replacers.push({
    id: 'heading',
    match: /<h([1-6])>(.+)<\/h[1-6]>/gim,
    replace: '<h$1><span>$2</span></h$1>',
});
