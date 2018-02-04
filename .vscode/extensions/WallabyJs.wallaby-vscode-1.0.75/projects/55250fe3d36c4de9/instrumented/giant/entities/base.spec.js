'use strict';
$_$wp(7);
var _chai = ($_$w(7, 0), require('chai'));
var _types = ($_$w(7, 1), require('./types.js'));
var _base = ($_$w(7, 2), require('./base.js'));
$_$w(7, 3), describe('entities/base', function () {
    $_$wf(7);
    $_$w(7, 4), describe('.isValid', function () {
        $_$wf(7);
        $_$w(7, 5), it('is true if props are declared and valid', function () {
            $_$wf(7);
            const propTypes = ($_$w(7, 6), { prop1: [_types.is.date()] });
            const validProps = ($_$w(7, 7), { prop1: null });
            $_$w(7, 8), (0, _chai.expect)((0, _base.isValid)(propTypes, validProps)).to.eql(true);
        });
        $_$w(7, 9), it('is false if props are not declared', function () {
            $_$wf(7);
            const propTypes = ($_$w(7, 10), { prop1: [] });
            const props = ($_$w(7, 11), {
                prop1: 'asd',
                prop3: 9
            });
            $_$w(7, 12), (0, _chai.expect)((0, _base.isValid)(propTypes, props)).to.eql(false);
        });
        $_$w(7, 13), it('is false if props are not valid', function () {
            $_$wf(7);
            const propTypes = ($_$w(7, 14), { prop1: [_types.is.string()] });
            const props = ($_$w(7, 15), { prop1: 9 });
            $_$w(7, 16), (0, _chai.expect)((0, _base.isValid)(propTypes, props)).to.eql(false);
        });
        $_$w(7, 17), it('is false if any properties are missing', function () {
            $_$wf(7);
            const propTypes = ($_$w(7, 18), {
                prop1: _types.is.string(),
                prop2: _types.is.string()
            });
            const props = ($_$w(7, 19), { prop2: 'value' });
            $_$w(7, 20), (0, _chai.expect)((0, _base.isValid)(propTypes, props)).to.eql(false);
        });
    });
});
$_$wpe(7);