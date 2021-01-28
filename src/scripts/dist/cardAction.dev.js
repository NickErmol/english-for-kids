"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var doc = global.document;

var cardAction = function cardAction(e, query, drawPage) {
  if (!doc.body.classList.contains('play')) {
    e.currentTarget.getElementsByTagName('audio')[0].play();
    global.localStorage["".concat(e.currentTarget.id, "clicked")] = Number(global.localStorage.getItem("".concat(e.currentTarget.id, "clicked"))) + 1;
  } else if (doc.body.classList.contains('playing')) {
    if (e.currentTarget.id === global.localStorage.target) {
      e.currentTarget.innerHTML += "\n      <div class=\"success-mask\" onclick=\"event.stopPropagation()\" style=\"position:absolute;top:0;display:flex;justify-content:center;align-items:center;width:100%;height:100%;background:#fff9;\">\n        <h1 style=\"background:transparent;color:green\"><i style=\"font-size: 90px\"class=\"fas fa-check\"></i></h1>\n      </div>\n      ";
      global.localStorage.setItem('pool', JSON.stringify(JSON.parse(global.localStorage.getItem('pool')).filter(function (card) {
        return card !== global.localStorage.target;
      })));

      if (JSON.parse(global.localStorage.pool).length > 0) {
        doc.getElementById('notice').src = 'audio/right.mp3';
        doc.getElementById('notice').play();
        global.localStorage["".concat(global.localStorage.target, "win")] = Number(global.localStorage.getItem("".concat(global.localStorage.target, "win"))) + 1;
        doc.getElementById('rateLine').innerHTML = "<i style=\"color:green\" class=\"rate fas fa-thumbs-up\"></i> ".concat(doc.getElementById('rateLine').innerHTML);
        global.localStorage.setItem('target', JSON.parse(global.localStorage.getItem('pool'))[Math.floor(Math.random() * JSON.parse(global.localStorage.getItem('pool')).length)]);
        global.setTimeout(function () {
          return doc.getElementById(global.localStorage.target).getElementsByTagName('audio')[0].play();
        }, 1500);
      } else {
        global.localStorage["".concat(global.localStorage.target, "win")] = Number(global.localStorage.getItem("".concat(global.localStorage.target, "win"))) + 1;
        global.localStorage.setItem('target', '');
        doc.querySelector(query).innerHTML = "\n          <div style=\"top:0;left:0;width:100%;height:100%;position:fixed;background:white;z-index:10000;flex-direction:column;display:flex;justify-content:center;align-items:center;\">\n            ".concat(Number(global.localStorage.mistakes) === 0 ? "\n            <i style=\"color:green;font-size:200px\"class=\"fas fa-smile-beam\"></i>\n            <h1 style=\"background: white;color: green;\">You WIN!</h1>\n            " : "\n            <i style=\"color:red;font-size:200px\"class=\"fas fa-frown-open\"></i>\n            <h1 style=\"background: white;color: red;\">".concat(Number(global.localStorage.mistakes), " mistake(s)!</h1>\n            "), "\n          </div>\n        ");
        doc.getElementById('notice').src = Number(global.localStorage.mistakes) === 0 ? 'audio/win.mp3' : 'audio/lose.mp3';
        doc.getElementById('notice').play();
        global.setTimeout(function () {
          return drawPage(query);
        }, 3500);
      }
    } else {
      doc.getElementById('notice').src = 'audio/mistake.mp3';
      global.localStorage["".concat(global.localStorage.target, "lose")] = Number(global.localStorage.getItem("".concat(global.localStorage.target, "lose"))) + 1;
      doc.getElementById('notice').play();
      doc.getElementById('rateLine').innerHTML = "<i style=\"color:darkred\" class=\"rate fas fa-thumbs-down\"></i> ".concat(doc.getElementById('rateLine').innerHTML);
      global.localStorage.mistakes = Number(global.localStorage.mistakes) + 1;
    }
  }
};

var _default = cardAction;
exports["default"] = _default;