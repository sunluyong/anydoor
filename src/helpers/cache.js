exports.getCacheHeaders = (stats, options) => {
  const headers = {};

  if (options.expires) {
    headers['Expires'] = (new Date(Date.now() + options.maxAge * 1000)).toUTCString();
  }

  if (options.cacheControl) {
    headers['Cache-Control'] = `public, max-age=${options.maxAge}`;
  }

  if (options.lastModified) {
    const lastModified = stats.mtime.toUTCString();
    headers['Last-Modified'] = lastModified;
  }

  if (options.etag) {
    const mtime = stats.mtime.getTime().toString(16)
    const size = stats.size.toString(16)

    headers['ETag'] = `"${size}-${mtime}"`;
  }

  return headers;
};

exports.isFresh = (reqHeaders, resHeaders) => {
  const noneMatch = reqHeaders['if-none-match'];
  const lastModified = reqHeaders['if-modified-since'];

  if(!noneMatch && !lastModified) {
    return false;
  }

  if (noneMatch && noneMatch !== resHeaders['ETag']){
    return false;
  }

  if (lastModified && lastModified !== resHeaders['Last-Modified']) {
    return false;
  }

  return true;
};
