import cards from '../data/cards';
import drawPage from './drawPage';

const doc = global.document;
const sortTable = (targ = 0) => {
  const table = doc.getElementsByClassName('table')[0];
  let rows;
  let switching;
  let i;
  let x;
  let y;
  let shouldSwitch;
  switching = true;
  if (!global.table) global.table = {};
  if (global.table[`tableColl${targ}`] === true) {
    global.table[`tableColl${targ}`] = false;
  } else {
    global.table[`tableColl${targ}`] = true;
  }
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i += 1) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName('td')[targ];
      y = rows[i + 1].getElementsByTagName('td')[targ];
      let condition;
      if (global.table[`tableColl${targ}`] === true) {
        condition = (targ < 3)
          ? (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase())
          : (Number(x.innerHTML) < Number(y.innerHTML));
      } else {
        condition = (targ < 3)
          ? (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase())
          : (Number(x.innerHTML) > Number(y.innerHTML));
      }
      if (condition) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
};

const drawStat = () => {
  const modalMask = doc.createElement('div');
  const modalPage = doc.createElement('div');
  modalPage.className = 'modal-page';
  modalMask.className = 'modal-mask';
  modalMask.addEventListener('click', (e) => e.currentTarget.parentNode.removeChild(e.currentTarget));
  modalPage.addEventListener('click', (e) => e.stopPropagation());
  // Page styles
  modalMask.appendChild(modalPage);
  // Create page header
  const h1 = doc.createElement('h1');
  h1.className = 'modal-page-header';
  h1.innerText = 'Statistics';
  modalPage.appendChild(h1);
  const controlsWrap = doc.createElement('div');
  controlsWrap.className = 'statControls';
  const reset = doc.createElement('button');
  reset.className += 'pad10 btn btn-secondary';
  reset.innerText = 'Reset';
  const repeat = doc.createElement('button');
  repeat.className += 'pad10 btn btn-primary';
  repeat.innerText = 'Repeat difficult words';
  reset.addEventListener('click', () => {
    global.localStorage.clear();
    doc.getElementsByClassName('modal-mask')[0].click();
    doc.getElementsByClassName('go-stat')[0].click();
  });
  repeat.addEventListener('click', () => {
    let cardsArray = cards.map((elem) => elem);
    cardsArray = cardsArray.filter((cardsArrayElement) => cardsArrayElement[0].word !== undefined)
      .reduce((accumulator, value) => accumulator.concat(value), []);
    cardsArray = cardsArray.map((cardsArrayElement) => cardsArrayElement.word);
    const sortedMistakes = cardsArray.reduce((accumulator, currentValue) => {
      let newT = accumulator;
      if (accumulator.length < 8 && (Number(global.localStorage.getItem(`${currentValue}lose`)) > 0)) {
        accumulator.push({ key: currentValue, value: Number(global.localStorage.getItem(`${currentValue}lose`)) });
        newT = accumulator.sort((a, b) => b.value - a.value);
      } else if (accumulator.length === 8 && accumulator[7].value < Number(global.localStorage.getItem(`${currentValue}lose`))) {
        newT.splice(7, 1, { key: currentValue, value: Number(global.localStorage.getItem(`${currentValue}lose`)) });
        newT = newT.sort((a, b) => b.value - a.value);
      }
      return newT;
    }, []);
    if (sortedMistakes.length === 0) {
      const message = 'There are no difficult words for you!';
      const extraModal = doc.createElement('div');
      extraModal.className = 'extraModal';
      extraModal.innerText = message;
      modalPage.appendChild(extraModal);
      global.setTimeout(() => { extraModal.style.opacity = '0'; }, 0);
      global.setTimeout(() => modalPage.removeChild(extraModal), 2500);
    } else {
      doc.getElementsByClassName('modal-mask')[0].click();
      drawPage('.content-wrapper', 'Custom', { keys: sortedMistakes.map((mistakeObj) => mistakeObj.key) });
    }
  });
  controlsWrap.appendChild(repeat);
  controlsWrap.appendChild(reset);
  modalPage.appendChild(controlsWrap);
  // Create page table
  const theadKeys = ['Word', 'Translation', 'Categorie', 'Train clicks', 'Right', 'Mistakes', 'Right percentage, %'];
  let cardsArray = cards.map((elem) => elem);
  cardsArray = cardsArray.filter((cardsArrayElement) => cardsArrayElement[0].word !== undefined)
    .reduce((elem, index) => elem.concat(index), []);
  const tableWrapper = doc.createElement('div');
  tableWrapper.className = ' mistake-table-wrapper ';
  const table = doc.createElement('table');
  table.className = 'mistake-table ';
  const tbody = doc.createElement('tbody');
  const thead = doc.createElement('thead');
  const trHead = doc.createElement('tr');
  for (let i = 0; i < theadKeys.length; i += 1) {
    const th = doc.createElement('th');
    th.addEventListener('click', () => sortTable(i));
    th.innerHTML = `${theadKeys[i]} <i style="font-size:.8em;" class="fas fa-sort"></i>`;
    trHead.appendChild(th);
  }
  for (let i = 0; i < cardsArray.length; i += 1) {
    const tdWithStyles = (text) => {
      const word = doc.createElement('td');
      word.innerText = (Number.isNaN(text)) ? 0 : text;
      return word;
    };
    const tr = doc.createElement('tr');
    const word = tdWithStyles(cardsArray[i].word);
    const translation = tdWithStyles(cardsArray[i].translation);
    let index;
    cards.map((elem) => elem).forEach((elem, ind) => {
      if (ind === 0) return false;
      if (elem.some((card) => card.word === cardsArray[i].word)) index = ind;
      return false;
    }, 0);
    const categ = tdWithStyles(cards[0][index - 1]);
    const clicks = tdWithStyles(Number(global.localStorage.getItem(`${cardsArray[i].word}clicked`)));
    const guessed = tdWithStyles(Number(global.localStorage.getItem(`${cardsArray[i].word}win`)));
    const mistakes = tdWithStyles(Number(global.localStorage.getItem(`${cardsArray[i].word}lose`)));
    const percentage = tdWithStyles(Math.floor((Number(global.localStorage.getItem(`${cardsArray[i].word}win`)) / (Number(global.localStorage.getItem(`${cardsArray[i].word}win`)) + Number(global.localStorage.getItem(`${cardsArray[i].word}lose`)))) * 100));
    tr.appendChild(word);
    tr.appendChild(translation);
    tr.appendChild(categ);
    tr.appendChild(clicks);
    tr.appendChild(guessed);
    tr.appendChild(mistakes);
    tr.appendChild(percentage);
    tbody.appendChild(tr);
  }
  table.className += 'statTable table table-light';
  thead.appendChild(trHead);
  table.appendChild(thead);
  table.appendChild(tbody);
  tableWrapper.appendChild(table);
  modalPage.appendChild(tableWrapper);
  // Render page
  doc.body.appendChild(modalMask);
};

export default drawStat;
