import { JSDOM } from 'jsdom';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import PropTypes from 'prop-types';
import JsxParser from 'react-jsx-parser';

const windowObj = typeof window === 'undefined' ? new JSDOM('').window : window;
const purify = DOMPurify(windowObj).sanitize;

const parser = (str, sanitize) => {
    let plain = str;
    plain = String(plain)
        .replace(/\n/g, '<br />')
        .replace(/\r/g, '<br />');

    let markdown = marked.parse(plain);
    markdown = String(markdown).replace(/<p>(.+)\<\/p>/gim, '$1');
    markdown = sanitize === true ? purify(markdown) : markdown;

    return markdown;
};

export const MarkdownJSX = ({ value, sanitize, ...props }) => (
    <JsxParser
        jsx={parser(value, sanitize)}
        renderInWrapper={false}
        {...props}
    />
);

MarkdownJSX.propTypes = {
    sanitize: PropTypes.bool,
    value: PropTypes.string.isRequired,
};

MarkdownJSX.defaultProps = {
    sanitize: true,
};
