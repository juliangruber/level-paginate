require('rimraf').sync(__dirname + '/db');
var levelup = require('level');
var db = levelup(__dirname + '/db');
var paginate = require('..');

prepare(db, function (err) {
  if (err) throw err;

  console.log('page 0:');

  paginate(db, 'post', { page : 0, num : 10 })
    .on('data', console.log)
    .on('end', function () {
      console.log('\npage 1:');

      paginate(db, 'post', { page : 1, num : 10 })
        .on('data', console.log);
    });
});

function prepare (db, cb) {
  var id = 100;
  var batch = [];
  for (var i = 0; i < 20; i++) {
    var key = 'post!' + id++;
    batch.push({ type : 'put', key : key, value : key + ' body' });
  }
  db.batch(batch, cb);
}
