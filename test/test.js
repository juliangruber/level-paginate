var rimraf   = require('rimraf');
var level    = require('level');
var paginate = require('..');
var test     = require('tap').test;

test('paginate', function (t) {
  rimraf.sync(__dirname + '/db');
  var db = level(__dirname + '/db');

  prepare(db, function (err) {
    if (err) throw err;

    var page0 = [];

    paginate(db, 'post', { page : 0, num : 10 })
      .on('data', page0.push.bind(page0))
      .on('end', function () {
        t.deepEqual(page0, [
          'post!119', 'post!118', 'post!117', 'post!116', 'post!115',
          'post!114', 'post!113', 'post!112', 'post!111', 'post!110'
        ]);

        var page1 = [];

        paginate(db, 'post', { page : 1, num : 10 })
          .on('data', page1.push.bind(page1))
          .on('end', function () {
            t.deepEqual(page1, [
              'post!109', 'post!108', 'post!107', 'post!106', 'post!105',
              'post!104', 'post!103', 'post!102', 'post!101', 'post!100'
            ]);

            t.end();
          });
      });
  });
});


function prepare (db, cb) {
  var id = 100;
  var batch = [];
  for (var i = 0; i < 20; i++) {
    var key = 'post!' + id++;
    batch.push({ type : 'put', key : key, value : key });
  }
  db.batch(batch, cb);
}
