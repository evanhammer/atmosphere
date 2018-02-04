'use strict';
$_$wp(28);
$_$w(28, 0), Object.defineProperty(exports, '__esModule', { value: true });
var _extends = ($_$w(28, 1), ($_$w(28, 2), Object.assign) || ($_$w(28, 3), function (target) {
    $_$wf(28);
    for (var i = 1; $_$w(28, 4), i < arguments.length; i++) {
        var source = ($_$w(28, 5), arguments[i]);
        for (var key in $_$w(28, 6), source) {
            if ($_$w(28, 7), Object.prototype.hasOwnProperty.call(source, key)) {
                $_$w(28, 8), target[key] = source[key];
            }
        }
    }
    return $_$w(28, 9), target;
}));
var _use_persons = ($_$w(28, 10), require('/Users/evanhammer/dev/giant/giant/use_persons.js'));
var _use_events = ($_$w(28, 11), require('/Users/evanhammer/dev/giant/giant/use_events.js'));
function _objectWithoutProperties(obj, keys) {
    $_$wf(28);
    var target = ($_$w(28, 12), {});
    for (var i in $_$w(28, 13), obj) {
        if ($_$w(28, 14), keys.indexOf(i) >= 0) {
            {
                $_$w(28, 15);
                continue;
            }
        }
        if ($_$w(28, 16), !Object.prototype.hasOwnProperty.call(obj, i)) {
            {
                $_$w(28, 17);
                continue;
            }
        }
        $_$w(28, 18), target[i] = obj[i];
    }
    return $_$w(28, 19), target;
}
const resolvers = ($_$w(28, 20), {
    Query: {
        person: (_, {id}, {gateway}) => {
            $_$wf(28);
            return $_$w(28, 21), (0, _use_persons.findPerson)(_extends({ id }, gateway));
        },
        persons: (_, args, {gateway}) => {
            $_$wf(28);
            return $_$w(28, 22), (0, _use_persons.findPersons)(_extends({}, gateway));
        },
        event: (_, {id}, {gateway}) => {
            $_$wf(28);
            return $_$w(28, 23), (0, _use_events.findEvent)(_extends({ id }, gateway));
        },
        events: (_, args, {gateway}) => {
            $_$wf(28);
            return $_$w(28, 24), (0, _use_events.findEvents)(_extends({}, gateway));
        }
    },
    Person: {
        events({events}, _, {gateway}) {
            $_$wf(28);
            return $_$w(28, 25), events.map(id => {
                $_$wf(28);
                return $_$w(28, 26), (0, _use_events.findEvent)(_extends({ id }, gateway));
            });
        },
        idealNextDate({id}, _, {today, gateway}) {
            $_$wf(28);
            return $_$w(28, 27), (0, _use_persons.fetchIdealNextDate)(_extends({
                id,
                today
            }, gateway));
        },
        lastEvent({id}, _, {gateway}) {
            $_$wf(28);
            return $_$w(28, 28), (0, _use_persons.fetchLastEvent)(_extends({ id }, gateway));
        },
        isRipe({id}, _, {today, gateway}) {
            $_$wf(28);
            return $_$w(28, 29), (0, _use_persons.fetchIsRipe)(_extends({
                id,
                today
            }, gateway));
        }
    },
    Event: {
        person({person}, _, {gateway}) {
            $_$wf(28);
            return $_$w(28, 30), (0, _use_persons.findPerson)(_extends({ id: person }, gateway));
        }
    },
    Mutation: {
        addPerson(_, {input: props}, {today, gateway}) {
            $_$wf(28);
            return $_$w(28, 31), (0, _use_persons.addPerson)(_extends({
                props,
                today
            }, gateway));
        },
        editPerson(_, _ref, {gateway}) {
            $_$wf(28);
            let {
                    input: {id}
                } = ($_$w(28, 32), _ref), props = _objectWithoutProperties(_ref.input, ['id']);
            return $_$w(28, 33), (0, _use_persons.editPerson)(_extends({
                id,
                props
            }, gateway));
        },
        removePerson(_, {
            input: {id}
        }, {gateway}) {
            $_$wf(28);
            return $_$w(28, 34), (0, _use_persons.removePerson)(_extends({ id }, gateway));
        },
        addEvent(_, {input: props}, {gateway}) {
            $_$wf(28);
            return $_$w(28, 35), (0, _use_events.addEvent)(_extends({ props }, gateway));
        },
        editEvent(_, _ref2, {gateway}) {
            $_$wf(28);
            let {
                    input: {id}
                } = ($_$w(28, 36), _ref2), props = _objectWithoutProperties(_ref2.input, ['id']);
            return $_$w(28, 37), (0, _use_events.editEvent)(_extends({
                id,
                props
            }, gateway));
        },
        removeEvent(_, {
            input: {id}
        }, {gateway}) {
            $_$wf(28);
            return $_$w(28, 38), (0, _use_events.removeEvent)(_extends({ id }, gateway));
        }
    }
});
$_$w(28, 39), exports.default = resolvers;
$_$wpe(28);