import{JSDOM as r}from"jsdom";import{marked as e}from"marked";import n from"dompurify";import t from"prop-types";import i from"react-jsx-parser";function o(){return o=Object.assign?Object.assign.bind():function(r){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&(r[t]=n[t])}return r},o.apply(this,arguments)}var a=["value","sanitize"],p=n("undefined"==typeof window?new r("").window:window).sanitize,s=function(r,n){var t=r;t=String(t).replace(/\n/g,"<br />").replace(/\r/g,"<br />");var i=e.parse(t);return i=String(i).replace(/<p>(.+)\<\/p>/gim,"$1"),!0===n?p(i):i},f=function(r){var e=r.value,n=r.sanitize,t=function(r,e){if(null==r)return{};var n,t,i={},o=Object.keys(r);for(t=0;t<o.length;t++)e.indexOf(n=o[t])>=0||(i[n]=r[n]);return i}(r,a);return h(i,o({jsx:s(e,n),renderInWrapper:!1},t))};f.propTypes={sanitize:t.bool,value:t.string.isRequired},f.defaultProps={sanitize:!0};export{f as MarkdownJSX};
//# sourceMappingURL=markdown-to-jsx.js.map