module.exports = {
  root: process.cwd(),
  port: 9527,
  hostname: 'localhost',
  cache: {
    maxAge: 60,
    etag: true,
    expires: true,
    cacheControl: true,
    lastModified: true
  },
  compress: {
    match : /\.(css|js|html)/
  }
};
