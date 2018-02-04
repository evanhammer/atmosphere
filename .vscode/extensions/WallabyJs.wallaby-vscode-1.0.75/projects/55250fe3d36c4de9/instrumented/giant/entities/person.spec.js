'use strict';
$_$wp(11);
var _extends = ($_$w(11, 0), ($_$w(11, 1), Object.assign) || ($_$w(11, 2), function (target) {
    $_$wf(11);
    for (var i = 1; $_$w(11, 3), i < arguments.length; i++) {
        var source = ($_$w(11, 4), arguments[i]);
        for (var key in $_$w(11, 5), source) {
            if ($_$w(11, 6), Object.prototype.hasOwnProperty.call(source, key)) {
                $_$w(11, 7), target[key] = source[key];
            }
        }
    }
    return $_$w(11, 8), target;
}));
var _chai = ($_$w(11, 9), require('chai'));
var _moment = ($_$w(11, 10), require('moment'));
var _moment2 = ($_$w(11, 11), _interopRequireDefault(_moment));
var _event = ($_$w(11, 12), require('./event.js'));
var _person = ($_$w(11, 13), require('./person.js'));
function _interopRequireDefault(obj) {
    $_$wf(11);
    return $_$w(11, 14), ($_$w(11, 17), obj) && ($_$w(11, 18), obj.__esModule) ? ($_$w(11, 15), obj) : ($_$w(11, 16), { default: obj });
}
function _objectWithoutProperties(obj, keys) {
    $_$wf(11);
    var target = ($_$w(11, 19), {});
    for (var i in $_$w(11, 20), obj) {
        if ($_$w(11, 21), keys.indexOf(i) >= 0) {
            {
                $_$w(11, 22);
                continue;
            }
        }
        if ($_$w(11, 23), !Object.prototype.hasOwnProperty.call(obj, i)) {
            {
                $_$w(11, 24);
                continue;
            }
        }
        $_$w(11, 25), target[i] = obj[i];
    }
    return $_$w(11, 26), target;
}
const values = ($_$w(11, 27), {
    id: '-askjd28djdI',
    firstName: 'Jenny',
    lastName: 'Marker',
    action: 'some string',
    frequencyInDays: 5,
    lastContactedAt: (0, _moment2.default)().format('YYYY.MM.DD'),
    events: [
        '34',
        '23'
    ]
});
$_$w(11, 28), describe('entities/person', function () {
    $_$wf(11);
    $_$w(11, 29), describe('.isValidPerson', function () {
        $_$wf(11);
        $_$w(11, 30), it('is true if a valid person', function () {
            $_$wf(11);
            const props = ($_$w(11, 31), _extends({}, values, { id: '245' }));
            $_$w(11, 32), (0, _chai.expect)((0, _person.isValidPerson)(props)).to.eql(true);
        });
        $_$w(11, 33), it('is false if id is missing', function () {
            $_$wf(11);
            const {id} = ($_$w(11, 34), values), props = _objectWithoutProperties(values, ['id']);
            $_$w(11, 35), (0, _chai.expect)((0, _person.isValidPerson)(props)).to.eql(false);
        });
        $_$w(11, 36), describe('firstName', function () {
            $_$wf(11);
            $_$w(11, 37), it('is false if not a string', function () {
                $_$wf(11);
                const props = ($_$w(11, 38), _extends({}, values, { firstName: 45 }));
                $_$w(11, 39), (0, _chai.expect)((0, _person.isValidPerson)(props)).to.eql(false);
            });
            $_$w(11, 40), it('is false if blank', function () {
                $_$wf(11);
                const props = ($_$w(11, 41), _extends({}, values, { firstName: '' }));
                $_$w(11, 42), (0, _chai.expect)((0, _person.isValidPerson)(props)).to.eql(false);
            });
            $_$w(11, 43), it('is false if missing', function () {
                $_$wf(11);
                const {firstName} = ($_$w(11, 44), values), props = _objectWithoutProperties(values, ['firstName']);
                $_$w(11, 45), (0, _chai.expect)((0, _person.isValidPerson)(props)).to.eql(false);
            });
        });
        $_$w(11, 46), describe('lastName', function () {
            $_$wf(11);
            $_$w(11, 47), it('is false if not a string', function () {
                $_$wf(11);
                const props = ($_$w(11, 48), _extends({}, values, { lastName: 45 }));
                $_$w(11, 49), (0, _chai.expect)((0, _person.isValidPerson)(props)).to.eql(false);
            });
        });
        $_$w(11, 50), describe('action', function () {
            $_$wf(11);
            $_$w(11, 51), it('is false if not a string', function () {
                $_$wf(11);
                const props = ($_$w(11, 52), _extends({}, values, { action: 99 }));
                $_$w(11, 53), (0, _chai.expect)((0, _person.isValidPerson)(props)).to.eql(false);
            });
            $_$w(11, 54), it('is false if blank', function () {
                $_$wf(11);
                const props = ($_$w(11, 55), _extends({}, values, { action: '' }));
                $_$w(11, 56), (0, _chai.expect)((0, _person.isValidPerson)(props)).to.eql(false);
            });
        });
        $_$w(11, 57), describe('frequencyInDays', function () {
            $_$wf(11);
            $_$w(11, 58), it('is false if not an integer above 0', function () {
                $_$wf(11);
                const props = ($_$w(11, 59), _extends({}, values, { frequencyInDays: 0 }));
                $_$w(11, 60), (0, _chai.expect)((0, _person.isValidPerson)(props)).to.eql(false);
            });
        });
        $_$w(11, 61), describe('lastContactedAt', function () {
            $_$wf(11);
            $_$w(11, 62), it('is false if not a Date', function () {
                $_$wf(11);
                const props = ($_$w(11, 63), _extends({}, values, { lastContactedAt: 99 }));
                $_$w(11, 64), (0, _chai.expect)((0, _person.isValidPerson)(props)).to.eql(false);
            });
        });
        $_$w(11, 65), describe('events', function () {
            $_$wf(11);
            $_$w(11, 66), it('is false if not an array of strings', function () {
                $_$wf(11);
                const props = ($_$w(11, 67), _extends({}, values, { events: [99] }));
                $_$w(11, 68), (0, _chai.expect)((0, _person.isValidPerson)(props)).to.eql(false);
            });
        });
    });
    $_$w(11, 69), describe('.makeNewPerson', function () {
        $_$wf(11);
        const {id} = ($_$w(11, 70), values), valuesNoID = _objectWithoutProperties(values, ['id']);
        const newValues = ($_$w(11, 71), _extends({}, valuesNoID, { events: [] }));
        $_$w(11, 72), it('returns correct properties', function () {
            $_$wf(11);
            const _makeNewPerson = ($_$w(11, 73), (0, _person.makeNewPerson)(newValues)), {id} = _makeNewPerson, actual = _objectWithoutProperties(_makeNewPerson, ['id']);
            const expected = ($_$w(11, 74), newValues);
            $_$w(11, 75), (0, _chai.expect)(actual).to.eql(expected);
        });
        $_$w(11, 76), it('uses defaults for action, frequencyInDays, events', function () {
            $_$wf(11);
            const {action, frequencyInDays, events} = ($_$w(11, 77), newValues), props = _objectWithoutProperties(newValues, [
                    'action',
                    'frequencyInDays',
                    'events'
                ]);
            const person = ($_$w(11, 78), (0, _person.makeNewPerson)(props));
            const actual = ($_$w(11, 79), {
                action: person.action,
                frequencyInDays: person.frequencyInDays,
                events: person.events
            });
            const expected = ($_$w(11, 80), {
                action: 'Hang out',
                frequencyInDays: 30,
                events: []
            });
            $_$w(11, 81), (0, _chai.expect)(actual).to.eql(expected);
        });
        $_$w(11, 82), it('is null if events is not empty', function () {
            $_$wf(11);
            const props = ($_$w(11, 83), _extends({}, newValues, { events: [99] }));
            const actual = ($_$w(11, 84), (0, _person.makeNewPerson)(props));
            const expected = ($_$w(11, 85), null);
            $_$w(11, 86), (0, _chai.expect)(actual).to.eql(expected);
        });
    });
    $_$w(11, 87), describe('.makeUpdatedPerson', function () {
        $_$wf(11);
        $_$w(11, 88), it('returns correct properties', function () {
            $_$wf(11);
            const newProps = ($_$w(11, 89), { firstName: 'Updated' });
            const actual = ($_$w(11, 90), (0, _person.makeUpdatedPerson)(values, newProps).firstName);
            const expected = ($_$w(11, 91), newProps.firstName);
            $_$w(11, 92), (0, _chai.expect)(actual).to.eql(expected);
        });
        $_$w(11, 93), it('is null if invalid value', function () {
            $_$wf(11);
            const props = ($_$w(11, 94), { lastName: 99 });
            const actual = ($_$w(11, 95), (0, _person.makeUpdatedPerson)(values, props));
            const expected = ($_$w(11, 96), null);
            $_$w(11, 97), (0, _chai.expect)(actual).to.eql(expected);
        });
        $_$w(11, 98), it('is null if undeclared properties', function () {
            $_$wf(11);
            const badProps = ($_$w(11, 99), { badProp: 'something' });
            const actual = ($_$w(11, 100), (0, _person.makeUpdatedPerson)(values, badProps));
            const expected = ($_$w(11, 101), null);
            $_$w(11, 102), (0, _chai.expect)(actual).to.eql(expected);
        });
    });
    $_$w(11, 103), describe('lastEvent', function () {
        $_$wf(11);
        $_$w(11, 104), it('is last done event when done is most recent', () => {
            $_$wf(11);
            const events = ($_$w(11, 105), [
                {
                    startAt: '2016.12.12',
                    status: 'SCHEDULED',
                    person: '44'
                },
                {
                    startAt: '2017.03.11',
                    status: 'DONE',
                    person: '44'
                }
            ].map(props => {
                $_$wf(11);
                return $_$w(11, 106), (0, _event.makeNewEvent)(props);
            }));
            const {startAt: actual} = ($_$w(11, 107), (0, _person.lastEvent)(events));
            const expected = ($_$w(11, 108), '2017.03.11');
            $_$w(11, 109), (0, _chai.expect)(actual).to.eql(expected);
        });
        $_$w(11, 110), it('is last scheduled event when scheduled is most recent', () => {
            $_$wf(11);
            const events = ($_$w(11, 111), [
                {
                    startAt: '2016.12.12',
                    status: 'DONE',
                    person: '44'
                },
                {
                    startAt: '2017.03.11',
                    status: 'SCHEDULED',
                    person: '44'
                }
            ].map(props => {
                $_$wf(11);
                return $_$w(11, 112), (0, _event.makeNewEvent)(props);
            }));
            const {startAt: actual} = ($_$w(11, 113), (0, _person.lastEvent)(events));
            const expected = ($_$w(11, 114), '2017.03.11');
            $_$w(11, 115), (0, _chai.expect)(actual).to.eql(expected);
        });
        $_$w(11, 116), it('is null when no done or scheduled events', () => {
            $_$wf(11);
            const events = ($_$w(11, 117), [{
                    startAt: '2017.03.11',
                    status: 'CANCELED',
                    person: '44'
                }].map(props => {
                $_$wf(11);
                return $_$w(11, 118), (0, _event.makeNewEvent)(props);
            }));
            const actual = ($_$w(11, 119), (0, _person.lastEvent)(events));
            const expected = ($_$w(11, 120), null);
            $_$w(11, 121), (0, _chai.expect)(actual).to.eql(expected);
        });
        $_$w(11, 122), it('ignores canceled', () => {
            $_$wf(11);
            const events = ($_$w(11, 123), [
                {
                    startAt: '2017.03.11',
                    status: 'CANCELED',
                    person: '44'
                },
                {
                    startAt: '2016.12.12',
                    status: 'DONE',
                    person: '44'
                }
            ].map(props => {
                $_$wf(11);
                return $_$w(11, 124), (0, _event.makeNewEvent)(props);
            }));
            const {startAt: actual} = ($_$w(11, 125), (0, _person.lastEvent)(events));
            const expected = ($_$w(11, 126), '2016.12.12');
            $_$w(11, 127), (0, _chai.expect)(actual).to.eql(expected);
        });
    });
    $_$w(11, 128), describe('scheduledEvents', () => {
        $_$wf(11);
        $_$w(11, 129), it('is all and only scheduled events, newest first', () => {
            $_$wf(11);
            const events = ($_$w(11, 130), [
                {
                    startAt: '2017.03.11',
                    status: 'SCHEDULED',
                    person: '44'
                },
                {
                    startAt: '2017.03.15',
                    status: 'SCHEDULED',
                    person: '44'
                },
                {
                    startAt: '2017.03.16',
                    status: 'CANCELED',
                    person: '44'
                },
                {
                    startAt: '2016.12.12',
                    status: 'DONE',
                    person: '44'
                }
            ].map(props => {
                $_$wf(11);
                return $_$w(11, 131), (0, _event.makeNewEvent)(props);
            }));
            const actual = ($_$w(11, 132), (0, _person.scheduledEvents)(events).map(e => {
                $_$wf(11);
                return $_$w(11, 133), e.startAt;
            }));
            const expected = ($_$w(11, 134), [
                '2017.03.15',
                '2017.03.11'
            ]);
            $_$w(11, 135), (0, _chai.expect)(actual).to.eql(expected);
        });
    });
    $_$w(11, 136), describe('idealNextDate', function () {
        $_$wf(11);
        let person = $_$w(11, 137);
        $_$w(11, 138), beforeEach(function () {
            $_$wf(11);
            const defaultProps = ($_$w(11, 139), {
                firstName: 'Steve',
                action: 'some string',
                frequencyInDays: 5
            });
            $_$w(11, 140), person = (0, _person.makeNewPerson)(defaultProps);
        });
        $_$w(11, 141), it('is date of last event + frequency', function () {
            $_$wf(11);
            const events = ($_$w(11, 142), [
                {
                    startAt: '2017.03.11',
                    status: 'SCHEDULED',
                    person: '44'
                },
                {
                    startAt: '2016.12.12',
                    status: 'DONE',
                    person: '44'
                }
            ].map(props => {
                $_$wf(11);
                return $_$w(11, 143), (0, _event.makeNewEvent)(props);
            }));
            const actual = ($_$w(11, 144), (0, _person.idealNextDate)(person, events));
            const expected = ($_$w(11, 145), '2017.03.16');
            $_$w(11, 146), (0, _chai.expect)(actual).to.eql(expected);
        });
        $_$w(11, 147), it('is today if no events', function () {
            $_$wf(11);
            const today = ($_$w(11, 148), '2015.04.03');
            const actual = ($_$w(11, 149), (0, _person.idealNextDate)(person, [], today));
            const expected = ($_$w(11, 150), '2015.04.03');
            $_$w(11, 151), (0, _chai.expect)(actual).to.eql(expected);
        });
    });
    $_$w(11, 152), describe('isRipe', () => {
        $_$wf(11);
        const defaultEventProps = ($_$w(11, 153), {
            startAt: '1999.03.15',
            action: 'asd',
            status: 'DONE',
            person: { firstName: 'Steve' }
        });
        let person = $_$w(11, 154);
        $_$w(11, 155), beforeEach(() => {
            $_$wf(11);
            const defaultProps = ($_$w(11, 156), {
                firstName: 'Steve',
                action: 'some string',
                frequencyInDays: 5
            });
            $_$w(11, 157), person = (0, _person.makeNewPerson)(defaultProps);
        });
        $_$w(11, 158), it('is true if ready for event and ready for contact', () => {
            $_$wf(11);
            const contactedPerson = ($_$w(11, 159), _extends({}, person, { lastContactedAt: '2017.03.08' }));
            const today = ($_$w(11, 160), '2017.03.15');
            const dates = ($_$w(11, 161), ['2017.03.10']);
            const events = ($_$w(11, 162), dates.map(d => {
                $_$wf(11);
                return $_$w(11, 163), _extends({}, defaultEventProps, { startAt: d });
            }).map(props => {
                $_$wf(11);
                return $_$w(11, 164), (0, _event.makeNewEvent)(props);
            }));
            const actual = ($_$w(11, 165), (0, _person.isRipe)(contactedPerson, events, today));
            const expected = ($_$w(11, 166), true);
            $_$w(11, 167), (0, _chai.expect)(actual).to.equal(expected);
        });
        $_$w(11, 168), it('is true if ready for event and no previous contact', () => {
            $_$wf(11);
            const contactedPerson = ($_$w(11, 169), _extends({}, person, { lastContactedAt: null }));
            const today = ($_$w(11, 170), '2017.03.15');
            const dates = ($_$w(11, 171), ['2017.03.10']);
            const events = ($_$w(11, 172), dates.map(d => {
                $_$wf(11);
                return $_$w(11, 173), _extends({}, defaultEventProps, { startAt: d });
            }).map(props => {
                $_$wf(11);
                return $_$w(11, 174), (0, _event.makeNewEvent)(props);
            }));
            const actual = ($_$w(11, 175), (0, _person.isRipe)(contactedPerson, events, today));
            const expected = ($_$w(11, 176), true);
            $_$w(11, 177), (0, _chai.expect)(actual).to.equal(expected);
        });
        $_$w(11, 178), it('is false if ready for event but not ready for contact', () => {
            $_$wf(11);
            const contactedPerson = ($_$w(11, 179), _extends({}, person, { lastContactedAt: '2017.03.09' }));
            const today = ($_$w(11, 180), '2017.03.15');
            const dates = ($_$w(11, 181), ['2017.03.10']);
            const events = ($_$w(11, 182), dates.map(d => {
                $_$wf(11);
                return $_$w(11, 183), _extends({}, defaultEventProps, { startAt: d });
            }).map(props => {
                $_$wf(11);
                return $_$w(11, 184), (0, _event.makeNewEvent)(props);
            }));
            const actual = ($_$w(11, 185), (0, _person.isRipe)(contactedPerson, events, today));
            const expected = ($_$w(11, 186), false);
            $_$w(11, 187), (0, _chai.expect)(actual).to.equal(expected);
        });
        $_$w(11, 188), it('is false if not ready for event but ready for contact', () => {
            $_$wf(11);
            const contactedPerson = ($_$w(11, 189), _extends({}, person, { lastContactedAt: '2017.02.11' }));
            const today = ($_$w(11, 190), '2017.03.15');
            const dates = ($_$w(11, 191), [
                '2017.03.11',
                '2016.12.12'
            ]);
            const events = ($_$w(11, 192), dates.map(d => {
                $_$wf(11);
                return $_$w(11, 193), _extends({}, defaultEventProps, { startAt: d });
            }).map(props => {
                $_$wf(11);
                return $_$w(11, 194), (0, _event.makeNewEvent)(props);
            }));
            const actual = ($_$w(11, 195), (0, _person.isRipe)(contactedPerson, events, today));
            const expected = ($_$w(11, 196), false);
            $_$w(11, 197), (0, _chai.expect)(actual).to.equal(expected);
        });
        $_$w(11, 198), it('is null if today is not a date', () => {
            $_$wf(11);
            const actual = ($_$w(11, 199), (0, _person.isRipe)(person, [], undefined));
            const expected = ($_$w(11, 200), null);
            $_$w(11, 201), (0, _chai.expect)(actual).to.eql(expected);
        });
    });
});
$_$wpe(11);