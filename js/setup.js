'use strict';
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var FIRST_NAMES = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)',
  'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)',
  'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var SETUP_COAT_COLORS = COAT_COLORS.slice();
var SETUP_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var SETUP_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var setupOpen = document.querySelector('.setup-open');
var setupClose = document.querySelector('.setup-close');
var setupCoat = document.querySelector('.setup-wizard .wizard-coat');
var setupEyes = document.querySelector('.setup-wizard .wizard-eyes');
var setupFireball = document.querySelector('.setup-fireball-wrap');
var inputCoat = document.querySelector('input[name="coat-color"]');
var inputEyes = document.querySelector('input[name="eyes-color"]');
var inputFireball = document.querySelector('input[name="fireball-color"]');

function getRandomValue() {
  var argumentList = [].slice.call(arguments);
  argumentList[0] = argumentList[0] || 0;
  argumentList[1] = argumentList[1] || 0;
  var min = Math.min(argumentList[0], argumentList[1]);
  var max = Math.max(argumentList[0], argumentList[1]);

  return Math.round((max - min) * Math.random() + min);
}

function getRandomArrayItem(arr) {
  return Array.isArray(arr) && arr.length > 0 ? arr[getRandomValue(arr.length - 1)] : null;
}

function getWizards(count) {
  var wizards = [];
  count = count || 0;

  for (var i = 0; i < count; i++) {
    wizards.push({
      name: getRandomArrayItem(FIRST_NAMES) + ' ' + getRandomArrayItem(LAST_NAMES),
      coatColor: getRandomArrayItem(COAT_COLORS),
      eyesColor: getRandomArrayItem(EYES_COLORS)
    });
  }

  return wizards;
}

function setRenderWizardTemplate(template) {
  var templateInClosure = template;

  return function (wizard) {
    var clonedTemplate = templateInClosure.cloneNode(true);
    clonedTemplate.querySelector('.setup-similar-label').textContent = wizard.name;
    clonedTemplate.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    clonedTemplate.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return clonedTemplate;
  };
}


function renderWizardList() {
  var WIZARD_COUNT = 4;
  var wizards = getWizards(WIZARD_COUNT);
  var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var fragment = document.createDocumentFragment();

  var renderWizard = setRenderWizardTemplate(wizardTemplate);

  for (var i = 0; i < WIZARD_COUNT; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }

  document.querySelector('.setup-similar-list').appendChild(fragment);
  document.querySelector('.setup-similar').classList.remove('hidden');
}

function onPopupEscPress(e) {
  if (e.target.classList.contains('setup-user-name')) {
    e.stopPropagation();

    return;
  }

  if (e.keyCode === ESC_KEYCODE) {
    onCloseSetup();
  }
}

function onCloseSetup() {
  document.querySelector('.setup').classList.add('hidden');
}

function onShowSetup() {
  document.querySelector('.setup').classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
}

function onChangeCoatColor() {
  var color = getRandomArrayItem(SETUP_COAT_COLORS);
  setupCoat.style.fill = color;
  inputCoat.value = color;
}

function onChangeEyesColor() {
  var color = getRandomArrayItem(SETUP_EYES_COLORS);
  setupEyes.style.fill = color;
  inputEyes.value = color;
}

function onChangeFireballColor() {
  var color = getRandomArrayItem(SETUP_FIREBALL_COLORS);
  setupFireball.style.background = color;
  inputFireball.value = color;
}

setupOpen.addEventListener('click', onShowSetup);
setupOpen.addEventListener('keydown', function (e) {
  if (e.keyCode === ENTER_KEYCODE) {
    onShowSetup();
  }
});
setupClose.addEventListener('click', onCloseSetup);
setupClose.addEventListener('keydown', function (e) {
  if (e.keyCode === ENTER_KEYCODE) {
    onCloseSetup();
  }
});

setupCoat.addEventListener('click', onChangeCoatColor);
setupEyes.addEventListener('click', onChangeEyesColor);
setupFireball.addEventListener('click', onChangeFireballColor);
renderWizardList();
