'use strict';
$_$wp(17);
var _chai = ($_$w(17, 0), require('chai'));
var _gateway = ($_$w(17, 1), require('./gateway.js'));
var _gateway2 = ($_$w(17, 2), _interopRequireDefault(_gateway));
function _interopRequireDefault(obj) {
    $_$wf(17);
    return $_$w(17, 3), ($_$w(17, 6), obj) && ($_$w(17, 7), obj.__esModule) ? ($_$w(17, 4), obj) : ($_$w(17, 5), { default: obj });
}
function _objectWithoutProperties(obj, keys) {
    $_$wf(17);
    var target = ($_$w(17, 8), {});
    for (var i in $_$w(17, 9), obj) {
        if ($_$w(17, 10), keys.indexOf(i) >= 0) {
            {
                $_$w(17, 11);
                continue;
            }
        }
        if ($_$w(17, 12), !Object.prototype.hasOwnProperty.call(obj, i)) {
            {
                $_$w(17, 13);
                continue;
            }
        }
        $_$w(17, 14), target[i] = obj[i];
    }
    return $_$w(17, 15), target;
}
const methods = ($_$w(17, 16), {
    create: '',
    read: '',
    readMany: '',
    save: '',
    destroy: ''
});
$_$w(17, 17), describe('Gateway', () => {
    $_$wf(17);
    $_$w(17, 18), it('is function', () => {
        $_$wf(17);
        const actual = ($_$w(17, 19), typeof (0, _gateway2.default)(() => {
            $_$wf(17);
            return $_$w(17, 20), methods;
        }));
        const expected = ($_$w(17, 21), 'function');
        $_$w(17, 22), (0, _chai.expect)(actual).to.eql(expected);
    });
    $_$w(17, 23), it('throws error when Spec doesnt return create', () => {
        $_$wf(17);
        const {create} = ($_$w(17, 24), methods), test = _objectWithoutProperties(methods, ['create']);
        const $_$wvd26 = $_$w(17, 25), actual = () => {
                $_$wf(17);
                return $_$w(17, 26), (0, _gateway2.default)(() => {
                    $_$wf(17);
                    return $_$w(17, 27), test;
                })([]);
            };
        $_$w(17, 28), (0, _chai.expect)(actual).to.throw(Error);
    });
    $_$w(17, 29), it('throws error when Spec doesnt return read', () => {
        $_$wf(17);
        const {read} = ($_$w(17, 30), methods), test = _objectWithoutProperties(methods, ['read']);
        const $_$wvd32 = $_$w(17, 31), actual = () => {
                $_$wf(17);
                return $_$w(17, 32), (0, _gateway2.default)(() => {
                    $_$wf(17);
                    return $_$w(17, 33), test;
                })([]);
            };
        $_$w(17, 34), (0, _chai.expect)(actual).to.throw(Error);
    });
    $_$w(17, 35), it('throws error when spec doesnt return readMany', () => {
        $_$wf(17);
        const {readMany} = ($_$w(17, 36), methods), test = _objectWithoutProperties(methods, ['readMany']);
        const $_$wvd38 = $_$w(17, 37), actual = () => {
                $_$wf(17);
                return $_$w(17, 38), (0, _gateway2.default)(() => {
                    $_$wf(17);
                    return $_$w(17, 39), test;
                })([]);
            };
        $_$w(17, 40), (0, _chai.expect)(actual).to.throw(Error);
    });
    $_$w(17, 41), it('throws error when spec doesnt have save', () => {
        $_$wf(17);
        const {save} = ($_$w(17, 42), methods), test = _objectWithoutProperties(methods, ['save']);
        const $_$wvd44 = $_$w(17, 43), actual = () => {
                $_$wf(17);
                return $_$w(17, 44), (0, _gateway2.default)(() => {
                    $_$wf(17);
                    return $_$w(17, 45), test;
                })([]);
            };
        $_$w(17, 46), (0, _chai.expect)(actual).to.throw(Error);
    });
    $_$w(17, 47), it('throws error when spec doesnt have destroy', () => {
        $_$wf(17);
        const {destroy} = ($_$w(17, 48), methods), test = _objectWithoutProperties(methods, ['destroy']);
        const $_$wvd50 = $_$w(17, 49), actual = () => {
                $_$wf(17);
                return $_$w(17, 50), (0, _gateway2.default)(() => {
                    $_$wf(17);
                    return $_$w(17, 51), test;
                })([]);
            };
        $_$w(17, 52), (0, _chai.expect)(actual).to.throw(Error);
    });
    $_$w(17, 53), describe('Returned Function', () => {
        $_$wf(17);
        $_$w(17, 54), it('returns the object passed as spec', () => {
            $_$wf(17);
            const obj = ($_$w(17, 55), (0, _gateway2.default)(() => {
                $_$wf(17);
                return $_$w(17, 56), methods;
            })([]));
            $_$w(17, 57), (0, _chai.expect)(obj).to.eql(methods);
        });
        $_$w(17, 58), it('errors if types isnt an array', function () {
            $_$wf(17);
            $_$w(17, 59), (0, _chai.expect)(() => {
                $_$wf(17);
                return $_$w(17, 60), (0, _gateway2.default)(methods)({});
            }).to.throw(Error);
        });
    });
});
$_$wpe(17);