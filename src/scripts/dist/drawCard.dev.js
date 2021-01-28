"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var doc = global.document;

var drawCard = function drawCard() {
  var querySelector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'body';
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var card = doc.createElement('div');
  var modStyle = options.style || {};
  var action = options.action || undefined;
  var title = options.title || 'untitled';
  var trans = options.trans || 'нет перевода';
  var image = options.image || 'https://via.placeholder.com/390x260?text=No+image';

  var style = _objectSpread({}, modStyle);

  card.addEventListener('click', action);
  card.classList.add('efk-card');
  card.id = title;
  if (options.circle) card.classList.add('type');
  if (options["class"]) card.classList.add(options["class"]);
  card.innerHTML = "\n  <div style=\"display:block;background:#54a537;height:100%;cursor:pointer\"class=\"card card-cascade wider\">\n    <div class=\"view view-cascade overlay\">\n        <img style=\"width:100%;".concat(options.circle ? 'border-bottom-left-radius:40%; border-bottom-right-radius:40%;' : '', "\" class=\"card-img-top\" onerror=\"this.src='https://via.placeholder.com/390x260?text=No+image'\" src=\"").concat(image, "\" alt=\"Card image cap\">\n        <div style=\"cursor:pointer;\" class=\"mask rgba-white-slight\"></div>\n    </div>\n    <div class=\"card-body card-body-cascade text-center pb-0\">\n        <h4 style=\"text-align:center;padding-top: 15px;\" class=\"src-text card-title\"><strong>").concat(title, "</strong></h4>\n        <h4 style=\"text-align:center;\" class=\"trans-text card-title\"><strong>").concat(trans, "</strong></h4>\n        <i onclick=\"event.stopPropagation();let obj = this.parentNode.parentNode.parentNode; obj.classList.add('rot'); obj.onmouseleave = (e) => e.currentTarget.classList.remove('rot')\" class=\"switcher fas fa-sync-alt\"></i>\n    </div>\n    ").concat(options.audio ? "<audio preload=\"auto\" src=\"".concat(options.audio, "\"></audio>") : '', "\n  </div>");

  for (var i = 0; i < Object.keys(style).length; i += 1) {
    card.style[Object.keys(style)[i]] = style[Object.keys(style)[i]];
  }

  doc.querySelector(querySelector).appendChild(card);
};

var _default = drawCard;
exports["default"] = _default;