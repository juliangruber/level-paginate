var offsetStream = require('offset-stream');
var through      = require('ordered-through');
var fix          = require('level-fix-range');

module.exports = paginate;

function paginate (db, prefix, opts) {
  if (!opts) opts = {};
  if (!opts.page) opts.page = 0;
  if (!opts.num) opts.num = 10;
  var offset = opts.page * opts.num;
  var limit = offset + opts.num;

  return db.createKeyStream(fix({
    reverse : true,
    start   : prefix + '!',
    end     : prefix + '~',
    limit   : limit
  }))
  .pipe(offsetStream(offset))
  .pipe(through(db.get.bind(db)))
}
