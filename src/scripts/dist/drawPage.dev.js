"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _drawCard = _interopRequireDefault(require("./drawCard"));

var _drawPlayControls = _interopRequireDefault(require("./drawPlayControls"));

var _cardAction = _interopRequireDefault(require("./cardAction"));

var _cards = _interopRequireDefault(require("../data/cards"));

var _hug = _interopRequireDefault(require("../data/img/hug.jpg"));

var _swim = _interopRequireDefault(require("../data/img/swim.jpg"));

var _argue = _interopRequireDefault(require("../data/img/argue.jpg"));

var _big = _interopRequireDefault(require("../data/img/big.jpg"));

var _dog = _interopRequireDefault(require("../data/img/dog.jpg"));

var _giraffe = _interopRequireDefault(require("../data/img/giraffe.jpg"));

var _shirt = _interopRequireDefault(require("../data/img/shirt.jpg"));

var _smile = _interopRequireDefault(require("../data/img/smile.jpg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var doc = global.document;

var drawPage = function drawPage() {
  var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'body';
  var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Main';
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  // Presets
  global.localStorage.setItem('mistakes', 0);
  global.localStorage.setItem('target', '');
  doc.body.classList.remove('playing');
  var keys = options.keys || []; // Generate main page cards

  global.document.querySelector(query).innerHTML = ''; // Create rating wrapper

  var line = doc.createElement('div');
  line.id = 'rateLine';
  doc.querySelector(query).appendChild(line);
  var buttons = document.querySelectorAll('.btn'); // Page Type

  if (page === 'Main') {
    var cardTypesArray = [_hug["default"], _swim["default"], _argue["default"], _big["default"], _dog["default"], _giraffe["default"], _shirt["default"], _smile["default"]];

    var _loop = function _loop(index) {
      buttons[index + 1].classList.remove('activeNow');
      (0, _drawCard["default"])(query, {
        action: function action() {
          drawPage(query, index + 1);
          buttons[0].classList.remove('activeNow');
          buttons[index + 1].classList.add('activeNow');
        },
        title: _cards["default"][0][index],
        image: cardTypesArray[index],
        circle: true
      });
    };

    for (var index = 0; index < _cards["default"][0].length; index += 1) {
      _loop(index);
    }

    global.localStorage.setItem('current', null);
  } else if (page === 'Custom') {
    var cardsArray = _cards["default"].map(function (elem) {
      return elem;
    });

    cardsArray = cardsArray.filter(function (cardsArrayElement) {
      return cardsArrayElement[0].word !== undefined;
    }).reduce(function (elem, index) {
      return elem.concat(index);
    }, []);
    var subCase = cardsArray.filter(function (cardsArrayElement) {
      return keys.some(function (difficultWord) {
        return difficultWord === cardsArrayElement.word;
      });
    });

    for (var _index = 0; _index < subCase.length; _index += 1) {
      (0, _drawCard["default"])(query, {
        action: function action(e) {
          return (0, _cardAction["default"])(e, query, drawPage);
        },
        title: subCase[_index].word,
        image: subCase[_index].image,
        audio: subCase[_index].audioSrc,
        trans: subCase[_index].translation
      });
    }

    (0, _drawPlayControls["default"])(query, subCase);
  } else {
    for (var _index2 = 0; _index2 < _cards["default"][0].length; _index2 += 1) {
      (0, _drawCard["default"])(query, {
        action: function action(e) {
          return (0, _cardAction["default"])(e, query, drawPage);
        },
        title: _cards["default"][page][_index2].word,
        image: _cards["default"][page][_index2].image,
        audio: _cards["default"][page][_index2].audioSrc,
        trans: _cards["default"][page][_index2].translation
      });
    }

    (0, _drawPlayControls["default"])(query, _cards["default"][page]);
  }
};

var _default = drawPage;
exports["default"] = _default;