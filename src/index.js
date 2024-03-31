import React from 'react';
import { marked } from 'marked';
import PropTypes from 'prop-types';
import { Registry } from './Registry';
import JsxParser from 'react-jsx-parser';

export const MarkdownJSXParser = (str) => {
    // trim the whitespace
    let plain = String(str).replace(/\n\s+/gm, '\n').trim();
    
    // apply preparsers
    plain = MarkdownJSX.preparsers.list.reduce((s, item) => {
        const { match, replace } = item;
        return match && replace ? String(s).replace(match, replace).trim() : s;
    }, plain);


    // convert to markdown and apply replacers
    const markdown = MarkdownJSX.replacers.list.reduce((s, item) => {
        const { match, replace } = item;
        return match && replace ? String(s).replace(match, replace).trim() : s;
    }, marked.parse(plain));

    return markdown;
};

export const MarkdownJSX = ({ value, ...props }) => (
    <JsxParser {...props} jsx={MarkdownJSXParser(value)} />
);

MarkdownJSX.propTypes = {
    value: PropTypes.string.isRequired,
    renderInWrapper: PropTypes.bool,
    renderUnrecognized: PropTypes.func,
};

MarkdownJSX.defaultProps = {
    renderInWrapper: false,
};

MarkdownJSX.replacers = new Registry('MARKDOWNJSXREPLACERS');
MarkdownJSX.preparsers = new Registry('MARKDOWNJSXPARSERS');
