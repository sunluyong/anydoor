const fs = require('fs');
const path = require('path');
const handlerbars = require('handlebars');

const { promisify } = require('util');
const debug = require('debug')('route');

const mime = require('./mime');

const stat = promisify(fs.stat);
const readDir = promisify(fs.readdir);

const tmpl = fs.readFileSync(path.join(__dirname, '../tmplates/directory.tpl'));
const template = handlerbars.compile(tmpl.toString());

module.exports = async function (filePath, req, res, config) {
  debug(filePath);
  try {
    const stats = await stat(filePath);

    if (stats.isFile()) {
      res.writeHead(200, {
        'Content-Type': mime(filePath)
      });
      fs.createReadStream(filePath).pipe(res);

    } else if (stats.isDirectory()) {

      res.writeHead(200, {
        'Content-Type': mime('html')
      });

      const files = await readDir(filePath);

      res.end(template({
        name: path.basename(filePath),
        dir: path.relative(config.root, filePath),
        files
      }));

    }
  } catch (ex) {
    console.error(ex);
    res.writeHead(404, {
      'Content-Type': mime('txt')
    });
    res.end('No such file or directory found!');
  }
};
