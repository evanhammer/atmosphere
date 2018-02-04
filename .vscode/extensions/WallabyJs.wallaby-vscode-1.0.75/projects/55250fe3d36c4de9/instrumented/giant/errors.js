'use strict';
$_$wp(1);
$_$w(1, 0), Object.defineProperty(exports, '__esModule', { value: true });
$_$w(1, 1), exports.NotFoundError = NotFoundError;
$_$w(1, 2), exports.InvalidRelationError = InvalidRelationError;
$_$w(1, 3), exports.InvalidEditError = InvalidEditError;
function NotFoundError(name, id) {
    $_$wf(1);
    const defaultMsg = ($_$w(1, 4), `Did not find ${ name } with ID ${ id }.`);
    const msgText = ($_$w(1, 5), defaultMsg);
    $_$w(1, 6), this.name = 'NotFoundError';
    $_$w(1, 7), this.message = `${ this.name }: ${ msgText }`;
}
$_$w(1, 8), NotFoundError.prototype = new Error();
function InvalidRelationError(relationName, relationId) {
    $_$wf(1);
    const defaultMsg = ($_$w(1, 9), `Did not find ${ relationName } with ID ${ relationId }.`);
    const msgText = ($_$w(1, 10), defaultMsg);
    $_$w(1, 11), this.name = 'InvalidRelationError';
    $_$w(1, 12), this.message = `${ this.name }: ${ msgText }`;
}
$_$w(1, 13), InvalidRelationError.prototype = new Error();
function InvalidEditError(name, id) {
    $_$wf(1);
    const defaultMsg = ($_$w(1, 14), `Cannot edit ${ name } of id ${ id }.`);
    const msgText = ($_$w(1, 15), defaultMsg);
    $_$w(1, 16), this.name = 'InvalidEditError';
    $_$w(1, 17), this.message = `${ this.name }: ${ msgText }`;
}
$_$w(1, 18), InvalidEditError.prototype = new Error();
$_$wpe(1);