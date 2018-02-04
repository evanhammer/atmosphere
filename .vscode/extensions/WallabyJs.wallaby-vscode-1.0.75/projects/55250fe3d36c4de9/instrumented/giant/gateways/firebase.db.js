'use strict';
$_$wp(15);
$_$w(15, 0), Object.defineProperty(exports, '__esModule', { value: true });
var _firebaseAdmin = ($_$w(15, 1), require('firebase-admin'));
var _firebaseAdmin2 = ($_$w(15, 2), _interopRequireDefault(_firebaseAdmin));
function _interopRequireDefault(obj) {
    $_$wf(15);
    return $_$w(15, 3), ($_$w(15, 6), obj) && ($_$w(15, 7), obj.__esModule) ? ($_$w(15, 4), obj) : ($_$w(15, 5), { default: obj });
}
let app = $_$w(15, 8);
function getStorage() {
    $_$wf(15);
    return $_$w(15, 9), app.database().ref('giant');
}
function close() {
    $_$wf(15);
    $_$w(15, 10), app.delete();
}
function FirebaseDB({serviceAccount, dbName}) {
    $_$wf(15);
    $_$w(15, 11), app = _firebaseAdmin2.default.initializeApp({
        credential: _firebaseAdmin2.default.credential.cert(serviceAccount),
        databaseURL: `https://${ dbName }.firebaseio.com`
    });
    return $_$w(15, 12), {
        getStorage,
        close
    };
}
$_$w(15, 13), exports.default = FirebaseDB;
$_$wpe(15);