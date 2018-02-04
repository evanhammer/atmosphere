'use strict';
$_$wp(10);
$_$w(10, 0), Object.defineProperty(exports, '__esModule', { value: true });
$_$w(10, 1), exports.isRipe = exports.idealNextDate = exports.scheduledEvents = exports.lastEvent = exports.makePerson = exports.makeUpdatedPerson = exports.makeNewPerson = exports.isValidPerson = undefined;
var _extends = ($_$w(10, 2), ($_$w(10, 3), Object.assign) || ($_$w(10, 4), function (target) {
    $_$wf(10);
    for (var i = 1; $_$w(10, 5), i < arguments.length; i++) {
        var source = ($_$w(10, 6), arguments[i]);
        for (var key in $_$w(10, 7), source) {
            if ($_$w(10, 8), Object.prototype.hasOwnProperty.call(source, key)) {
                $_$w(10, 9), target[key] = source[key];
            }
        }
    }
    return $_$w(10, 10), target;
}));
var _ramda = ($_$w(10, 11), require('ramda'));
var _ramda2 = ($_$w(10, 12), _interopRequireDefault(_ramda));
var _moment = ($_$w(10, 13), require('moment'));
var _moment2 = ($_$w(10, 14), _interopRequireDefault(_moment));
var _types = ($_$w(10, 15), require('./types.js'));
var _base = ($_$w(10, 16), require('./base.js'));
function _interopRequireDefault(obj) {
    $_$wf(10);
    return $_$w(10, 17), ($_$w(10, 20), obj) && ($_$w(10, 21), obj.__esModule) ? ($_$w(10, 18), obj) : ($_$w(10, 19), { default: obj });
}
const propTypes = ($_$w(10, 22), {
    all: {
        firstName: [
            _types.is.string(),
            _types.is.notBlank()
        ],
        lastName: [_types.is.string()],
        action: [
            _types.is.string(),
            _types.is.notBlank()
        ],
        frequencyInDays: [_types.is.counting()],
        lastContactedAt: _types.is.date(),
        events: [
            _types.is.relations(),
            _types.is.emptyArray()
        ]
    },
    created: {
        id: _types.is.string(),
        events: _types.is.relations()
    }
});
const defaults = ($_$w(10, 23), {
    lastName: '',
    action: 'Hang out',
    frequencyInDays: 30,
    events: [],
    lastContactedAt: null
});
const isValidPerson = ($_$w(10, 24), exports.isValidPerson = props => {
    $_$wf(10);
    const constraints = ($_$w(10, 25), _extends({}, propTypes.all, propTypes.created));
    return $_$w(10, 26), (0, _base.isValid)(constraints, props);
});
const makeNewPerson = ($_$w(10, 27), exports.makeNewPerson = props => {
    $_$wf(10);
    const entity = ($_$w(10, 28), _extends({}, defaults, props));
    const {all: constraints} = ($_$w(10, 29), propTypes);
    return $_$w(10, 30), (0, _base.isValid)(constraints, entity) ? ($_$w(10, 31), entity) : ($_$w(10, 32), null);
});
const makeUpdatedPerson = ($_$w(10, 33), exports.makeUpdatedPerson = (oldProps, newProps) => {
    $_$wf(10);
    const entity = ($_$w(10, 34), _extends({}, oldProps, newProps));
    return $_$w(10, 35), isValidPerson(entity) ? ($_$w(10, 36), entity) : ($_$w(10, 37), null);
});
const makePerson = ($_$w(10, 38), exports.makePerson = props => {
    $_$wf(10);
    const entity = ($_$w(10, 39), _extends({ events: [] }, props));
    return $_$w(10, 40), isValidPerson(props) ? ($_$w(10, 41), entity) : ($_$w(10, 42), null);
});
const $_$wvd44 = $_$w(10, 43), filterEventsByStatus = (statuses, events) => {
        $_$wf(10);
        return $_$w(10, 44), events.filter(e => {
            $_$wf(10);
            return $_$w(10, 45), statuses.includes(e.status);
        });
    };
const $_$wvd47 = $_$w(10, 46), sortEvents = events => {
        $_$wf(10);
        return $_$w(10, 47), events.sort((a, b) => {
            $_$wf(10);
            return $_$w(10, 48), a.startAt < b.startAt ? ($_$w(10, 49), 1) : ($_$w(10, 50), -1);
        });
    };
const lastEvent = ($_$w(10, 51), exports.lastEvent = events => {
    $_$wf(10);
    return $_$w(10, 52), _ramda2.default.pipe(items => {
        $_$wf(10);
        return $_$w(10, 53), filterEventsByStatus([
            'DONE',
            'SCHEDULED'
        ], items);
    }, sortEvents, items => {
        $_$wf(10);
        return $_$w(10, 54), items.length > 0 ? ($_$w(10, 55), items[0]) : ($_$w(10, 56), null);
    })(events);
});
const scheduledEvents = ($_$w(10, 57), exports.scheduledEvents = events => {
    $_$wf(10);
    return $_$w(10, 58), _ramda2.default.pipe(items => {
        $_$wf(10);
        return $_$w(10, 59), filterEventsByStatus(['SCHEDULED'], items);
    }, sortEvents)(events);
});
const idealNextDate = ($_$w(10, 60), exports.idealNextDate = (person, events, today) => {
    $_$wf(10);
    const mostRecent = ($_$w(10, 61), lastEvent(events));
    if ($_$w(10, 62), mostRecent === null) {
        return $_$w(10, 63), today;
    }
    return $_$w(10, 64), (0, _moment2.default)(mostRecent.startAt, 'YYYY.MM.DD').add(person.frequencyInDays, 'days').format('YYYY.MM.DD');
});
const $_$wvd66 = $_$w(10, 65), isReadyForEvent = (person, events, today) => {
        $_$wf(10);
        const todayMoment = ($_$w(10, 66), (0, _moment2.default)(today, 'YYYY.MM.DD'));
        const eventDate = ($_$w(10, 67), idealNextDate(person, events, today));
        const nextEventMoment = ($_$w(10, 68), (0, _moment2.default)(eventDate, 'YYYY.MM.DD'));
        return $_$w(10, 69), todayMoment.isSameOrAfter(nextEventMoment);
    };
const $_$wvd71 = $_$w(10, 70), isReadyForContact = (person, today) => {
        $_$wf(10);
        const {lastContactedAt} = ($_$w(10, 71), person);
        if ($_$w(10, 72), lastContactedAt === null) {
            return $_$w(10, 73), true;
        }
        const todayMoment = ($_$w(10, 74), (0, _moment2.default)(today, 'YYYY.MM.DD'));
        const nextContactMoment = ($_$w(10, 75), (0, _moment2.default)(lastContactedAt, 'YYYY.MM.DD').add(7, 'days'));
        return $_$w(10, 76), todayMoment.isSameOrAfter(nextContactMoment);
    };
const isRipe = ($_$w(10, 77), exports.isRipe = (person, events, today) => {
    $_$wf(10);
    if ($_$w(10, 78), !(0, _moment2.default)(today, 'YYYY.MM.DD').isValid()) {
        return $_$w(10, 79), null;
    }
    return $_$w(10, 80), _ramda2.default.and(isReadyForEvent(person, events, today), isReadyForContact(person, today));
});
$_$wpe(10);