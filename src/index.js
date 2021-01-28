import drawPage from './scripts/drawPage';
import drawStat from './scripts/drawStat';
import './styles/cardStyle.scss';
import './styles/togglersStyle.scss';
import '../node_modules/@fortawesome/fontawesome-free/css/all.css';
import '../node_modules/@fortawesome/fontawesome-free/js/all';

// Preset
const doc = global.document;
const contentClass = 'content-wrapper';
const switchMenu = () => {
  doc.querySelector('.menu').classList.toggle('active');
  doc.querySelector('.menu-button').classList.toggle('active');
};
const hideMenu = () => {
  doc.querySelector('.menu').classList.remove('active');
  doc.querySelector('.menu-button').classList.remove('active');
};

// Hide menu on click outside of menu
doc.addEventListener('click', (e) => {
  if (e.x > 210) {
    hideMenu();
  }
});

// Create page-wrapper
const wrapper = doc.createElement('div');
wrapper.className = 'page-wrapper';
doc.body.appendChild(wrapper);

// Create all-content-wrapper
const allWrapper = doc.createElement('div');
allWrapper.className = 'all-content-wrapper';
wrapper.appendChild(allWrapper);

// Create audio
const audio = doc.createElement('audio');
audio.preload = 'auto';
audio.id = 'notice';
allWrapper.appendChild(audio);

// Create menu
const menuButtons = doc.createElement('div');
const menu = doc.createElement('div');
menuButtons.innerHTML = `
<div class="menu-button">
  <i onclick="document.querySelector('.menu').classList.toggle('active');document.querySelector('.menu-button').classList.toggle('active')" style="cursor: pointer" class="close-menu fas fa-times"></i>
  <i onclick="document.querySelector('.menu').classList.toggle('active');document.querySelector('.menu-button').classList.toggle('active')" style="cursor: pointer" class="open-menu fas fa-bars"></i>
</div>`;
menu.className = 'menu';
const menuItemsTitles = ['Main menu', 'Action (set A)', 'Action (set B)', 'Action (set C)', 'Adjective', 'Animal (set A)', 'Animal (set B)', 'Clothes', 'Emotions'];
for (let i = 0; i < menuItemsTitles.length; i += 1) {
  const button = doc.createElement('button');
  button.addEventListener('click', (i === 0) ? () => {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach((btn) => {
      btn.classList.remove('activeNow');
    });
    drawPage(`.${contentClass}`);
    button.classList.add('activeNow');
    switchMenu();
  } : () => {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach((btn) => {
      btn.classList.remove('activeNow');
    });
    drawPage(`.${contentClass}`, i);
    button.classList.add('activeNow');
    switchMenu();
  });
  button.innerText = menuItemsTitles[i];
  button.className = 'btn';
  if (i === 0) {
    button.classList.add('activeNow');
  }
  menu.appendChild(button);
}
allWrapper.appendChild(menuButtons);
allWrapper.appendChild(menu);

// Create toggler
const togglerAndStat = doc.createElement('div');
togglerAndStat.className = ' toggler ';
togglerAndStat.innerHTML = `
<div class="toggle toggle--knob">
  <input onclick="localStorage.mistakes=0;document.querySelectorAll('.rate').forEach(v=>v.parentNode.removeChild(v));document.querySelectorAll('.success-mask').forEach(v=>v.parentNode.removeChild(v));document.body.classList.remove('playing');document.body.classList.toggle('play')" type="checkbox" id="toggle--knob" class="toggle--checkbox">
  <label class="toggle--btn" for="toggle--knob"><span class="toggle--feature" data-label-on="Train"  data-label-off="Play"></span></label>
</div>
<span style="cursor:pointer;color:darkred;padding:12.5px 10px;text-align:right;margin:15px 0;width:120px" class="go-stat">
  <span><i class="far fa-clipboard"></i> Statistics</span>
</span>
`;
allWrapper.appendChild(togglerAndStat);
doc.getElementsByClassName('go-stat')[0].addEventListener('click', drawStat);

// Add cards wrapper
const content = doc.createElement('div');
content.className = contentClass;
allWrapper.appendChild(content);
// Draw main page
drawPage(`.${content.className}`);

// Create footer wrapper
const footer = doc.createElement('div');
footer.id = 'footer-wrapper';
footer.classList.add('footer-wrapper');
footer.innerHTML = `<div id="footer" style="background-color: dimgrey;display: flex;align-items: center;padding: 0 10px;justify-content: space-between;">
<a id = "gitHubId" href="https://github.com/NickErmol?tab=repositories" style="color: aqua;">My github!</a>
<span id = "yearId" style="color: aqua;">2020</span>
<a id = "rsSchoolId" href="https://rs.school/js/"><img src="https://rs.school/images/rs_school_js.svg" alt="RsSchool Logo" width="50" height="60"></a>
</div>`;
wrapper.appendChild(footer);

// Generate page 1 cards
