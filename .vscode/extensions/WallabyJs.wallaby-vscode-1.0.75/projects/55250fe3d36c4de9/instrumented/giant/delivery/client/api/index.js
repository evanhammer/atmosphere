'use strict';
$_$wp(30);
$_$w(30, 0), Object.defineProperty(exports, '__esModule', { value: true });
$_$w(30, 1), exports.fetchAddEvent = exports.fetchEditPerson = exports.fetchPerson = exports.fetchPersons = exports.fetchAddPerson = undefined;
var _queries = ($_$w(30, 2), require('./queries'));
var _queries2 = ($_$w(30, 3), _interopRequireDefault(_queries));
function _interopRequireDefault(obj) {
    $_$wf(30);
    return $_$w(30, 4), ($_$w(30, 7), obj) && ($_$w(30, 8), obj.__esModule) ? ($_$w(30, 5), obj) : ($_$w(30, 6), { default: obj });
}
const $_$wvd10 = $_$w(30, 9), fetchGraphQL = (querySlug, variables = {}) => {
        $_$wf(30);
        const data = ($_$w(30, 10), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query: _queries2.default[querySlug],
                variables
            })
        });
        return $_$w(30, 11), fetch('/graphql?', data).then(res => {
            $_$wf(30);
            return $_$w(30, 12), res.json();
        }).then(json => {
            $_$wf(30);
            return $_$w(30, 13), json.data[querySlug];
        });
    };
const fetchAddPerson = ($_$w(30, 14), exports.fetchAddPerson = person => {
    $_$wf(30);
    return $_$w(30, 15), fetchGraphQL('addPerson', person);
});
const fetchPersons = ($_$w(30, 16), exports.fetchPersons = () => {
    $_$wf(30);
    return $_$w(30, 17), fetchGraphQL('persons');
});
const fetchPerson = ($_$w(30, 18), exports.fetchPerson = id => {
    $_$wf(30);
    return $_$w(30, 19), fetchGraphQL('person', id);
});
const fetchEditPerson = ($_$w(30, 20), exports.fetchEditPerson = person => {
    $_$wf(30);
    return $_$w(30, 21), fetchGraphQL('editPerson', person);
});
const fetchAddEvent = ($_$w(30, 22), exports.fetchAddEvent = event => {
    $_$wf(30);
    return $_$w(30, 23), fetchGraphQL('addEvent', event);
});
$_$wpe(30);