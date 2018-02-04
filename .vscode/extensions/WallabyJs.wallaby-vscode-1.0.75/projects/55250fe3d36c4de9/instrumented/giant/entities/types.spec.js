'use strict';
$_$wp(13);
var _chai = ($_$w(13, 0), require('chai'));
var _types = ($_$w(13, 1), require('./types.js'));
$_$w(13, 2), describe('types', function () {
    $_$wf(13);
    $_$w(13, 3), it('provides types interface', function () {
        $_$wf(13);
        const constraints = ($_$w(13, 4), [
            _types.is.required,
            _types.is.string,
            _types.is.notBlank,
            _types.is.notNull,
            _types.is.choice,
            _types.is.date,
            _types.is.counting,
            _types.is.integer,
            _types.is.relation,
            _types.is.relations,
            _types.is.emptyArray
        ]);
        const actual = ($_$w(13, 5), constraints.every(i => {
            $_$wf(13);
            return $_$w(13, 6), typeof i === 'function';
        }));
        const expected = ($_$w(13, 7), true);
        $_$w(13, 8), (0, _chai.expect)(actual).to.equal(expected);
    });
});
$_$wpe(13);