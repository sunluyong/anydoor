const yargs = require('yargs');
const Server = require('./app');

const argv = yargs
  .usage('anydoor [options]')
  .option('p', {
    alias: 'port',
    describe: '自定义端口号',
    default: '9527'
  })
  .option('h', {
    alias: 'host',
    describe: '自定义 host',
    default: '127.0.0.1'
  })
  .option('d', {
    alias: 'root',
    describe: '自定义根目录',
    default: process.cwd()
  })
  .version()
  .alias('v', 'version')
  .help()
  .argv;

const server = new Server(argv);
server.start();

