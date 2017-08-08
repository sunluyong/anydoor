const fs = require('fs');
const path = require('path');
const handlerbars = require('handlebars');

const {
  promisify
} = require('util');
const debug = require('debug')('route');

const mime = require('./mime');
const cache = require('./cache');
const compress = require('./compress');
const range = require('./range');

const stat = promisify(fs.stat);
const readDir = promisify(fs.readdir);

const tmpl = fs.readFileSync(path.join(__dirname, '../tmplates/directory.tpl'));
const template = handlerbars.compile(tmpl.toString());

module.exports = async function (filePath, req, res, config) {
  debug(filePath);
  try {
    const stats = await stat(filePath);

    if (stats.isFile()) {
      const headers = cache.getCacheHeaders(stats, config.cache);
      const isFresh = cache.isFresh(req.headers, headers);

      if (isFresh) {
        res.writeHead(304, Object.assign({
          'Content-Type': mime(filePath)
        }, headers));
        res.end();
      } else {
        if (req.headers['range']) {
          res.setHeader('Accept-Ranges', 'bytes');
          const obj = range(req.headers['range'], stats.size);
          if (obj.code === 416) {
            debug('range out');
            res.writeHead(416, Object.assign({
              'Content-Type': mime(filePath)
            }, obj.headers, headers));
            res.end();
          } else {
            res.writeHead(206, Object.assign({
              'Content-Type': mime(filePath)
            }, obj.headers, headers));
            fs.createReadStream(filePath, {
              start: obj.start,
              end: obj.end
            }).pipe(res);
          }

        } else {
          let rs = fs.createReadStream(filePath);

          if (path.extname(filePath).match(config.compress.match)) {
            rs = compress(rs, req, res);
          }

          res.writeHead(200, Object.assign({
            'Content-Type': mime(filePath)
          }, headers));

          rs.pipe(res);
        }
      }

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
