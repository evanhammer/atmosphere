'use strict';
$_$wp(12);
$_$w(12, 0), Object.defineProperty(exports, '__esModule', { value: true });
$_$w(12, 1), exports.is = undefined;
var _moment = ($_$w(12, 2), require('moment'));
var _moment2 = ($_$w(12, 3), _interopRequireDefault(_moment));
var _validator = ($_$w(12, 4), require('validator.js'));
var _validator2 = ($_$w(12, 5), _interopRequireDefault(_validator));
var _validator3 = ($_$w(12, 6), require('validator.js-asserts'));
var _validator4 = ($_$w(12, 7), _interopRequireDefault(_validator3));
function _interopRequireDefault(obj) {
    $_$wf(12);
    return $_$w(12, 8), ($_$w(12, 11), obj) && ($_$w(12, 12), obj.__esModule) ? ($_$w(12, 9), obj) : ($_$w(12, 10), { default: obj });
}
const validIs = ($_$w(12, 13), _validator2.default.Assert.extend(_validator4.default));
const $_$wvd15 = $_$w(12, 14), isDate = v => {
        $_$wf(12);
        return $_$w(12, 15), (0, _moment2.default)(v, 'YYYY.MM.DD', true).isValid();
    };
const $_$wvd17 = $_$w(12, 16), isCounting = v => {
        $_$wf(12);
        return $_$w(12, 17), ($_$w(12, 18), ($_$w(12, 20), Number.isInteger(v)) && ($_$w(12, 21), v > 0)) || ($_$w(12, 19), v === null);
    };
const $_$wvd23 = $_$w(12, 22), isRelation = v => {
        $_$wf(12);
        return $_$w(12, 23), ($_$w(12, 24), typeof v === 'string') || ($_$w(12, 25), typeof v === 'object');
    };
const choice = ($_$w(12, 26), validIs.choice);
const $_$wvd28 = $_$w(12, 27), counting = () => {
        $_$wf(12);
        return $_$w(12, 28), validIs.callback(isCounting);
    };
const $_$wvd30 = $_$w(12, 29), date = () => {
        $_$wf(12);
        return $_$w(12, 30), validIs.callback(v => {
            $_$wf(12);
            return $_$w(12, 31), ($_$w(12, 32), isDate(v)) || ($_$w(12, 33), v === null);
        });
    };
const $_$wvd35 = $_$w(12, 34), emptyArray = () => {
        $_$wf(12);
        return $_$w(12, 35), validIs.count(0);
    };
const $_$wvd37 = $_$w(12, 36), integer = () => {
        $_$wf(12);
        return $_$w(12, 37), validIs.callback(Number.isInteger);
    };
const notBlank = ($_$w(12, 38), validIs.notBlank);
const notNull = ($_$w(12, 39), validIs.notNull);
const $_$wvd41 = $_$w(12, 40), relation = () => {
        $_$wf(12);
        return $_$w(12, 41), validIs.callback(v => {
            $_$wf(12);
            return $_$w(12, 42), ($_$w(12, 43), isRelation(v)) || ($_$w(12, 44), typeof v === 'undefined');
        });
    };
const $_$wvd46 = $_$w(12, 45), relations = () => {
        $_$wf(12);
        return $_$w(12, 46), validIs.callback(v => {
            $_$wf(12);
            return $_$w(12, 47), v.every(isRelation);
        });
    };
const required = ($_$w(12, 48), validIs.required);
const string = ($_$w(12, 49), validIs.isString);
const is = ($_$w(12, 50), exports.is = {
    choice,
    counting,
    date,
    emptyArray,
    integer,
    notBlank,
    notNull,
    relation,
    relations,
    required,
    string
});
$_$wpe(12);