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

function getCharacter(count) {
  var characters = [];
  count = count || 0;

  for (var i = 0; i < count; i++) {
    characters.push({
      name: getRandomArrayItem(FIRST_NAMES) + ' ' + getRandomArrayItem(LAST_NAMES),
      coatColor: getRandomArrayItem(COAT_COLORS),
      eyesColor: getRandomArrayItem(EYES_COLORS)
    });
  }

  return characters;
}
