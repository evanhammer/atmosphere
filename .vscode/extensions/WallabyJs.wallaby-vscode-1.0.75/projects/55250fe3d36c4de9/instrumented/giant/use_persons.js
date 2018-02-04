'use strict';
$_$wp(4);
$_$w(4, 0), Object.defineProperty(exports, '__esModule', { value: true });
$_$w(4, 1), exports.fetchIsRipe = exports.fetchLastEvent = exports.fetchIdealNextDate = exports.removePerson = exports.editPerson = exports.findPersons = exports.findPerson = exports.addPerson = undefined;
var _person = ($_$w(4, 2), require('./entities/person.js'));
var _errors = ($_$w(4, 3), require('./errors.js'));
function _asyncToGenerator(fn) {
    $_$wf(4);
    return $_$w(4, 4), function () {
        $_$wf(4);
        var gen = ($_$w(4, 5), fn.apply(this, arguments));
        return $_$w(4, 6), new Promise(function (resolve, reject) {
            $_$wf(4);
            function step(key, arg) {
                $_$wf(4);
                try {
                    var info = ($_$w(4, 7), gen[key](arg));
                    var value = ($_$w(4, 8), info.value);
                } catch (error) {
                    $_$w(4, 9), reject(error);
                    return $_$w(4, 10);
                }
                if ($_$w(4, 11), info.done) {
                    $_$w(4, 12), resolve(value);
                } else {
                    return $_$w(4, 13), Promise.resolve(value).then(function (value) {
                        $_$wf(4);
                        $_$w(4, 14), step('next', value);
                    }, function (err) {
                        $_$wf(4);
                        $_$w(4, 15), step('throw', err);
                    });
                }
            }
            return $_$w(4, 16), step('next');
        });
    };
}
const TYPE = ($_$w(4, 17), 'persons');
const NAME = ($_$w(4, 18), 'Person');
const TYPE_EVENTS = ($_$w(4, 19), 'events');
const addPerson = ($_$w(4, 20), exports.addPerson = (() => {
    $_$wf(4);
    var _ref = ($_$w(4, 21), _asyncToGenerator(function* ({props, create}) {
        $_$wf(4);
        const newPerson = ($_$w(4, 22), (0, _person.makeNewPerson)(props));
        const createdPerson = ($_$w(4, 23), yield create(TYPE, newPerson));
        return $_$w(4, 24), (0, _person.makePerson)(createdPerson);
    }));
    return $_$w(4, 25), function addPerson(_x) {
        $_$wf(4);
        return $_$w(4, 26), _ref.apply(this, arguments);
    };
})());
const findPerson = ($_$w(4, 27), exports.findPerson = (() => {
    $_$wf(4);
    var _ref2 = ($_$w(4, 28), _asyncToGenerator(function* ({id, read}) {
        $_$wf(4);
        const person = ($_$w(4, 29), yield read(TYPE, id));
        if ($_$w(4, 30), person === null) {
            {
                $_$w(4, 31);
                throw new _errors.NotFoundError(NAME, id);
            }
        }
        return $_$w(4, 32), (0, _person.makePerson)(person);
    }));
    return $_$w(4, 33), function findPerson(_x2) {
        $_$wf(4);
        return $_$w(4, 34), _ref2.apply(this, arguments);
    };
})());
const findPersons = ($_$w(4, 35), exports.findPersons = (() => {
    $_$wf(4);
    var _ref3 = ($_$w(4, 36), _asyncToGenerator(function* ({readMany}) {
        $_$wf(4);
        const persons = ($_$w(4, 37), yield readMany(TYPE));
        const madePersons = ($_$w(4, 38), persons.map(_person.makePerson));
        return $_$w(4, 39), madePersons.some(function (p) {
            $_$wf(4);
            return $_$w(4, 42), p === null;
        }) ? ($_$w(4, 40), null) : ($_$w(4, 41), madePersons);
    }));
    return $_$w(4, 43), function findPersons(_x3) {
        $_$wf(4);
        return $_$w(4, 44), _ref3.apply(this, arguments);
    };
})());
const editPerson = ($_$w(4, 45), exports.editPerson = (() => {
    $_$wf(4);
    var _ref4 = ($_$w(4, 46), _asyncToGenerator(function* ({id, props, read, save}) {
        $_$wf(4);
        if ($_$w(4, 47), props.hasOwnProperty('events')) {
            {
                $_$w(4, 48);
                throw new _errors.InvalidEditError('events', id);
            }
        }
        const oldPerson = ($_$w(4, 49), yield read(TYPE, id));
        if ($_$w(4, 50), oldPerson === null) {
            {
                $_$w(4, 51);
                throw new _errors.NotFoundError(NAME, id);
            }
        }
        const updatedPerson = ($_$w(4, 52), (0, _person.makeUpdatedPerson)(oldPerson, props));
        const savedPerson = ($_$w(4, 53), yield save(TYPE, updatedPerson));
        return $_$w(4, 54), (0, _person.makePerson)(savedPerson);
    }));
    return $_$w(4, 55), function editPerson(_x4) {
        $_$wf(4);
        return $_$w(4, 56), _ref4.apply(this, arguments);
    };
})());
const removePerson = ($_$w(4, 57), exports.removePerson = (() => {
    $_$wf(4);
    var _ref5 = ($_$w(4, 58), _asyncToGenerator(function* ({id, read, destroy}) {
        $_$wf(4);
        const person = ($_$w(4, 59), yield read(TYPE, id));
        const madePerson = ($_$w(4, 60), (0, _person.makePerson)(person));
        if ($_$w(4, 61), person === null) {
            {
                $_$w(4, 62);
                throw new _errors.NotFoundError(NAME, id);
            }
        }
        $_$w(4, 63), yield madePerson.events.map(function (eventID) {
            $_$wf(4);
            return $_$w(4, 64), destroy(TYPE_EVENTS, eventID);
        });
        return $_$w(4, 65), yield destroy(TYPE, id);
    }));
    return $_$w(4, 66), function removePerson(_x5) {
        $_$wf(4);
        return $_$w(4, 67), _ref5.apply(this, arguments);
    };
})());
const fetchIdealNextDate = ($_$w(4, 68), exports.fetchIdealNextDate = (() => {
    $_$wf(4);
    var _ref6 = ($_$w(4, 69), _asyncToGenerator(function* ({id, read, today}) {
        $_$wf(4);
        const person = ($_$w(4, 70), yield read(TYPE, id));
        const madePerson = ($_$w(4, 71), (0, _person.makePerson)(person));
        const events = ($_$w(4, 72), yield Promise.all(madePerson.events.map(function (eventID) {
            $_$wf(4);
            return $_$w(4, 73), read(TYPE_EVENTS, eventID);
        })));
        return $_$w(4, 74), (0, _person.idealNextDate)(madePerson, events, today);
    }));
    return $_$w(4, 75), function fetchIdealNextDate(_x6) {
        $_$wf(4);
        return $_$w(4, 76), _ref6.apply(this, arguments);
    };
})());
const fetchLastEvent = ($_$w(4, 77), exports.fetchLastEvent = (() => {
    $_$wf(4);
    var _ref7 = ($_$w(4, 78), _asyncToGenerator(function* ({id, read}) {
        $_$wf(4);
        const person = ($_$w(4, 79), yield read(TYPE, id));
        const madePerson = ($_$w(4, 80), (0, _person.makePerson)(person));
        const events = ($_$w(4, 81), yield Promise.all(madePerson.events.map(function (eventID) {
            $_$wf(4);
            return $_$w(4, 82), read(TYPE_EVENTS, eventID);
        })));
        return $_$w(4, 83), (0, _person.lastEvent)(events);
    }));
    return $_$w(4, 84), function fetchLastEvent(_x7) {
        $_$wf(4);
        return $_$w(4, 85), _ref7.apply(this, arguments);
    };
})());
const fetchIsRipe = ($_$w(4, 86), exports.fetchIsRipe = (() => {
    $_$wf(4);
    var _ref8 = ($_$w(4, 87), _asyncToGenerator(function* ({id, read, today}) {
        $_$wf(4);
        const person = ($_$w(4, 88), yield read(TYPE, id));
        const madePerson = ($_$w(4, 89), (0, _person.makePerson)(person));
        const events = ($_$w(4, 90), yield Promise.all(madePerson.events.map(function (eventID) {
            $_$wf(4);
            return $_$w(4, 91), read(TYPE_EVENTS, eventID);
        })));
        return $_$w(4, 92), (0, _person.isRipe)(madePerson, events, today);
    }));
    return $_$w(4, 93), function fetchIsRipe(_x8) {
        $_$wf(4);
        return $_$w(4, 94), _ref8.apply(this, arguments);
    };
})());
$_$wpe(4);