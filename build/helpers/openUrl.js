'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _child_process = require('child_process');

exports.default = function (url) {
  switch (process.platform) {
    case "darwin":
      (0, _child_process.exec)('open ' + url);
      break;
    case "win32":
      (0, _child_process.exec)('start ' + url);
      break;
    default:
      (0, _child_process.spawn)('xdg-open', [url]);
  }
};