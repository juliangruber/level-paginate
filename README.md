
# level-paginate

Streaming pagination for leveldb.

[![build status](https://secure.travis-ci.org/juliangruber/level-paginate.png)](http://travis-ci.org/juliangruber/level-paginate)

## Usage

With posts in your db like this, with monotonically ascending ids/timestamps in
their keys:

```bash
post!100 = post!100 body
post!101 = post!101 body
post!102 = post!102 body
...
```

You can paginate in a streaming manner like this:

```js
var level = require('level');
var paginate = require('level-paginate');
var db = levelup(__dirname + '/db');

console.log('page 0:');

paginate(db, 'post', { page : 0, num : 10 })
  .on('data', console.log)
  .on('end', function () {
    console.log('\npage 1:');

    paginate(db, 'post', { page : 1, num : 10 })
      .on('data', console.log);
  });
```

And the output is:

```bash
$ node example/simple.js
page 0:
post!119 body
post!118 body
post!117 body
post!116 body
post!115 body
post!114 body
post!113 body
post!112 body
post!111 body
post!110 body

page 1:
post!109 body
post!108 body
post!107 body
post!106 body
post!105 body
post!104 body
post!103 body
post!102 body
post!101 body
post!100 body
```

## API

### paginate(db, prefix[, options])

Paginate over all key/value pairs in `db` that start with `prefix`.

Possible `options` are:

* `page`: The page that you want. Defaults to `0`.
* `num`: The amount of key/value pairs to get. Defaults to `10`.

## Installation

With [npm](http://npmjs.org) do

```bash
$ npm install level-paginate
```

## License

(MIT)

Copyright (c) 2013 Julian Gruber &lt;julian@juliangruber.com&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
