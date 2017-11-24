'use strict';

var FIRST_NAMES = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)',
  'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)',
  'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

function getRandomValue(max, min) {
  min = min || 0;
  max = max || 1;

  return Math.round((max - min) * Math.random() + min);
}

function getRandomArrayItem(arr) {
  arr = arr || [];

  return arr[getRandomValue(arr.length - 1)];
}

function getWizard(count) {
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

function renderWizard(wizard, template) {
  template = template.cloneNode(true);
  template.querySelector('.setup-similar-label').textContent = wizard.name;
  template.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  template.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return template;
}

function renderWizardList() {
  var WIZARD_COUNT = 4;
  var wizards = getWizard(WIZARD_COUNT);
  var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < WIZARD_COUNT; i++) {
    fragment.appendChild(renderWizard(wizards[i], wizardTemplate));
  }

  document.querySelector('.setup-similar-list').appendChild(fragment);
  document.querySelector('.setup-similar').classList.remove('hidden');
}

renderWizardList();
