'use strict';
$_$wp(16);
$_$w(16, 0), Object.defineProperty(exports, '__esModule', { value: true });
const methods = ($_$w(16, 1), [
    'create',
    'read',
    'readMany',
    'save',
    'destroy'
]);
function Gateway(Spec) {
    $_$wf(16);
    return $_$w(16, 2), (types, ...args) => {
        $_$wf(16);
        if ($_$w(16, 3), !Array.isArray(types)) {
            {
                $_$w(16, 4);
                throw new Error('Validation');
            }
        }
        const gateway = ($_$w(16, 5), Spec(types, ...args));
        if ($_$w(16, 6), methods.some(method => {
                $_$wf(16);
                return $_$w(16, 7), !gateway.hasOwnProperty(method);
            })) {
            {
                $_$w(16, 8);
                throw new Error(`Gateway Interface requires: ${ methods.join(', ') }.`);
            }
        }
        return $_$w(16, 9), gateway;
    };
}
$_$w(16, 10), exports.default = Gateway;
$_$wpe(16);