import yargs from 'yargs';
import Server from './app';

const argv = yargs
  .usage('anywhere [options]')
  .option('p', {
    alias: 'port',
    describe: '自定义端口号',
    default: 9527
  })
  .option('h', {
    alias: 'host',
    describe: '自定义 host',
    default: '127.0.0.1'
  })
  .option('d', {
    alias: 'dir',
    describe: '自定义根目录',
    default: process.cwd()
  })
  .version()
  .alias('v', 'version')
  .help()
  .argv;

  Server.start(argv);
