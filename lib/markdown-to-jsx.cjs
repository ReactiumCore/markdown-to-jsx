var e=require("jsdom"),r=require("marked"),n=require("dompurify"),t=require("prop-types"),a=require("react-jsx-parser");function i(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var u=/*#__PURE__*/i(n),o=/*#__PURE__*/i(t),p=/*#__PURE__*/i(a);function s(){return s=Object.assign?Object.assign.bind():function(e){for(var r=1;r<arguments.length;r++){var n=arguments[r];for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&(e[t]=n[t])}return e},s.apply(this,arguments)}var f=["value","sanitize"],d="undefined"==typeof window?new e.JSDOM("").window:window,l=u.default(d).sanitize,c=function(e,n){var t=e;t=String(t).replace(/\n/g,"<br />").replace(/\r/g,"<br />");var a=r.marked.parse(t);return a=String(a).replace(/<p>(.+)\<\/p>/gim,"$1"),!0===n?l(a):a},v=function(e){var r=e.value,n=e.sanitize,t=function(e,r){if(null==e)return{};var n,t,a={},i=Object.keys(e);for(t=0;t<i.length;t++)r.indexOf(n=i[t])>=0||(a[n]=e[n]);return a}(e,f);return h(p.default,s({jsx:c(r,n),renderInWrapper:!1},t))};v.propTypes={sanitize:o.default.bool,value:o.default.string.isRequired},v.defaultProps={sanitize:!0},exports.MarkdownJSX=v;
//# sourceMappingURL=markdown-to-jsx.cjs.map
