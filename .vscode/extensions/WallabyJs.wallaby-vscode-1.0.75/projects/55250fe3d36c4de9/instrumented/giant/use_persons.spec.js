'use strict';
$_$wp(5);
var _extends = ($_$w(5, 0), ($_$w(5, 1), Object.assign) || ($_$w(5, 2), function (target) {
    $_$wf(5);
    for (var i = 1; $_$w(5, 3), i < arguments.length; i++) {
        var source = ($_$w(5, 4), arguments[i]);
        for (var key in $_$w(5, 5), source) {
            if ($_$w(5, 6), Object.prototype.hasOwnProperty.call(source, key)) {
                $_$w(5, 7), target[key] = source[key];
            }
        }
    }
    return $_$w(5, 8), target;
}));
var _chai = ($_$w(5, 9), require('chai'));
var _person = ($_$w(5, 10), require('./entities/person.js'));
var _use_persons = ($_$w(5, 11), require('./use_persons.js'));
var _errors = ($_$w(5, 12), require('./errors.js'));
function _asyncToGenerator(fn) {
    $_$wf(5);
    return $_$w(5, 13), function () {
        $_$wf(5);
        var gen = ($_$w(5, 14), fn.apply(this, arguments));
        return $_$w(5, 15), new Promise(function (resolve, reject) {
            $_$wf(5);
            function step(key, arg) {
                $_$wf(5);
                try {
                    var info = ($_$w(5, 16), gen[key](arg));
                    var value = ($_$w(5, 17), info.value);
                } catch (error) {
                    $_$w(5, 18), reject(error);
                    return $_$w(5, 19);
                }
                if ($_$w(5, 20), info.done) {
                    $_$w(5, 21), resolve(value);
                } else {
                    return $_$w(5, 22), Promise.resolve(value).then(function (value) {
                        $_$wf(5);
                        $_$w(5, 23), step('next', value);
                    }, function (err) {
                        $_$wf(5);
                        $_$w(5, 24), step('throw', err);
                    });
                }
            }
            return $_$w(5, 25), step('next');
        });
    };
}
const ID = ($_$w(5, 26), '-default3ID');
const ID2 = ($_$w(5, 27), '-some9TestID');
$_$w(5, 28), describe('use_persons', function () {
    $_$wf(5);
    const defaultProps = ($_$w(5, 29), {
        firstName: 'Max',
        action: 'some action',
        frequencyInDays: 50
    });
    const defaultPerson = ($_$w(5, 30), _extends({}, (0, _person.makeNewPerson)(defaultProps), { id: ID }));
    const persons = ($_$w(5, 31), { [ID]: defaultPerson });
    const events = ($_$w(5, 32), {
        23: {
            id: 23,
            startAt: '2015.03.04',
            action: 'Dinner',
            status: 'SCHEDULED',
            person: 3
        },
        45: {
            id: 45,
            startAt: '2016.05.14',
            action: 'Phone call',
            status: 'DONE',
            person: 3
        }
    });
    const gateway = ($_$w(5, 33), {
        create: (type, person) => {
            $_$wf(5);
            return $_$w(5, 34), _extends({}, person, { id: ID2 });
        },
        save: (type, person) => {
            $_$wf(5);
            return $_$w(5, 35), person;
        },
        read: (type, id) => {
            $_$wf(5);
            return $_$w(5, 36), ($_$w(5, 37), persons[id]) || ($_$w(5, 38), null);
        },
        readMany: type => {
            $_$wf(5);
            if ($_$w(5, 39), type === 'persons') {
                return $_$w(5, 40), [defaultPerson];
            }
            if ($_$w(5, 41), type === 'events') {
                return $_$w(5, 42), Object.values(events);
            }
        },
        destroy: (type, id) => {
            $_$wf(5);
            if ($_$w(5, 43), id !== defaultPerson.id) {
                {
                    $_$w(5, 44);
                    throw new Error();
                }
            }
            return $_$w(5, 45), id;
        }
    });
    $_$w(5, 46), describe('.addPerson', function () {
        $_$wf(5);
        $_$w(5, 47), it('returns added Person', _asyncToGenerator(function* () {
            $_$wf(5);
            const actual = ($_$w(5, 48), yield (0, _use_persons.addPerson)(_extends({ props: defaultProps }, gateway)));
            const expected = ($_$w(5, 49), {
                id: ID2,
                firstName: 'Max',
                lastName: '',
                action: 'some action',
                frequencyInDays: 50,
                lastContactedAt: null,
                events: []
            });
            $_$w(5, 50), (0, _chai.expect)(actual).to.eql(expected);
        }));
    });
    $_$w(5, 51), describe('.findPerson', function () {
        $_$wf(5);
        $_$w(5, 52), it('returns correct Person by ID', _asyncToGenerator(function* () {
            $_$wf(5);
            const {id} = ($_$w(5, 53), defaultPerson);
            const actual = ($_$w(5, 54), yield (0, _use_persons.findPerson)(_extends({ id }, gateway)));
            const expected = ($_$w(5, 55), defaultPerson);
            $_$w(5, 56), (0, _chai.expect)(actual).to.eql(expected);
        }));
        $_$w(5, 57), it('errors on non-existent ID', function () {
            $_$wf(5);
            return $_$w(5, 58), (0, _chai.expect)((0, _use_persons.findPerson)(_extends({ id: 9999 }, gateway))).to.be.rejectedWith(_errors.NotFoundError);
        });
    });
    $_$w(5, 59), describe('.findPersons', function () {
        $_$wf(5);
        $_$w(5, 60), it('returns list of Persons', _asyncToGenerator(function* () {
            $_$wf(5);
            const actual = ($_$w(5, 61), yield (0, _use_persons.findPersons)(_extends({}, gateway)));
            const expected = ($_$w(5, 62), [defaultPerson]);
            $_$w(5, 63), (0, _chai.expect)(actual).to.eql(expected);
        }));
    });
    $_$w(5, 64), describe('.editPerson', function () {
        $_$wf(5);
        $_$w(5, 65), it('edits correct Person', _asyncToGenerator(function* () {
            $_$wf(5);
            const {id} = ($_$w(5, 66), defaultPerson);
            const props = ($_$w(5, 67), { lastName: 'Manic' });
            const actual = ($_$w(5, 68), yield (0, _use_persons.editPerson)(_extends({
                props,
                id
            }, gateway)));
            const expected = ($_$w(5, 69), _extends({}, defaultPerson, props));
            $_$w(5, 70), (0, _chai.expect)(actual).to.eql(expected);
        }));
        $_$w(5, 71), it('errors on non-existent ID', function () {
            $_$wf(5);
            return $_$w(5, 72), (0, _chai.expect)((0, _use_persons.editPerson)(_extends({
                id: 9999,
                props: {}
            }, gateway))).to.be.rejectedWith(_errors.NotFoundError);
        });
        $_$w(5, 73), it('errors on edited events', _asyncToGenerator(function* () {
            $_$wf(5);
            const $_$wvd75 = $_$w(5, 74), editPersonsEvents = function () {
                    $_$wf(5);
                    return $_$w(5, 75), (0, _use_persons.editPerson)(_extends({
                        id: 2,
                        props: { events: [890] }
                    }, gateway));
                };
            return $_$w(5, 76), (0, _chai.expect)(editPersonsEvents()).to.be.rejectedWith(_errors.InvalidEditError);
        }));
    });
    $_$w(5, 77), describe('.removePerson', function () {
        $_$wf(5);
        $_$w(5, 78), it('removes correct Person by ID', _asyncToGenerator(function* () {
            $_$wf(5);
            const {id} = ($_$w(5, 79), defaultPerson);
            const actual = ($_$w(5, 80), yield (0, _use_persons.removePerson)(_extends({ id }, gateway)));
            const expected = ($_$w(5, 81), defaultPerson.id);
            $_$w(5, 82), (0, _chai.expect)(actual).to.eql(expected);
        }));
        $_$w(5, 83), it('errors on non-existent ID', function () {
            $_$wf(5);
            return $_$w(5, 84), (0, _chai.expect)((0, _use_persons.removePerson)(_extends({ id: 9999 }, gateway))).to.be.rejectedWith(_errors.NotFoundError);
        });
        $_$w(5, 85), it('destroys its events', _asyncToGenerator(function* () {
            $_$wf(5);
            const personWithEvents = ($_$w(5, 86), _extends({}, defaultPerson, {
                events: [
                    23,
                    45
                ]
            }));
            const {id} = ($_$w(5, 87), defaultPerson);
            const destroyedEvents = ($_$w(5, 88), []);
            $_$w(5, 89), yield (0, _use_persons.removePerson)({
                id,
                read: function (type, id) {
                    $_$wf(5);
                    if ($_$w(5, 90), type === 'events') {
                        return $_$w(5, 91), ($_$w(5, 92), events[id]) || ($_$w(5, 93), null);
                    }
                    return $_$w(5, 94), personWithEvents;
                },
                destroy: function (type, id) {
                    $_$wf(5);
                    if ($_$w(5, 95), type === 'events') {
                        $_$w(5, 96), destroyedEvents.push(id);
                    }
                    return $_$w(5, 97), id;
                }
            });
            const actual = ($_$w(5, 98), destroyedEvents);
            const expected = ($_$w(5, 99), [
                23,
                45
            ]);
            $_$w(5, 100), (0, _chai.expect)(actual).to.eql(expected);
        }));
    });
    $_$w(5, 101), describe('.fetchIdealNextDate', function () {
        $_$wf(5);
        $_$w(5, 102), it('is date that person is ripe on', _asyncToGenerator(function* () {
            $_$wf(5);
            const personWithEvents = ($_$w(5, 103), _extends({}, defaultPerson, {
                events: [
                    23,
                    45
                ]
            }));
            const {id} = ($_$w(5, 104), defaultPerson);
            const actual = ($_$w(5, 105), yield (0, _use_persons.fetchIdealNextDate)({
                id,
                read: function (type, id) {
                    $_$wf(5);
                    if ($_$w(5, 106), type === 'events') {
                        return $_$w(5, 107), ($_$w(5, 108), events[id]) || ($_$w(5, 109), null);
                    }
                    return $_$w(5, 110), personWithEvents;
                }
            }));
            const expected = ($_$w(5, 111), '2016.07.03');
            $_$w(5, 112), (0, _chai.expect)(actual).to.eql(expected);
        }));
    });
    $_$w(5, 113), describe('.fetchLastEvent', function () {
        $_$wf(5);
        $_$w(5, 114), it('is date that person is ripe on', _asyncToGenerator(function* () {
            $_$wf(5);
            const personWithEvents = ($_$w(5, 115), _extends({}, defaultPerson, {
                events: [
                    23,
                    45
                ]
            }));
            const {id} = ($_$w(5, 116), defaultPerson);
            const actual = ($_$w(5, 117), yield (0, _use_persons.fetchLastEvent)({
                id,
                read: function (type, id) {
                    $_$wf(5);
                    if ($_$w(5, 118), type === 'events') {
                        return $_$w(5, 119), ($_$w(5, 120), events[id]) || ($_$w(5, 121), null);
                    }
                    return $_$w(5, 122), personWithEvents;
                }
            }));
            const expected = ($_$w(5, 123), {
                id: 45,
                startAt: '2016.05.14',
                action: 'Phone call',
                status: 'DONE',
                person: 3
            });
            $_$w(5, 124), (0, _chai.expect)(actual).to.eql(expected);
        }));
    });
    $_$w(5, 125), describe('.fetchIsRipe', function () {
        $_$wf(5);
        $_$w(5, 126), it('is true if person is ripe', _asyncToGenerator(function* () {
            $_$wf(5);
            const today = ($_$w(5, 127), '2017.05.15');
            const personWithEvents = ($_$w(5, 128), _extends({}, defaultPerson, {
                events: [
                    23,
                    45
                ]
            }));
            const {id} = ($_$w(5, 129), defaultPerson);
            const actual = ($_$w(5, 130), yield (0, _use_persons.fetchIsRipe)({
                id,
                read: function (type, id) {
                    $_$wf(5);
                    if ($_$w(5, 131), type === 'events') {
                        return $_$w(5, 132), ($_$w(5, 133), events[id]) || ($_$w(5, 134), null);
                    }
                    return $_$w(5, 135), personWithEvents;
                },
                today
            }));
            const expected = ($_$w(5, 136), true);
            $_$w(5, 137), (0, _chai.expect)(actual).to.eql(expected);
        }));
        $_$w(5, 138), it('is false if person is not ripe', _asyncToGenerator(function* () {
            $_$wf(5);
            const today = ($_$w(5, 139), '2016.05.15');
            const personWithEvents = ($_$w(5, 140), _extends({}, defaultPerson, {
                events: [
                    23,
                    45
                ]
            }));
            const {id} = ($_$w(5, 141), defaultPerson);
            const actual = ($_$w(5, 142), yield (0, _use_persons.fetchIsRipe)({
                id,
                read: function (type, id) {
                    $_$wf(5);
                    if ($_$w(5, 143), type === 'events') {
                        return $_$w(5, 144), ($_$w(5, 145), events[id]) || ($_$w(5, 146), null);
                    }
                    return $_$w(5, 147), personWithEvents;
                },
                today
            }));
            const expected = ($_$w(5, 148), false);
            $_$w(5, 149), (0, _chai.expect)(actual).to.eql(expected);
        }));
    });
});
$_$wpe(5);