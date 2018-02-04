'use strict';
$_$wp(3);
var _extends = ($_$w(3, 0), ($_$w(3, 1), Object.assign) || ($_$w(3, 2), function (target) {
    $_$wf(3);
    for (var i = 1; $_$w(3, 3), i < arguments.length; i++) {
        var source = ($_$w(3, 4), arguments[i]);
        for (var key in $_$w(3, 5), source) {
            if ($_$w(3, 6), Object.prototype.hasOwnProperty.call(source, key)) {
                $_$w(3, 7), target[key] = source[key];
            }
        }
    }
    return $_$w(3, 8), target;
}));
var _chai = ($_$w(3, 9), require('chai'));
var _event = ($_$w(3, 10), require('./entities/event.js'));
var _person = ($_$w(3, 11), require('./entities/person.js'));
var _use_events = ($_$w(3, 12), require('./use_events.js'));
var _errors = ($_$w(3, 13), require('./errors.js'));
function _asyncToGenerator(fn) {
    $_$wf(3);
    return $_$w(3, 14), function () {
        $_$wf(3);
        var gen = ($_$w(3, 15), fn.apply(this, arguments));
        return $_$w(3, 16), new Promise(function (resolve, reject) {
            $_$wf(3);
            function step(key, arg) {
                $_$wf(3);
                try {
                    var info = ($_$w(3, 17), gen[key](arg));
                    var value = ($_$w(3, 18), info.value);
                } catch (error) {
                    $_$w(3, 19), reject(error);
                    return $_$w(3, 20);
                }
                if ($_$w(3, 21), info.done) {
                    $_$w(3, 22), resolve(value);
                } else {
                    return $_$w(3, 23), Promise.resolve(value).then(function (value) {
                        $_$wf(3);
                        $_$w(3, 24), step('next', value);
                    }, function (err) {
                        $_$wf(3);
                        $_$w(3, 25), step('throw', err);
                    });
                }
            }
            return $_$w(3, 26), step('next');
        });
    };
}
$_$w(3, 27), describe('use_events', function () {
    $_$wf(3);
    const defaultProps = ($_$w(3, 28), {
        startAt: '2015.03.04',
        action: 'Dinner',
        status: 'SCHEDULED',
        person: '3'
    });
    const defaultEvent = ($_$w(3, 29), _extends({}, (0, _event.makeNewEvent)(defaultProps), { id: '4' }));
    const personProps = ($_$w(3, 30), {
        firstName: 'Max',
        action: 'some action',
        frequencyInDays: 50
    });
    const defaultPerson = ($_$w(3, 31), _extends({}, (0, _person.makeNewPerson)(personProps), { id: '3' }));
    $_$w(3, 32), describe('.addEvent', function () {
        $_$wf(3);
        $_$w(3, 33), it('returns added Event', _asyncToGenerator(function* () {
            $_$wf(3);
            const actual = ($_$w(3, 34), yield (0, _use_events.addEvent)({
                props: defaultProps,
                create: function () {
                    $_$wf(3);
                    return $_$w(3, 35), defaultEvent;
                },
                read: function () {
                    $_$wf(3);
                    return $_$w(3, 36), defaultPerson;
                },
                save: function (type, entity) {
                    $_$wf(3);
                    return $_$w(3, 37), entity;
                }
            }));
            const expected = ($_$w(3, 38), _extends({}, defaultEvent, { id: '4' }));
            $_$w(3, 39), (0, _chai.expect)(actual).to.eql(expected);
        }));
        $_$w(3, 40), it('saves person with event', _asyncToGenerator(function* () {
            $_$wf(3);
            let events = $_$w(3, 41);
            $_$w(3, 42), yield (0, _use_events.addEvent)({
                props: defaultProps,
                create: function () {
                    $_$wf(3);
                    return $_$w(3, 43), defaultEvent;
                },
                read: function () {
                    $_$wf(3);
                    return $_$w(3, 44), defaultPerson;
                },
                save: function (type, entity) {
                    $_$wf(3);
                    $_$w(3, 45), events = entity.events;
                    return $_$w(3, 46), entity;
                }
            });
            const actual = ($_$w(3, 47), events);
            const expected = ($_$w(3, 48), ['4']);
            $_$w(3, 49), (0, _chai.expect)(actual).to.eql(expected);
        }));
        $_$w(3, 50), it('errors on non-existent Person id', function () {
            $_$wf(3);
            const $_$wvd52 = $_$w(3, 51), addBadEvent = () => {
                    $_$wf(3);
                    return $_$w(3, 52), (0, _use_events.addEvent)({
                        props: defaultProps,
                        create: () => {
                            $_$wf(3);
                            return $_$w(3, 53), defaultEvent;
                        },
                        read: () => {
                            $_$wf(3);
                            {
                                $_$w(3, 54);
                                throw new _errors.NotFoundError('Person', 4);
                            }
                        }
                    });
                };
            return $_$w(3, 55), (0, _chai.expect)(addBadEvent()).to.be.rejectedWith(_errors.InvalidRelationError);
        });
    });
    $_$w(3, 56), describe('.findEvent', function () {
        $_$wf(3);
        $_$w(3, 57), it('returns correct Event by ID', _asyncToGenerator(function* () {
            $_$wf(3);
            const {id} = ($_$w(3, 58), defaultEvent);
            const actual = ($_$w(3, 59), yield (0, _use_events.findEvent)({
                id,
                read: function () {
                    $_$wf(3);
                    return $_$w(3, 60), defaultEvent;
                }
            }));
            const expected = ($_$w(3, 61), defaultEvent);
            $_$w(3, 62), (0, _chai.expect)(actual).to.eql(expected);
        }));
        $_$w(3, 63), it('errors on non-existent ID', function () {
            $_$wf(3);
            const $_$wvd65 = $_$w(3, 64), findBadEvent = () => {
                    $_$wf(3);
                    return $_$w(3, 65), (0, _use_events.findEvent)({
                        id: '9999',
                        read: () => {
                            $_$wf(3);
                            return $_$w(3, 66), null;
                        }
                    });
                };
            return $_$w(3, 67), (0, _chai.expect)(findBadEvent()).to.be.rejectedWith(_errors.NotFoundError);
        });
    });
    $_$w(3, 68), describe('.findEvents', function () {
        $_$wf(3);
        $_$w(3, 69), it('returns list of Events', _asyncToGenerator(function* () {
            $_$wf(3);
            const actual = ($_$w(3, 70), yield (0, _use_events.findEvents)({
                readMany: function () {
                    $_$wf(3);
                    return $_$w(3, 71), [defaultEvent];
                }
            }));
            const expected = ($_$w(3, 72), [defaultEvent]);
            $_$w(3, 73), (0, _chai.expect)(actual).to.eql(expected);
        }));
    });
    $_$w(3, 74), describe('.editEvent', function () {
        $_$wf(3);
        $_$w(3, 75), it('edits correct Event', _asyncToGenerator(function* () {
            $_$wf(3);
            const {id} = ($_$w(3, 76), defaultEvent);
            const props = ($_$w(3, 77), { action: 'Updated action' });
            const actual = ($_$w(3, 78), yield (0, _use_events.editEvent)({
                id,
                props,
                read: function () {
                    $_$wf(3);
                    return $_$w(3, 79), defaultEvent;
                },
                save: function (type, entity) {
                    $_$wf(3);
                    return $_$w(3, 80), entity;
                }
            }));
            const expected = ($_$w(3, 81), _extends({}, defaultEvent, props));
            $_$w(3, 82), (0, _chai.expect)(actual).to.eql(expected);
        }));
        $_$w(3, 83), it('errors on non-existent ID', function () {
            $_$wf(3);
            const $_$wvd85 = $_$w(3, 84), editBadEvent = () => {
                    $_$wf(3);
                    return $_$w(3, 85), (0, _use_events.editEvent)({
                        id: '9999',
                        props: {},
                        read: () => {
                            $_$wf(3);
                            return $_$w(3, 86), null;
                        }
                    });
                };
            return $_$w(3, 87), (0, _chai.expect)(editBadEvent()).to.be.rejectedWith(_errors.NotFoundError);
        });
        $_$w(3, 88), it('saves new person with event', _asyncToGenerator(function* () {
            $_$wf(3);
            const {id} = ($_$w(3, 89), defaultEvent);
            const props = ($_$w(3, 90), { person: '44' });
            const events = ($_$w(3, 91), []);
            $_$w(3, 92), yield (0, _use_events.editEvent)({
                id,
                props,
                read: function (type) {
                    $_$wf(3);
                    if ($_$w(3, 93), type === 'persons') {
                        return $_$w(3, 94), defaultPerson;
                    }
                    return $_$w(3, 95), defaultEvent;
                },
                save: function (type, entity) {
                    $_$wf(3);
                    if ($_$w(3, 96), type === 'persons') {
                        $_$w(3, 97), events.push(entity.events);
                        return $_$w(3, 98), entity;
                    }
                    return $_$w(3, 99), _extends({}, defaultEvent, props);
                }
            });
            const actual = ($_$w(3, 100), events[0]);
            const expected = ($_$w(3, 101), ['4']);
            $_$w(3, 102), (0, _chai.expect)(actual).to.eql(expected);
        }));
        $_$w(3, 103), it('saves old person without event', _asyncToGenerator(function* () {
            $_$wf(3);
            const {id} = ($_$w(3, 104), defaultEvent);
            const props = ($_$w(3, 105), { person: '44' });
            const persons = ($_$w(3, 106), {
                44: defaultPerson,
                3: _extends({}, defaultPerson, {
                    events: [
                        '4',
                        '7'
                    ]
                })
            });
            const events = ($_$w(3, 107), []);
            $_$w(3, 108), yield (0, _use_events.editEvent)({
                id,
                props,
                read: function (type, id) {
                    $_$wf(3);
                    if ($_$w(3, 109), type === 'persons') {
                        return $_$w(3, 110), persons[id];
                    }
                    return $_$w(3, 111), defaultEvent;
                },
                save: function (type, entity) {
                    $_$wf(3);
                    if ($_$w(3, 112), type === 'persons') {
                        $_$w(3, 113), events.push(entity.events);
                        return $_$w(3, 114), entity;
                    }
                    return $_$w(3, 115), entity;
                }
            });
            const actual = ($_$w(3, 116), events[1]);
            const expected = ($_$w(3, 117), ['7']);
            $_$w(3, 118), (0, _chai.expect)(actual).to.eql(expected);
        }));
        $_$w(3, 119), it('errors on non-existent Person id', function () {
            $_$wf(3);
            const badProps = ($_$w(3, 120), _extends({}, defaultProps, { person: '99' }));
            const $_$wvd122 = $_$w(3, 121), editBadEvent = () => {
                    $_$wf(3);
                    return $_$w(3, 122), (0, _use_events.editEvent)({
                        props: badProps,
                        read: type => {
                            $_$wf(3);
                            if ($_$w(3, 123), type === 'persons') {
                                {
                                    $_$w(3, 124);
                                    throw new _errors.NotFoundError('Person', 4);
                                }
                            }
                            return $_$w(3, 125), defaultEvent;
                        }
                    });
                };
            return $_$w(3, 126), (0, _chai.expect)(editBadEvent()).to.be.rejectedWith(_errors.InvalidRelationError);
        });
    });
    $_$w(3, 127), describe('.removeEvent', function () {
        $_$wf(3);
        $_$w(3, 128), it('removes correct Event by ID', _asyncToGenerator(function* () {
            $_$wf(3);
            const {id} = ($_$w(3, 129), defaultEvent);
            const actual = ($_$w(3, 130), yield (0, _use_events.removeEvent)({
                id,
                read: function (type) {
                    $_$wf(3);
                    if ($_$w(3, 131), type === 'persons') {
                        return $_$w(3, 132), defaultPerson;
                    }
                    return $_$w(3, 133), defaultEvent;
                },
                save: function (type, entity) {
                    $_$wf(3);
                    return $_$w(3, 134), entity;
                },
                destroy: function () {
                    $_$wf(3);
                    return $_$w(3, 135), id;
                }
            }));
            const expected = ($_$w(3, 136), id);
            $_$w(3, 137), (0, _chai.expect)(actual).to.eql(expected);
        }));
        $_$w(3, 138), it('errors on non-existent ID', function () {
            $_$wf(3);
            const $_$wvd140 = $_$w(3, 139), removeBadEvent = () => {
                    $_$wf(3);
                    return $_$w(3, 140), (0, _use_events.removeEvent)({
                        id: '9999',
                        read: () => {
                            $_$wf(3);
                            return $_$w(3, 141), null;
                        }
                    });
                };
            return $_$w(3, 142), (0, _chai.expect)(removeBadEvent()).to.be.rejectedWith(_errors.NotFoundError);
        });
        $_$w(3, 143), it('saves person without event', _asyncToGenerator(function* () {
            $_$wf(3);
            const {id} = ($_$w(3, 144), defaultEvent);
            const person = ($_$w(3, 145), _extends({}, defaultPerson, {
                events: [
                    '4',
                    '9'
                ]
            }));
            let events = $_$w(3, 146);
            $_$w(3, 147), yield (0, _use_events.removeEvent)({
                id,
                read: function (type) {
                    $_$wf(3);
                    if ($_$w(3, 148), type === 'persons') {
                        return $_$w(3, 149), person;
                    }
                    return $_$w(3, 150), defaultEvent;
                },
                save: function (type, entity) {
                    $_$wf(3);
                    if ($_$w(3, 151), type === 'persons') {
                        $_$w(3, 152), events = entity.events;
                        return $_$w(3, 153), entity;
                    }
                    return $_$w(3, 154), entity;
                },
                destroy: function (type, id) {
                    $_$wf(3);
                    return $_$w(3, 155), id;
                }
            });
            const actual = ($_$w(3, 156), events);
            const expected = ($_$w(3, 157), ['9']);
            $_$w(3, 158), (0, _chai.expect)(actual).to.eql(expected);
        }));
    });
});
$_$wpe(3);