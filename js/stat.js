'use strict';

var Paper = function (x, y, width, height, ctx) {
  var _x = x || 0;
  var _y = y || 0;
  var _width = width || 0;
  var _height = height || 0;
  var _ctx;
  var _border = {};
  if (!ctx) {
    throw Error('Not valid CTX param');
  } else {
    _ctx = ctx;
  }

  function renderBorder() {
    var borderX = _x - _border.width;
    var borderY = _y - _border.width;
    var borderWidth = _width + 2 * _border.width;
    var borderHeight = _height + 2 * _border.width;
    var grd = _ctx.createLinearGradient(0, 0, 0, _height);
    grd.addColorStop(0, 'lightgreen');
    grd.addColorStop(1, 'blue');

    _ctx.fillStyle = grd;
    _ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
    _ctx.shadowOffsetX = 10;
    _ctx.shadowOffsetY = 10;
    _ctx.fillRect(borderX, borderY, borderWidth, borderHeight);
    _ctx.shadowOffsetX = 0;
    _ctx.shadowOffsetY = 0;
  }

  return {
    setBorder: function (borderWidth, color) {
      _border.width = borderWidth;
      _border.color = color;
    },
    render: function () {
      if (_border.width) {
        renderBorder(_ctx);
      }

      _ctx.fillStyle = '#fff';
      _ctx.fillRect(_x, _y, _width, _height);
      _ctx.font = '16px PT Mono';
      _ctx.fillStyle = '#000';
      _ctx.fillText('Ура вы победили!', _x + 20, _y + 30);
      _ctx.fillText('Список результатов:', _x + 20, _y + 50);
    },
    renderHistogram: function (names, times) {
      var histogramHeight = 150;
      var columnWidth = 40;
      var indent = 50;
      var userColumnColor = 'rgb(255, 0, 0)';
      var opponentColumnColor = 'rgb(0, 0, 255)';
      var step = histogramHeight / getMaxValue(times);
      var initialX = _x;
      var initialY = _y + _height - 30;
      var isCurrentUser;
      for (var i = 0; i < times.length; i++) {
        isCurrentUser = names[i] === 'Вы';
        _ctx.fillStyle = isCurrentUser ? userColumnColor : opponentColumnColor;
        _ctx.globalAlpha = isCurrentUser ? 1 : getRandomValue(0.3, 1);
        _ctx.fillRect(initialX + columnWidth * i + indent * (i + 1), initialY, columnWidth, -times[i] * step);
        _ctx.globalAlpha = 1;
        _ctx.fillStyle = '#000';
        _ctx.fillText(names[i], initialX + columnWidth * i + indent * (i + 1), initialY + 20);
        _ctx.fillText(times[i].toFixed(0), initialX + columnWidth * i + indent * (i + 1), initialY - times[i] * step - 10);
      }
      _ctx.globalAlpha = 1;
    }
  };
};

function getMaxValue(arr) {
  var max = 0;

  arr.forEach(function (item) {
    if (item > max) {
      max = item;
    }
  });

  return max;
}

function getRandomValue(min, max) {

  return Math.random() * (max - min) + min;
}

window.renderStatistics = function (ctx, names, times) {
  var paper = new Paper(100, 10, 420, 270, ctx);
  paper.setBorder(5);
  paper.render(ctx);
  paper.renderHistogram(names, times);
};
