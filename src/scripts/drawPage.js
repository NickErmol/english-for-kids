import drawCard from './drawCard';
import drawPlayControls from './drawPlayControls';
import cardAction from './cardAction';
import cards from '../data/cards';
import hug from '../data/img/hug.jpg';
import swim from '../data/img/swim.jpg';
import argue from '../data/img/argue.jpg';
import big from '../data/img/big.jpg';
import dog from '../data/img/dog.jpg';
import giraffe from '../data/img/giraffe.jpg';
import shirt from '../data/img/shirt.jpg';
import smile from '../data/img/smile.jpg';

const doc = global.document;

const drawPage = (query = 'body', page = 'Main', options = {}) => {
  // Presets
  global.localStorage.setItem('mistakes', 0);
  global.localStorage.setItem('target', '');
  doc.body.classList.remove('playing');
  const keys = options.keys || [];
  // Generate main page cards
  global.document.querySelector(query).innerHTML = '';

  // Create rating wrapper
  const line = doc.createElement('div');
  line.id = 'rateLine';
  doc.querySelector(query).appendChild(line);
  const buttons = document.querySelectorAll('.btn');

  // Page Type
  if (page === 'Main') {
    const cardTypesArray = [hug, swim, argue, big, dog, giraffe, shirt, smile];
    for (let index = 0; index < cards[0].length; index += 1) {
      buttons[index + 1].classList.remove('activeNow');
      drawCard(query, {
        action: () => {
          drawPage(query, index + 1);
          buttons[0].classList.remove('activeNow');
          buttons[index + 1].classList.add('activeNow');
        },
        title: cards[0][index],
        image: cardTypesArray[index],
        circle: true,
      });
    }
    global.localStorage.setItem('current', null);
  } else if (page === 'Custom') {
    let cardsArray = cards.map((elem) => elem);
    cardsArray = cardsArray.filter((cardsArrayElement) => cardsArrayElement[0].word !== undefined)
      .reduce((elem, index) => elem.concat(index), []);
    const subCase = cardsArray.filter((cardsArrayElement) => keys
      .some((difficultWord) => difficultWord === cardsArrayElement.word));
    for (let index = 0; index < subCase.length; index += 1) {
      drawCard(query, {
        action: (e) => cardAction(e, query, drawPage),
        title: subCase[index].word,
        image: subCase[index].image,
        audio: subCase[index].audioSrc,
        trans: subCase[index].translation,
      });
    }
    drawPlayControls(query, subCase);
  } else {
    for (let index = 0; index < cards[0].length; index += 1) {
      drawCard(query, {
        action: (e) => cardAction(e, query, drawPage),
        title: cards[page][index].word,
        image: cards[page][index].image,
        audio: cards[page][index].audioSrc,
        trans: cards[page][index].translation,
      });
    }
    drawPlayControls(query, cards[page]);
  }
};

export default drawPage;
