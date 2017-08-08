module.exports = (rangeText, totalSize) => {
  const sizes = rangeText.match(/bytes=(\d*)-(\d*)/);
  const end = sizes[2] || totalSize - 1;
  const start = sizes[1] || totalSize - end;

  if (start > totalSize || end > totalSize || start > end) {
    return {
      code: 416,
      headers: {
        'Content-Range': `bytes */${totalSize}`
      }
    }
  }

  return {
    code: 206,
    start: parseInt(start),
    end: parseInt(end),
    headers: {
      'Content-Range': `bytes ${start}-${end}/${totalSize}`
    }
  };
};
