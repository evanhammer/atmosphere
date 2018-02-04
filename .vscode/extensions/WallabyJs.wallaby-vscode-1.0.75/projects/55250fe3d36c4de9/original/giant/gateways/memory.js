import Gateway from './gateway.js';

let storage = null;
let types = [];

const create = (type, item) => {
  if ('id' in item) {
    throw new Error('New Items cannot have id.');
  }

  const id = Math.floor((Math.random() * 10000)).toString();
  const createdItem = Object.assign({}, item, { id });
  storage[type][id] = createdItem;
  return Promise.resolve(storage[type][id]);
};

const read = (type, id) => {
  return Promise.resolve(storage[type][id] || null);
};

const readMany = (type) => {
  const itemsByID = storage[type];
  return Promise.resolve(Object.keys(itemsByID).map((id) => itemsByID[id]));
};

const save = (type, item) => {
  const id = item.id;
  storage[type][id] = item;
  return Promise.resolve(storage[type][id]);
};

const destroy = (type, id) => {
  if (storage[type][id] === undefined) {
    throw new Error('ID must exist.');
  }
  delete storage[type][id];
  return Promise.resolve(id);
};

function MemoryGateway (typesParam) {
  types = typesParam;
  storage = {};

  types
    .filter(type => !(type in storage))
    .map(t => storage[t] = {});

  return { create, read, readMany, save, destroy };
}

export default Gateway(MemoryGateway);
