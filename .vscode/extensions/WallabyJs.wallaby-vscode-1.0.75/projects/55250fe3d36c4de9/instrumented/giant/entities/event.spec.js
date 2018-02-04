'use strict';
$_$wp(9);
var _extends = ($_$w(9, 0), ($_$w(9, 1), Object.assign) || ($_$w(9, 2), function (target) {
    $_$wf(9);
    for (var i = 1; $_$w(9, 3), i < arguments.length; i++) {
        var source = ($_$w(9, 4), arguments[i]);
        for (var key in $_$w(9, 5), source) {
            if ($_$w(9, 6), Object.prototype.hasOwnProperty.call(source, key)) {
                $_$w(9, 7), target[key] = source[key];
            }
        }
    }
    return $_$w(9, 8), target;
}));
var _chai = ($_$w(9, 9), require('chai'));
var _event = ($_$w(9, 10), require('./event.js'));
function _objectWithoutProperties(obj, keys) {
    $_$wf(9);
    var target = ($_$w(9, 11), {});
    for (var i in $_$w(9, 12), obj) {
        if ($_$w(9, 13), keys.indexOf(i) >= 0) {
            {
                $_$w(9, 14);
                continue;
            }
        }
        if ($_$w(9, 15), !Object.prototype.hasOwnProperty.call(obj, i)) {
            {
                $_$w(9, 16);
                continue;
            }
        }
        $_$w(9, 17), target[i] = obj[i];
    }
    return $_$w(9, 18), target;
}
const values = ($_$w(9, 19), {
    id: 'asd234',
    startAt: '2016.12.11',
    action: 'some action',
    status: 'SCHEDULED',
    person: undefined
});
$_$w(9, 20), describe('entites/event', function () {
    $_$wf(9);
    $_$w(9, 21), describe('.isValidEvent', function () {
        $_$wf(9);
        $_$w(9, 22), it('is true if a valid event', function () {
            $_$wf(9);
            const props = ($_$w(9, 23), _extends({}, values, { id: 'akjsd239' }));
            $_$w(9, 24), (0, _chai.expect)((0, _event.isValidEvent)(props)).to.eql(true);
        });
        $_$w(9, 25), it('is false if id is missing', function () {
            $_$wf(9);
            const {id} = ($_$w(9, 26), values), props = _objectWithoutProperties(values, ['id']);
            $_$w(9, 27), (0, _chai.expect)((0, _event.isValidEvent)(props)).to.eql(false);
        });
        $_$w(9, 28), describe('startAt', function () {
            $_$wf(9);
            $_$w(9, 29), it('is false if not a valid date string', function () {
                $_$wf(9);
                const props = ($_$w(9, 30), _extends({}, values, { startAt: '99' }));
                $_$w(9, 31), (0, _chai.expect)((0, _event.isValidEvent)(props)).to.eql(false);
            });
            $_$w(9, 32), it('is false if missing', function () {
                $_$wf(9);
                const {startAt} = ($_$w(9, 33), values), props = _objectWithoutProperties(values, ['startAt']);
                $_$w(9, 34), (0, _chai.expect)((0, _event.isValidEvent)(props)).to.eql(false);
            });
        });
        $_$w(9, 35), describe('action', function () {
            $_$wf(9);
            $_$w(9, 36), it('is false if not a string', function () {
                $_$wf(9);
                const props = ($_$w(9, 37), _extends({}, values, { action: 99 }));
                $_$w(9, 38), (0, _chai.expect)((0, _event.isValidEvent)(props)).to.eql(false);
            });
            $_$w(9, 39), it('is false if blank', function () {
                $_$wf(9);
                const props = ($_$w(9, 40), _extends({}, values, { action: '' }));
                $_$w(9, 41), (0, _chai.expect)((0, _event.isValidEvent)(props)).to.eql(false);
            });
            $_$w(9, 42), it('is false if missing', function () {
                $_$wf(9);
                const {action} = ($_$w(9, 43), values), props = _objectWithoutProperties(values, ['action']);
                $_$w(9, 44), (0, _chai.expect)((0, _event.isValidEvent)(props)).to.eql(false);
            });
        });
        $_$w(9, 45), describe('status', function () {
            $_$wf(9);
            $_$w(9, 46), it('returns all statuses', function () {
                $_$wf(9);
                const actual = ($_$w(9, 47), _event.STATUS.map(status => {
                    $_$wf(9);
                    return $_$w(9, 48), _extends({}, values, { status });
                }).every(_event.isValidEvent));
                const expected = ($_$w(9, 49), true);
                $_$w(9, 50), (0, _chai.expect)(actual).to.eql(expected);
            });
            $_$w(9, 51), it('is false if not in status list', function () {
                $_$wf(9);
                const props = ($_$w(9, 52), _extends({}, values, { status: 'junk' }));
                $_$w(9, 53), (0, _chai.expect)((0, _event.isValidEvent)(props)).to.eql(false);
            });
            $_$w(9, 54), it('is false if missing', function () {
                $_$wf(9);
                const {status} = ($_$w(9, 55), values), props = _objectWithoutProperties(values, ['status']);
                $_$w(9, 56), (0, _chai.expect)((0, _event.isValidEvent)(props)).to.eql(false);
            });
        });
        $_$w(9, 57), describe('person', function () {
            $_$wf(9);
            $_$w(9, 58), it('is false if not an string', function () {
                $_$wf(9);
                const props = ($_$w(9, 59), _extends({}, values, { person: 99 }));
                $_$w(9, 60), (0, _chai.expect)((0, _event.isValidEvent)(props)).to.eql(false);
            });
            $_$w(9, 61), it('is false if missing', function () {
                $_$wf(9);
                const {person} = ($_$w(9, 62), values), props = _objectWithoutProperties(values, ['person']);
                $_$w(9, 63), (0, _chai.expect)((0, _event.isValidEvent)(props)).to.eql(false);
            });
        });
    });
    $_$w(9, 64), describe('.makeNewEvent', function () {
        $_$wf(9);
        const {id} = ($_$w(9, 65), values), newValues = _objectWithoutProperties(values, ['id']);
        $_$w(9, 66), it('returns correct properties', function () {
            $_$wf(9);
            const _makeNewEvent = ($_$w(9, 67), (0, _event.makeNewEvent)(newValues)), {id} = _makeNewEvent, actual = _objectWithoutProperties(_makeNewEvent, ['id']);
            const expected = ($_$w(9, 68), newValues);
            $_$w(9, 69), (0, _chai.expect)(actual).to.eql(expected);
        });
    });
    $_$w(9, 70), describe('.makeUpdatedEvent', function () {
        $_$wf(9);
        $_$w(9, 71), it('returns correct properties', function () {
            $_$wf(9);
            const newProps = ($_$w(9, 72), { action: 'Updated' });
            const actual = ($_$w(9, 73), (0, _event.makeUpdatedEvent)(values, newProps).firstName);
            const expected = ($_$w(9, 74), newProps.firstName);
            $_$w(9, 75), (0, _chai.expect)(actual).to.eql(expected);
        });
        $_$w(9, 76), it('is null if invalid value', function () {
            $_$wf(9);
            const actual = ($_$w(9, 77), (0, _event.makeUpdatedEvent)(values, { action: 99 }));
            const expected = ($_$w(9, 78), null);
            $_$w(9, 79), (0, _chai.expect)(actual).to.eql(expected);
        });
        $_$w(9, 80), it('is null if undeclared properties', function () {
            $_$wf(9);
            const actual = ($_$w(9, 81), (0, _event.makeUpdatedEvent)(values, { badProp: 'something' }));
            const expected = ($_$w(9, 82), null);
            $_$w(9, 83), (0, _chai.expect)(actual).to.eql(expected);
        });
    });
});
$_$wpe(9);