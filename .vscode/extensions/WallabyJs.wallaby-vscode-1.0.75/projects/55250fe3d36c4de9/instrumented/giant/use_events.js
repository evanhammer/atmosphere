'use strict';
$_$wp(2);
$_$w(2, 0), Object.defineProperty(exports, '__esModule', { value: true });
$_$w(2, 1), exports.removeEvent = exports.editEvent = exports.findEvents = exports.findEvent = exports.addEvent = undefined;
var _event = ($_$w(2, 2), require('./entities/event.js'));
var _person = ($_$w(2, 3), require('./entities/person.js'));
var _use_persons = ($_$w(2, 4), require('./use_persons.js'));
var _errors = ($_$w(2, 5), require('./errors.js'));
function _asyncToGenerator(fn) {
    $_$wf(2);
    return $_$w(2, 6), function () {
        $_$wf(2);
        var gen = ($_$w(2, 7), fn.apply(this, arguments));
        return $_$w(2, 8), new Promise(function (resolve, reject) {
            $_$wf(2);
            function step(key, arg) {
                $_$wf(2);
                try {
                    var info = ($_$w(2, 9), gen[key](arg));
                    var value = ($_$w(2, 10), info.value);
                } catch (error) {
                    $_$w(2, 11), reject(error);
                    return $_$w(2, 12);
                }
                if ($_$w(2, 13), info.done) {
                    $_$w(2, 14), resolve(value);
                } else {
                    return $_$w(2, 15), Promise.resolve(value).then(function (value) {
                        $_$wf(2);
                        $_$w(2, 16), step('next', value);
                    }, function (err) {
                        $_$wf(2);
                        $_$w(2, 17), step('throw', err);
                    });
                }
            }
            return $_$w(2, 18), step('next');
        });
    };
}
const TYPE = ($_$w(2, 19), 'events');
const NAME = ($_$w(2, 20), 'Event');
const TYPE_PERSONS = ($_$w(2, 21), 'persons');
const findPersonRelation = ($_$w(2, 22), (() => {
    $_$wf(2);
    var _ref = ($_$w(2, 23), _asyncToGenerator(function* ({read, id}) {
        $_$wf(2);
        try {
            return $_$w(2, 24), yield (0, _use_persons.findPerson)({
                read,
                id
            });
        } catch (e) {
            if ($_$w(2, 25), e instanceof _errors.NotFoundError) {
                {
                    $_$w(2, 26);
                    throw new _errors.InvalidRelationError(TYPE_PERSONS, id);
                }
            }
            {
                $_$w(2, 27);
                throw e;
            }
        }
    }));
    return $_$w(2, 28), function findPersonRelation(_x) {
        $_$wf(2);
        return $_$w(2, 29), _ref.apply(this, arguments);
    };
})());
const addToPersonRelation = ($_$w(2, 30), (() => {
    $_$wf(2);
    var _ref2 = ($_$w(2, 31), _asyncToGenerator(function* ({read, save, personID, eventID}) {
        $_$wf(2);
        const person = ($_$w(2, 32), yield findPersonRelation({
            read,
            id: personID
        }));
        const events = ($_$w(2, 33), [
            ...person.events,
            eventID
        ]);
        const updatedPerson = ($_$w(2, 34), (0, _person.makeUpdatedPerson)(person, { events }));
        const savedPerson = ($_$w(2, 35), yield save(TYPE_PERSONS, updatedPerson));
        return $_$w(2, 36), (0, _person.isValidPerson)(savedPerson) ? ($_$w(2, 37), savedPerson) : ($_$w(2, 38), null);
    }));
    return $_$w(2, 39), function addToPersonRelation(_x2) {
        $_$wf(2);
        return $_$w(2, 40), _ref2.apply(this, arguments);
    };
})());
const removeFromPersonRelation = ($_$w(2, 41), (() => {
    $_$wf(2);
    var _ref3 = ($_$w(2, 42), _asyncToGenerator(function* ({read, save, personID, eventID}) {
        $_$wf(2);
        const person = ($_$w(2, 43), yield findPersonRelation({
            read,
            id: personID
        }));
        const events = ($_$w(2, 44), person.events.filter(function (e) {
            $_$wf(2);
            return $_$w(2, 45), e !== eventID;
        }));
        const updatedPerson = ($_$w(2, 46), (0, _person.makeUpdatedPerson)(person, { events }));
        const savedPerson = ($_$w(2, 47), yield save(TYPE_PERSONS, updatedPerson));
        return $_$w(2, 48), (0, _person.isValidPerson)(savedPerson) ? ($_$w(2, 49), savedPerson) : ($_$w(2, 50), null);
    }));
    return $_$w(2, 51), function removeFromPersonRelation(_x3) {
        $_$wf(2);
        return $_$w(2, 52), _ref3.apply(this, arguments);
    };
})());
const swapPersonRelations = ($_$w(2, 53), (() => {
    $_$wf(2);
    var _ref4 = ($_$w(2, 54), _asyncToGenerator(function* ({read, save, event, updatedEvent}) {
        $_$wf(2);
        const {id} = ($_$w(2, 55), event);
        $_$w(2, 56), yield addToPersonRelation({
            read,
            save,
            personID: updatedEvent.person,
            eventID: id
        });
        $_$w(2, 57), yield removeFromPersonRelation({
            read,
            save,
            personID: event.person,
            eventID: id
        });
    }));
    return $_$w(2, 58), function swapPersonRelations(_x4) {
        $_$wf(2);
        return $_$w(2, 59), _ref4.apply(this, arguments);
    };
})());
const addEvent = ($_$w(2, 60), exports.addEvent = (() => {
    $_$wf(2);
    var _ref5 = ($_$w(2, 61), _asyncToGenerator(function* ({props, create, read, save}) {
        $_$wf(2);
        $_$w(2, 62), yield findPersonRelation({
            read,
            id: props.person
        });
        const newEvent = ($_$w(2, 63), (0, _event.makeNewEvent)(props));
        const createdEvent = ($_$w(2, 64), yield create(TYPE, newEvent));
        let savedPerson = $_$w(2, 65);
        if ($_$w(2, 66), (0, _event.isValidEvent)(createdEvent)) {
            $_$w(2, 67), savedPerson = yield addToPersonRelation({
                read,
                save,
                personID: props.person,
                eventID: createdEvent.id
            });
        }
        return $_$w(2, 68), ($_$w(2, 71), (0, _event.isValidEvent)(createdEvent)) && ($_$w(2, 72), savedPerson) ? ($_$w(2, 69), createdEvent) : ($_$w(2, 70), null);
    }));
    return $_$w(2, 73), function addEvent(_x5) {
        $_$wf(2);
        return $_$w(2, 74), _ref5.apply(this, arguments);
    };
})());
const findEvent = ($_$w(2, 75), exports.findEvent = (() => {
    $_$wf(2);
    var _ref6 = ($_$w(2, 76), _asyncToGenerator(function* ({id, read}) {
        $_$wf(2);
        const event = ($_$w(2, 77), yield read(TYPE, id));
        if ($_$w(2, 78), event === null) {
            {
                $_$w(2, 79);
                throw new _errors.NotFoundError(NAME, id);
            }
        }
        return $_$w(2, 80), (0, _event.isValidEvent)(event) ? ($_$w(2, 81), event) : ($_$w(2, 82), null);
    }));
    return $_$w(2, 83), function findEvent(_x6) {
        $_$wf(2);
        return $_$w(2, 84), _ref6.apply(this, arguments);
    };
})());
const findEvents = ($_$w(2, 85), exports.findEvents = (() => {
    $_$wf(2);
    var _ref7 = ($_$w(2, 86), _asyncToGenerator(function* ({readMany}) {
        $_$wf(2);
        const events = ($_$w(2, 87), yield readMany(TYPE));
        return $_$w(2, 88), events.every(_event.isValidEvent) ? ($_$w(2, 89), events) : ($_$w(2, 90), null);
    }));
    return $_$w(2, 91), function findEvents(_x7) {
        $_$wf(2);
        return $_$w(2, 92), _ref7.apply(this, arguments);
    };
})());
const editEvent = ($_$w(2, 93), exports.editEvent = (() => {
    $_$wf(2);
    var _ref8 = ($_$w(2, 94), _asyncToGenerator(function* ({id, props, read, save}) {
        $_$wf(2);
        const event = ($_$w(2, 95), yield read(TYPE, id));
        if ($_$w(2, 96), event === null) {
            {
                $_$w(2, 97);
                throw new _errors.NotFoundError(NAME, id);
            }
        }
        const updatedEvent = ($_$w(2, 98), (0, _event.makeUpdatedEvent)(event, props));
        if ($_$w(2, 99), event.person !== updatedEvent.person) {
            $_$w(2, 100), yield swapPersonRelations({
                read,
                save,
                event,
                updatedEvent
            });
        }
        const savedEvent = ($_$w(2, 101), yield save(TYPE, updatedEvent));
        return $_$w(2, 102), (0, _event.isValidEvent)(savedEvent) ? ($_$w(2, 103), savedEvent) : ($_$w(2, 104), null);
    }));
    return $_$w(2, 105), function editEvent(_x8) {
        $_$wf(2);
        return $_$w(2, 106), _ref8.apply(this, arguments);
    };
})());
const removeEvent = ($_$w(2, 107), exports.removeEvent = (() => {
    $_$wf(2);
    var _ref9 = ($_$w(2, 108), _asyncToGenerator(function* ({id, read, save, destroy}) {
        $_$wf(2);
        const event = ($_$w(2, 109), yield read(TYPE, id));
        if ($_$w(2, 110), event === null) {
            {
                $_$w(2, 111);
                throw new _errors.NotFoundError(NAME, id);
            }
        }
        $_$w(2, 112), yield removeFromPersonRelation({
            read,
            save,
            personID: event.person,
            eventID: id
        });
        return $_$w(2, 113), yield destroy(TYPE, id);
    }));
    return $_$w(2, 114), function removeEvent(_x9) {
        $_$wf(2);
        return $_$w(2, 115), _ref9.apply(this, arguments);
    };
})());
$_$wpe(2);