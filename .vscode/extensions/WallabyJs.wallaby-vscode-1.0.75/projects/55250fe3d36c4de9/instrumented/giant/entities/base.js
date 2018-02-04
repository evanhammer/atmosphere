'use strict';
$_$wp(6);
$_$w(6, 0), Object.defineProperty(exports, '__esModule', { value: true });
$_$w(6, 1), exports.isValid = undefined;
var _validator = ($_$w(6, 2), require('validator.js'));
var _validator2 = ($_$w(6, 3), _interopRequireDefault(_validator));
function _interopRequireDefault(obj) {
    $_$wf(6);
    return $_$w(6, 4), ($_$w(6, 7), obj) && ($_$w(6, 8), obj.__esModule) ? ($_$w(6, 5), obj) : ($_$w(6, 6), { default: obj });
}
const $_$wvd10 = $_$w(6, 9), hasOnlyDeclaredProps = (declaredProps, props) => {
        $_$wf(6);
        const undeclaredProps = ($_$w(6, 10), Object.keys(props).filter(k => {
            $_$wf(6);
            return $_$w(6, 11), !(k in declaredProps);
        }));
        return $_$w(6, 12), undeclaredProps.length === 0;
    };
const $_$wvd14 = $_$w(6, 13), areConstraintsOnProps = (constraints, props) => {
        $_$wf(6);
        const constraint = ($_$w(6, 14), _validator2.default.constraint(constraints));
        const errors = ($_$w(6, 15), constraint.check(props));
        return $_$w(6, 16), typeof errors !== 'object';
    };
const $_$wvd18 = $_$w(6, 17), hasRequiredProps = (required, props) => {
        $_$wf(6);
        const missing = ($_$w(6, 18), Object.keys(required).filter(k => {
            $_$wf(6);
            return $_$w(6, 19), !(k in props);
        }));
        return $_$w(6, 20), missing.length === 0;
    };
const isValid = ($_$w(6, 21), exports.isValid = (constraints, props) => {
    $_$wf(6);
    const checks = ($_$w(6, 22), [
        hasOnlyDeclaredProps,
        areConstraintsOnProps
    ]);
    return $_$w(6, 23), checks.every(check => {
        $_$wf(6);
        return $_$w(6, 24), check(constraints, props);
    });
});
$_$wpe(6);