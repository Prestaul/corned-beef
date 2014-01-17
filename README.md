corned-beef
===========

Create a hash value for any javascript object

Basic Usage
-----------
```js
var hash = require('corned-beef');

assert.equal(hash('foo bar is the best'), 7489163405);
assert.equal(hash({
    foo:'bar',
    boo:'far'
}), -5924828157);
assert.equal(hash({
    boo:'far',
    foo:'bar'
}), -5924828157);
```
