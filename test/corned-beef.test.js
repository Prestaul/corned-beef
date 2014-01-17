var assert = require('chai').assert,
	hash = require('../index');

describe('corned-beef', function() {

	describe('should return the same hash', function() {

		it('for identical strings', function() {
			var orig;

			orig = hash('foo bar');
			assert.isNumber(orig);
			assert.equal(hash('foo bar'), orig);

			orig = hash('boo far');
			assert.isNumber(orig);
			assert.equal(hash('boo far'), orig);

			orig = hash('foo bars');
			assert.isNumber(orig);
			assert.equal(hash('foo bars'), orig);

			orig = hash('foo  bar');
			assert.isNumber(orig);
			assert.equal(hash('foo  bar'), orig);
		});

		it('for identical numbers', function() {
			var orig;

			orig = hash(9876);
			assert.isNumber(orig);
			assert.equal(hash(9876), orig);

			orig = hash(1234);
			assert.isNumber(orig);
			assert.equal(hash(1234), orig);

			orig = hash(0);
			assert.isNumber(orig);
			assert.equal(hash(00), orig);

			orig = hash(-1234);
			assert.isNumber(orig);
			assert.equal(hash(-1234), orig);

			orig = hash(-9876);
			assert.isNumber(orig);
			assert.equal(hash(-9876), orig);
		});

		it('for true', function() {
			var orig = hash(true);
			assert.isNumber(orig);
			assert.equal(hash(true), orig);
		});

		it('for false', function() {
			var orig = hash(false);
			assert.isNumber(orig);
			assert.equal(hash(false), orig);
		});

		it('for identical arrays', function() {
			var orig;

			orig = hash([1,2,3]);
			assert.isNumber(orig);
			assert.equal(hash([1,2,3]), orig);

			orig = hash(['foo','bar',1,2,3,true]);
			assert.isNumber(orig);
			assert.equal(hash(['foo','bar',1,2,3,true]), orig);
		});

		it('for identical objects', function() {
			var orig;

			orig = hash({
				foo:'bar'
			});
			assert.isNumber(orig);
			assert.equal(hash({
				foo:'bar'
			}), orig);

			orig = hash({
				foo:'bar',
				k:2,
				array: [ 'please' ]
			});
			assert.isNumber(orig);
			assert.equal(hash({
				foo:'bar',
				k:2,
				array: [ 'please' ]
			}), orig);

			orig = hash({
				foo: {
					nested: [ { should: 'work' }, true ]
				}
			});
			assert.isNumber(orig);
			assert.equal(hash({
				foo: {
					nested: [ { should: 'work' }, true ]
				}
			}), orig);
		});

		it('for objects with reordered keys', function() {
			var orig;

			orig = hash({
				foo:'bar',
				boo:'far'
			});
			assert.isNumber(orig);
			assert.equal(hash({
				boo:'far',
				foo:'bar'
			}), orig);

			orig = hash({
				foo:'bar',
				array: [ 'please' ],
				k:2
			});
			assert.isNumber(orig);
			assert.equal(hash({
				array: [ 'please' ],
				k:2,
				foo:'bar'
			}), orig);

			orig = hash({
				foo: {
					nested: [ { should: 'work', please:true }, true ]
				}
			});
			assert.isNumber(orig);
			assert.equal(hash({
				foo: {
					nested: [ { please:true, should: 'work' }, true ]
				}
			}), orig);
		});

	});

	describe('should return a different hash', function() {

		it('for different strings', function() {
			var orig = hash('foo bar');

			assert.notEqual(hash('boo far'), orig);
			assert.notEqual(hash('foo bars'), orig);
			assert.notEqual(hash('foo  bar'), orig);
		});

		it('for different numbers', function() {
			var orig = hash(9876);

			assert.notEqual(hash(1234), orig);
			assert.notEqual(hash(0), orig);
			assert.notEqual(hash(-1234), orig);
			assert.notEqual(hash(-9876), orig);
		});

		it('for different bools', function() {
			assert.notEqual(hash(true), hash(false));
		});

		it('for different arrays', function() {
			var orig = hash([1,2,3,4]);

			assert.notEqual(hash([1,2,3]), orig);
			assert.notEqual(hash([1,2,3,4,5]), orig);
			assert.notEqual(hash([1,2,4,3]), orig);
			assert.notEqual(hash([1,2,3,'4']), orig);
		});

		it('for different objects', function() {
			var orig = hash({
				foo: {
					nested: [ { should: 'work' }, true ]
				}
			});

			assert.notEqual(hash({
				foo: {
					nested: [ { should: 'work' }, false ]
				}
			}), orig);
			assert.notEqual(hash({
				foo: {
					nested: [ { should: 'work' }, true ]
				},
				boo: 'far'
			}), orig);
			assert.notEqual(hash({
				food: {
					nested: [ { should: 'work' }, true ]
				}
			}), orig);
		});

	});

});
