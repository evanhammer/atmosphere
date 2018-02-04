'use strict';
$_$wp(27);
var _moment = ($_$w(27, 0), require('moment'));
var _moment2 = ($_$w(27, 1), _interopRequireDefault(_moment));
var _express = ($_$w(27, 2), require('express'));
var _express2 = ($_$w(27, 3), _interopRequireDefault(_express));
var _bodyParser = ($_$w(27, 4), require('body-parser'));
var _bodyParser2 = ($_$w(27, 5), _interopRequireDefault(_bodyParser));
var _apolloServerExpress = ($_$w(27, 6), require('apollo-server-express'));
var _memory = ($_$w(27, 7), require('/Users/evanhammer/dev/giant/giant/gateways/memory.js'));
var _memory2 = ($_$w(27, 8), _interopRequireDefault(_memory));
var _firebaseDb = ($_$w(27, 9), require('/Users/evanhammer/dev/giant/giant/gateways/firebase.db.js'));
var _firebaseDb2 = ($_$w(27, 10), _interopRequireDefault(_firebaseDb));
var _firebase = ($_$w(27, 11), require('/Users/evanhammer/dev/giant/giant/gateways/firebase.js'));
var _firebase2 = ($_$w(27, 12), _interopRequireDefault(_firebase));
var _schema = ($_$w(27, 13), require('./schema'));
var _schema2 = ($_$w(27, 14), _interopRequireDefault(_schema));
var _firebaseDevKey = ($_$w(27, 15), require('./../../../firebase-dev-key.json'));
var _firebaseDevKey2 = ($_$w(27, 16), _interopRequireDefault(_firebaseDevKey));
function _interopRequireDefault(obj) {
    $_$wf(27);
    return $_$w(27, 17), ($_$w(27, 20), obj) && ($_$w(27, 21), obj.__esModule) ? ($_$w(27, 18), obj) : ($_$w(27, 19), { default: obj });
}
const app = ($_$w(27, 22), (0, _express2.default)());
const PORT = ($_$w(27, 23), ($_$w(27, 24), process.env.PORT) || ($_$w(27, 25), 8080));
const ENTITIES = ($_$w(27, 26), [
    'persons',
    'events'
]);
const db = ($_$w(27, 27), (0, _firebaseDb2.default)({
    serviceAccount: _firebaseDevKey2.default,
    dbName: 'giant-dev'
}));
const storageGateway = ($_$w(27, 28), (0, _firebase2.default)(ENTITIES, db.getStorage()));
$_$w(27, 29), app.use('/graphql', _bodyParser2.default.json(), (0, _apolloServerExpress.graphqlExpress)(() => {
    $_$wf(27);
    return $_$w(27, 30), {
        schema: _schema2.default,
        context: {
            gateway: storageGateway,
            today: (0, _moment2.default)().format('YYYY.MM.DD')
        },
        formatError: error => {
            $_$wf(27);
            return $_$w(27, 31), {
                message: error.message,
                details: error.stack
            };
        },
        debug: true
    };
}));
$_$w(27, 32), app.use('/graphiql', (0, _apolloServerExpress.graphiqlExpress)({ endpointURL: '/graphql' }));
$_$w(27, 33), app.set('port', PORT);
const server = ($_$w(27, 34), app.listen(app.get('port'), function () {
    $_$wf(27);
}));
$_$w(27, 35), module.exports = {
    server,
    db
};
$_$wpe(27);