'use strict';
$_$wp(8);
$_$w(8, 0), Object.defineProperty(exports, '__esModule', { value: true });
$_$w(8, 1), exports.makeUpdatedEvent = exports.makeNewEvent = exports.isValidEvent = exports.STATUS = undefined;
var _extends = ($_$w(8, 2), ($_$w(8, 3), Object.assign) || ($_$w(8, 4), function (target) {
    $_$wf(8);
    for (var i = 1; $_$w(8, 5), i < arguments.length; i++) {
        var source = ($_$w(8, 6), arguments[i]);
        for (var key in $_$w(8, 7), source) {
            if ($_$w(8, 8), Object.prototype.hasOwnProperty.call(source, key)) {
                $_$w(8, 9), target[key] = source[key];
            }
        }
    }
    return $_$w(8, 10), target;
}));
var _types = ($_$w(8, 11), require('./types.js'));
var _base = ($_$w(8, 12), require('./base.js'));
const STATUS = ($_$w(8, 13), exports.STATUS = [
    'SCHEDULED',
    'DONE',
    'CANCELED'
]);
const propTypes = ($_$w(8, 14), {
    all: {
        startAt: [
            _types.is.date(),
            _types.is.notNull()
        ],
        action: [
            _types.is.string(),
            _types.is.notBlank()
        ],
        status: [_types.is.choice(STATUS)],
        person: [
            _types.is.relation(),
            _types.is.notNull()
        ]
    },
    created: { id: _types.is.string() }
});
const defaults = ($_$w(8, 15), {
    action: 'Hang out',
    status: 'SCHEDULED'
});
const isValidEvent = ($_$w(8, 16), exports.isValidEvent = props => {
    $_$wf(8);
    const constraints = ($_$w(8, 17), _extends({}, propTypes.all, propTypes.created));
    return $_$w(8, 18), (0, _base.isValid)(constraints, props);
});
const makeNewEvent = ($_$w(8, 19), exports.makeNewEvent = props => {
    $_$wf(8);
    const entity = ($_$w(8, 20), _extends({}, defaults, props));
    const {all: constraints} = ($_$w(8, 21), propTypes);
    return $_$w(8, 22), (0, _base.isValid)(constraints, entity) ? ($_$w(8, 23), entity) : ($_$w(8, 24), null);
});
const makeUpdatedEvent = ($_$w(8, 25), exports.makeUpdatedEvent = (oldProps, newProps) => {
    $_$wf(8);
    const entity = ($_$w(8, 26), _extends({}, oldProps, newProps));
    return $_$w(8, 27), isValidEvent(entity) ? ($_$w(8, 28), entity) : ($_$w(8, 29), null);
});
$_$wpe(8);