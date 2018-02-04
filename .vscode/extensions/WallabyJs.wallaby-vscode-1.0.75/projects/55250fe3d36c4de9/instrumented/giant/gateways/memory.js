'use strict';
$_$wp(18);
$_$w(18, 0), Object.defineProperty(exports, '__esModule', { value: true });
var _gateway = ($_$w(18, 1), require('./gateway.js'));
var _gateway2 = ($_$w(18, 2), _interopRequireDefault(_gateway));
function _interopRequireDefault(obj) {
    $_$wf(18);
    return $_$w(18, 3), ($_$w(18, 6), obj) && ($_$w(18, 7), obj.__esModule) ? ($_$w(18, 4), obj) : ($_$w(18, 5), { default: obj });
}
let storage = ($_$w(18, 8), null);
let types = ($_$w(18, 9), []);
const $_$wvd11 = $_$w(18, 10), create = (type, item) => {
        $_$wf(18);
        if ($_$w(18, 11), 'id' in item) {
            {
                $_$w(18, 12);
                throw new Error('New Items cannot have id.');
            }
        }
        const id = ($_$w(18, 13), Math.floor(Math.random() * 10000).toString());
        const createdItem = ($_$w(18, 14), Object.assign({}, item, { id }));
        $_$w(18, 15), storage[type][id] = createdItem;
        return $_$w(18, 16), Promise.resolve(storage[type][id]);
    };
const $_$wvd18 = $_$w(18, 17), read = (type, id) => {
        $_$wf(18);
        return $_$w(18, 18), Promise.resolve(($_$w(18, 19), storage[type][id]) || ($_$w(18, 20), null));
    };
const $_$wvd22 = $_$w(18, 21), readMany = type => {
        $_$wf(18);
        const itemsByID = ($_$w(18, 22), storage[type]);
        return $_$w(18, 23), Promise.resolve(Object.keys(itemsByID).map(id => {
            $_$wf(18);
            return $_$w(18, 24), itemsByID[id];
        }));
    };
const $_$wvd26 = $_$w(18, 25), save = (type, item) => {
        $_$wf(18);
        const id = ($_$w(18, 26), item.id);
        $_$w(18, 27), storage[type][id] = item;
        return $_$w(18, 28), Promise.resolve(storage[type][id]);
    };
const $_$wvd30 = $_$w(18, 29), destroy = (type, id) => {
        $_$wf(18);
        if ($_$w(18, 30), storage[type][id] === undefined) {
            {
                $_$w(18, 31);
                throw new Error('ID must exist.');
            }
        }
        $_$w(18, 32), delete storage[type][id];
        return $_$w(18, 33), Promise.resolve(id);
    };
function MemoryGateway(typesParam) {
    $_$wf(18);
    $_$w(18, 34), types = typesParam;
    $_$w(18, 35), storage = {};
    $_$w(18, 36), types.filter(type => {
        $_$wf(18);
        return $_$w(18, 37), !(type in storage);
    }).map(t => {
        $_$wf(18);
        return $_$w(18, 38), storage[t] = {};
    });
    return $_$w(18, 39), {
        create,
        read,
        readMany,
        save,
        destroy
    };
}
$_$w(18, 40), exports.default = (0, _gateway2.default)(MemoryGateway);
$_$wpe(18);