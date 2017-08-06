const http = require('http');
const path = require('path');
const chalk = require('chalk');

const defaultConf = require('./config/default');
const route = require('./helpers/route');

class Server {
  constructor(options = {}) {
    this.config = Object.assign({}, defaultConf, options);
  }

  start() {
    const {
      root,
      port,
      hostname
    } = this.config;

    http.createServer((req, res) => {
      const url = req.url;
      const realFilePath = path.join(root, url);

      route(realFilePath, req, res, this.config);

    }).listen(port, hostname, err => {
      if (err) {
        throw err;
      }
      console.info(chalk.green(`Server started http://${hostname}:${port}`));
    });
  }
}

(new Server()).start();

module.exports = Server;
