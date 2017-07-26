'use strict';

var _server = require('./server');

var _server2 = _interopRequireDefault(_server);

var _yargs = require('yargs');

var _yargs2 = _interopRequireDefault(_yargs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var argv = _yargs2.default.usage('anywhere [options]').option('p', {
  alias: 'port',
  describe: '自定义端口号',
  default: 9527
}).option('h', {
  alias: 'host',
  describe: '自定义 host',
  default: '127.0.0.1'
}).option('d', {
  alias: 'dir',
  describe: '自定义根目录',
  default: process.cwd()
}).version().alias('v', 'version').help().argv;

_server2.default.start(argv);