"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MarkdownJSX = void 0;
var _react = _interopRequireDefault(require("react"));
var _marked = require("marked");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactJsxParser = _interopRequireDefault(require("react-jsx-parser"));
var _jsxRuntime = require("react/jsx-runtime");
var _excluded = ["value", "markdownParser", "plainTextParser"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var MarkdownJSX = exports.MarkdownJSX = function MarkdownJSX(_ref) {
  var value = _ref.value,
    markdownParser = _ref.markdownParser,
    plainTextParser = _ref.plainTextParser,
    props = _objectWithoutProperties(_ref, _excluded);
  var parser = function parser(str) {
    var plain = String(str).trim();
    if (plainTextParser && typeof plainTextParser === 'function') {
      plain = plainTextParser(plain, _marked.marked);
    }
    var ids = [];
    var replacers = Array.from(MarkdownJSX.replacers).filter(function (_ref2) {
      var id = _ref2.id;
      if (id && !ids.includes(id)) {
        ids.push(id);
        return true;
      }
      return false;
    });
    var markdown = _marked.marked.parse(plain);
    markdown = replacers.reduce(function (s, item) {
      if (item.match && item.replace) {
        s = String(s).replace(item.match, item.replace);
      }
      return s;
    }, markdown);
    return markdown;
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactJsxParser.default, _objectSpread(_objectSpread({}, props), {}, {
    jsx: parser(value)
  }));
};
MarkdownJSX.propTypes = {
  value: _propTypes.default.string.isRequired,
  plainTextParser: _propTypes.default.func,
  renderInWrapper: _propTypes.default.bool,
  renderUnrecognized: _propTypes.default.func
};
MarkdownJSX.defaultProps = {
  renderInWrapper: false
};
MarkdownJSX.replacers = [];
MarkdownJSX.replacers.push({
  id: 'heading',
  match: /<h([1-6])>(.+)<\/h[1-6]>/gim,
  replace: '<h$1><span>$2</span></h$1>'
});

//# sourceMappingURL=markdown-to-jsx.js.map