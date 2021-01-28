"use strict";

var _drawPage = _interopRequireDefault(require("./scripts/drawPage"));

var _drawStat = _interopRequireDefault(require("./scripts/drawStat"));

require("./styles/cardStyle.scss");

require("./styles/togglersStyle.scss");

require("../node_modules/@fortawesome/fontawesome-free/css/all.css");

require("../node_modules/@fortawesome/fontawesome-free/js/all");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Preset
var doc = global.document;
var contentClass = 'content-wrapper';

var switchMenu = function switchMenu() {
  doc.querySelector('.menu').classList.toggle('active');
  doc.querySelector('.menu-button').classList.toggle('active');
};

var hideMenu = function hideMenu() {
  doc.querySelector('.menu').classList.remove('active');
  doc.querySelector('.menu-button').classList.remove('active');
}; // Hide menu on click outside of menu


doc.addEventListener('click', function (e) {
  if (e.x > 210) {
    hideMenu();
  }
}); // Create page-wrapper

var wrapper = doc.createElement('div');
wrapper.className = 'page-wrapper';
doc.body.appendChild(wrapper); // Create all-content-wrapper

var allWrapper = doc.createElement('div');
allWrapper.className = 'all-content-wrapper';
wrapper.appendChild(allWrapper); // Create audio

var audio = doc.createElement('audio');
audio.preload = 'auto';
audio.id = 'notice';
allWrapper.appendChild(audio); // Create menu

var menuButtons = doc.createElement('div');
var menu = doc.createElement('div');
menuButtons.innerHTML = "\n<div class=\"menu-button\">\n  <i onclick=\"document.querySelector('.menu').classList.toggle('active');document.querySelector('.menu-button').classList.toggle('active')\" style=\"cursor: pointer\" class=\"close-menu fas fa-times\"></i>\n  <i onclick=\"document.querySelector('.menu').classList.toggle('active');document.querySelector('.menu-button').classList.toggle('active')\" style=\"cursor: pointer\" class=\"open-menu fas fa-bars\"></i>\n</div>";
menu.className = 'menu';
var menuItemsTitles = ['Main menu', 'Action (set A)', 'Action (set B)', 'Action (set C)', 'Adjective', 'Animal (set A)', 'Animal (set B)', 'Clothes', 'Emotions'];

var _loop = function _loop(i) {
  var button = doc.createElement('button');
  button.addEventListener('click', i === 0 ? function () {
    var buttons = document.querySelectorAll('.btn');
    buttons.forEach(function (btn) {
      btn.classList.remove('activeNow');
    });
    (0, _drawPage["default"])(".".concat(contentClass));
    button.classList.add('activeNow');
    switchMenu();
  } : function () {
    var buttons = document.querySelectorAll('.btn');
    buttons.forEach(function (btn) {
      btn.classList.remove('activeNow');
    });
    (0, _drawPage["default"])(".".concat(contentClass), i);
    button.classList.add('activeNow');
    switchMenu();
  });
  button.innerText = menuItemsTitles[i];
  button.className = 'btn';

  if (i === 0) {
    button.classList.add('activeNow');
  }

  menu.appendChild(button);
};

for (var i = 0; i < menuItemsTitles.length; i += 1) {
  _loop(i);
}

allWrapper.appendChild(menuButtons);
allWrapper.appendChild(menu); // Create toggler

var togglerAndStat = doc.createElement('div');
togglerAndStat.className = ' toggler ';
togglerAndStat.innerHTML = "\n<div class=\"toggle toggle--knob\">\n  <input onclick=\"localStorage.mistakes=0;document.querySelectorAll('.rate').forEach(v=>v.parentNode.removeChild(v));document.querySelectorAll('.success-mask').forEach(v=>v.parentNode.removeChild(v));document.body.classList.remove('playing');document.body.classList.toggle('play')\" type=\"checkbox\" id=\"toggle--knob\" class=\"toggle--checkbox\">\n  <label class=\"toggle--btn\" for=\"toggle--knob\"><span class=\"toggle--feature\" data-label-on=\"Train\"  data-label-off=\"Play\"></span></label>\n</div>\n<span style=\"cursor:pointer;color:darkred;padding:12.5px 10px;text-align:right;margin:15px 0;width:120px\" class=\"go-stat\">\n  <span><i class=\"far fa-clipboard\"></i> Statistics</span>\n</span>\n";
allWrapper.appendChild(togglerAndStat);
doc.getElementsByClassName('go-stat')[0].addEventListener('click', _drawStat["default"]); // Add cards wrapper

var content = doc.createElement('div');
content.className = contentClass;
allWrapper.appendChild(content); // Draw main page

(0, _drawPage["default"])(".".concat(content.className)); // Create footer wrapper

var footer = doc.createElement('div');
footer.id = 'footer-wrapper';
footer.classList.add('footer-wrapper');
footer.innerHTML = "<div id=\"footer\" style=\"background-color: dimgrey;display: flex;align-items: center;padding: 0 10px;justify-content: space-between;\">\n<a id = \"gitHubId\" href=\"https://github.com/NickErmol?tab=repositories\" style=\"color: aqua;\">My github!</a>\n<span id = \"yearId\" style=\"color: aqua;\">2020</span>\n<a id = \"rsSchoolId\" href=\"https://rs.school/js/\"><img src=\"https://rs.school/images/rs_school_js.svg\" alt=\"RsSchool Logo\" width=\"50\" height=\"60\"></a>\n</div>";
wrapper.appendChild(footer); // Generate page 1 cards