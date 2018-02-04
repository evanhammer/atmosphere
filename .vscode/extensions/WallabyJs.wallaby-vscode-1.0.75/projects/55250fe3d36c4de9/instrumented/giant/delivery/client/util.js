'use strict';
$_$wp(25);
$_$w(25, 0), Object.defineProperty(exports, '__esModule', { value: true });
$_$w(25, 1), exports.getDisplayName = exports.humanizeDate = exports.getDateStr = exports.getMoment = undefined;
var _moment = ($_$w(25, 2), require('moment'));
var _moment2 = ($_$w(25, 3), _interopRequireDefault(_moment));
function _interopRequireDefault(obj) {
    $_$wf(25);
    return $_$w(25, 4), ($_$w(25, 7), obj) && ($_$w(25, 8), obj.__esModule) ? ($_$w(25, 5), obj) : ($_$w(25, 6), { default: obj });
}
const getMoment = ($_$w(25, 9), exports.getMoment = dateStr => {
    $_$wf(25);
    return $_$w(25, 10), (0, _moment2.default)(dateStr, 'YYYY.MM.DD');
});
const getDateStr = ($_$w(25, 11), exports.getDateStr = moment => {
    $_$wf(25);
    return $_$w(25, 12), moment.format('YYYY.MM.DD');
});
const humanizeDate = ($_$w(25, 13), exports.humanizeDate = (dateStr, todayStr) => {
    $_$wf(25);
    return $_$w(25, 14), getMoment(dateStr).calendar(getMoment(todayStr), {
        sameDay: '[Today]',
        nextDay: '[Tomorrow]',
        nextWeek: 'dddd',
        lastDay: '[Yesterday]',
        lastWeek: '[Last] dddd',
        sameElse: function (now) {
            $_$wf(25);
            return $_$w(25, 15), this.isSame(now, 'year') ? ($_$w(25, 16), 'MMM Do') : ($_$w(25, 17), 'MMM Do, YYYY');
        }
    });
});
const getDisplayName = ($_$w(25, 18), exports.getDisplayName = ({firstName, lastName}) => {
    $_$wf(25);
    return $_$w(25, 19), [
        firstName,
        lastName
    ].filter(name => {
        $_$wf(25);
        return $_$w(25, 20), !!name;
    }).join(' ');
});
$_$wpe(25);