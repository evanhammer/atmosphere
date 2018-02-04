'use strict';
$_$wp(26);
var _chai = ($_$w(26, 0), require('chai'));
var _moment = ($_$w(26, 1), require('moment'));
var _moment2 = ($_$w(26, 2), _interopRequireDefault(_moment));
var _util = ($_$w(26, 3), require('./util'));
function _interopRequireDefault(obj) {
    $_$wf(26);
    return $_$w(26, 4), ($_$w(26, 7), obj) && ($_$w(26, 8), obj.__esModule) ? ($_$w(26, 5), obj) : ($_$w(26, 6), { default: obj });
}
$_$w(26, 9), describe('delivery/client/util', () => {
    $_$wf(26);
    const testMoment = ($_$w(26, 10), (0, _moment2.default)('2017.12.22', 'YYYY.MM.DD'));
    $_$w(26, 11), describe('.getMoment', () => {
        $_$wf(26);
        $_$w(26, 12), it('is the moment of the date string', () => {
            $_$wf(26);
            const actual = ($_$w(26, 13), (0, _util.getMoment)('2017.12.22'));
            const expected = ($_$w(26, 14), testMoment);
            $_$w(26, 15), (0, _chai.expect)(actual).to.eql(expected);
        });
    });
    $_$w(26, 16), describe('.getDateStr', () => {
        $_$wf(26);
        $_$w(26, 17), it('is the date string of the moment', () => {
            $_$wf(26);
            const actual = ($_$w(26, 18), (0, _util.getDateStr)(testMoment));
            const expected = ($_$w(26, 19), '2017.12.22');
            $_$w(26, 20), (0, _chai.expect)(actual).to.eql(expected);
        });
    });
    $_$w(26, 21), describe('.humanizeDate', () => {
        $_$wf(26);
        const today = ($_$w(26, 22), '2016.11.22');
        $_$w(26, 23), it('is Today when its today', () => {
            $_$wf(26);
            const actual = ($_$w(26, 24), (0, _util.humanizeDate)('2016.11.22', today));
            const expected = ($_$w(26, 25), 'Today');
            $_$w(26, 26), (0, _chai.expect)(actual).to.eql(expected);
        });
        $_$w(26, 27), it('is Tomorrow when its tomorrow', () => {
            $_$wf(26);
            const actual = ($_$w(26, 28), (0, _util.humanizeDate)('2016.11.23', today));
            const expected = ($_$w(26, 29), 'Tomorrow');
            $_$w(26, 30), (0, _chai.expect)(actual).to.eql(expected);
        });
        $_$w(26, 31), it('is the day of the week when its next week', () => {
            $_$wf(26);
            const actual = ($_$w(26, 32), (0, _util.humanizeDate)('2016.11.28', today));
            const expected = ($_$w(26, 33), 'Monday');
            $_$w(26, 34), (0, _chai.expect)(actual).to.eql(expected);
        });
        $_$w(26, 35), it('is Yesterday when its yesterday', () => {
            $_$wf(26);
            const actual = ($_$w(26, 36), (0, _util.humanizeDate)('2016.11.21', today));
            const expected = ($_$w(26, 37), 'Yesterday');
            $_$w(26, 38), (0, _chai.expect)(actual).to.eql(expected);
        });
        $_$w(26, 39), it('is Last day of the week when its last week', () => {
            $_$wf(26);
            const actual = ($_$w(26, 40), (0, _util.humanizeDate)('2016.11.16', today));
            const expected = ($_$w(26, 41), 'Last Wednesday');
            $_$w(26, 42), (0, _chai.expect)(actual).to.eql(expected);
        });
        $_$w(26, 43), it('is month and day when its this year', () => {
            $_$wf(26);
            const actual = ($_$w(26, 44), (0, _util.humanizeDate)('2016.01.01', today));
            const expected = ($_$w(26, 45), 'Jan 1st');
            $_$w(26, 46), (0, _chai.expect)(actual).to.eql(expected);
        });
        $_$w(26, 47), it('is Last day of the week when its last week', () => {
            $_$wf(26);
            const actual = ($_$w(26, 48), (0, _util.humanizeDate)('2018.01.20', today));
            const expected = ($_$w(26, 49), 'Jan 20th, 2018');
            $_$w(26, 50), (0, _chai.expect)(actual).to.eql(expected);
        });
    });
});
$_$wpe(26);