'use strict';
$_$wp(14);
$_$w(14, 0), Object.defineProperty(exports, '__esModule', { value: true });
var _extends = ($_$w(14, 1), ($_$w(14, 2), Object.assign) || ($_$w(14, 3), function (target) {
    $_$wf(14);
    for (var i = 1; $_$w(14, 4), i < arguments.length; i++) {
        var source = ($_$w(14, 5), arguments[i]);
        for (var key in $_$w(14, 6), source) {
            if ($_$w(14, 7), Object.prototype.hasOwnProperty.call(source, key)) {
                $_$w(14, 8), target[key] = source[key];
            }
        }
    }
    return $_$w(14, 9), target;
}));
let create = ($_$w(14, 10), (() => {
    $_$wf(14);
    var _ref = ($_$w(14, 11), _asyncToGenerator(function* (type, item) {
        $_$wf(14);
        if ($_$w(14, 12), 'id' in item) {
            {
                $_$w(14, 13);
                throw new Error('New Items cannot have id.');
            }
        }
        const ref = ($_$w(14, 14), storage.child(type));
        const id = ($_$w(14, 15), ref.push().key);
        $_$w(14, 16), yield ref.child(id).set(item);
        const result = ($_$w(14, 17), yield ref.child(id).once('value'));
        return $_$w(14, 18), extractItem(result);
    }));
    return $_$w(14, 19), function create(_x, _x2) {
        $_$wf(14);
        return $_$w(14, 20), _ref.apply(this, arguments);
    };
})());
let read = ($_$w(14, 21), (() => {
    $_$wf(14);
    var _ref2 = ($_$w(14, 22), _asyncToGenerator(function* (type, id) {
        $_$wf(14);
        const result = ($_$w(14, 23), yield storage.child(type).child(id).once('value'));
        return $_$w(14, 24), extractItem(result);
    }));
    return $_$w(14, 25), function read(_x3, _x4) {
        $_$wf(14);
        return $_$w(14, 26), _ref2.apply(this, arguments);
    };
})());
let readMany = ($_$w(14, 27), (() => {
    $_$wf(14);
    var _ref3 = ($_$w(14, 28), _asyncToGenerator(function* (type) {
        $_$wf(14);
        const results = ($_$w(14, 29), yield storage.child(type).once('value'));
        return $_$w(14, 30), extractItems(results);
    }));
    return $_$w(14, 31), function readMany(_x5) {
        $_$wf(14);
        return $_$w(14, 32), _ref3.apply(this, arguments);
    };
})());
let save = ($_$w(14, 33), (() => {
    $_$wf(14);
    var _ref4 = ($_$w(14, 34), _asyncToGenerator(function* (type, item) {
        $_$wf(14);
        const {id} = ($_$w(14, 35), item), props = _objectWithoutProperties(item, ['id']);
        const ref = ($_$w(14, 36), storage.child(type).child(id));
        $_$w(14, 37), yield ref.set(props);
        const result = ($_$w(14, 38), yield ref.once('value'));
        return $_$w(14, 39), extractItem(result);
    }));
    return $_$w(14, 40), function save(_x6, _x7) {
        $_$wf(14);
        return $_$w(14, 41), _ref4.apply(this, arguments);
    };
})());
let destroy = ($_$w(14, 42), (() => {
    $_$wf(14);
    var _ref5 = ($_$w(14, 43), _asyncToGenerator(function* (type, id) {
        $_$wf(14);
        const ref = ($_$w(14, 44), storage.child(type).child(id));
        const readResult = ($_$w(14, 45), yield ref.once('value'));
        if ($_$w(14, 46), readResult.val() === null) {
            {
                $_$w(14, 47);
                throw new Error('ID must exist.');
            }
        }
        $_$w(14, 48), yield ref.remove();
        return $_$w(14, 49), id;
    }));
    return $_$w(14, 50), function destroy(_x8, _x9) {
        $_$wf(14);
        return $_$w(14, 51), _ref5.apply(this, arguments);
    };
})());
var _gateway = ($_$w(14, 52), require('./gateway.js'));
var _gateway2 = ($_$w(14, 53), _interopRequireDefault(_gateway));
function _interopRequireDefault(obj) {
    $_$wf(14);
    return $_$w(14, 54), ($_$w(14, 57), obj) && ($_$w(14, 58), obj.__esModule) ? ($_$w(14, 55), obj) : ($_$w(14, 56), { default: obj });
}
function _objectWithoutProperties(obj, keys) {
    $_$wf(14);
    var target = ($_$w(14, 59), {});
    for (var i in $_$w(14, 60), obj) {
        if ($_$w(14, 61), keys.indexOf(i) >= 0) {
            {
                $_$w(14, 62);
                continue;
            }
        }
        if ($_$w(14, 63), !Object.prototype.hasOwnProperty.call(obj, i)) {
            {
                $_$w(14, 64);
                continue;
            }
        }
        $_$w(14, 65), target[i] = obj[i];
    }
    return $_$w(14, 66), target;
}
function _asyncToGenerator(fn) {
    $_$wf(14);
    return $_$w(14, 67), function () {
        $_$wf(14);
        var gen = ($_$w(14, 68), fn.apply(this, arguments));
        return $_$w(14, 69), new Promise(function (resolve, reject) {
            $_$wf(14);
            function step(key, arg) {
                $_$wf(14);
                try {
                    var info = ($_$w(14, 70), gen[key](arg));
                    var value = ($_$w(14, 71), info.value);
                } catch (error) {
                    $_$w(14, 72), reject(error);
                    return $_$w(14, 73);
                }
                if ($_$w(14, 74), info.done) {
                    $_$w(14, 75), resolve(value);
                } else {
                    return $_$w(14, 76), Promise.resolve(value).then(function (value) {
                        $_$wf(14);
                        $_$w(14, 77), step('next', value);
                    }, function (err) {
                        $_$wf(14);
                        $_$w(14, 78), step('throw', err);
                    });
                }
            }
            return $_$w(14, 79), step('next');
        });
    };
}
let storage = $_$w(14, 80);
const $_$wvd82 = $_$w(14, 81), extractItem = firebaseResult => {
        $_$wf(14);
        if ($_$w(14, 82), !firebaseResult.exists()) {
            return $_$w(14, 83), null;
        }
        return $_$w(14, 84), _extends({ id: firebaseResult.key }, firebaseResult.val());
    };
const $_$wvd86 = $_$w(14, 85), extractItems = firebaseResults => {
        $_$wf(14);
        const items = ($_$w(14, 86), []);
        $_$w(14, 87), firebaseResults.forEach(result => {
            $_$wf(14);
            $_$w(14, 88), items.push(extractItem(result));
        });
        return $_$w(14, 89), items;
    };
function FirebaseGateway(types, storageParam) {
    $_$wf(14);
    $_$w(14, 90), storage = storageParam;
    return $_$w(14, 91), {
        create,
        read,
        readMany,
        save,
        destroy
    };
}
$_$w(14, 92), exports.default = (0, _gateway2.default)(FirebaseGateway);
$_$wpe(14);