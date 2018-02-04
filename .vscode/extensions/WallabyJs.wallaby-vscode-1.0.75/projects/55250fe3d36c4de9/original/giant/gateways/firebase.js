import Gateway from './gateway.js';

let storage;

const extractItem = (firebaseResult) => {
  if (!firebaseResult.exists()) return null;
  return { id: firebaseResult.key, ...firebaseResult.val() };
};

const extractItems = (firebaseResults) => {
  const items = [];
  firebaseResults.forEach(result => {
    items.push(extractItem(result));
  });
  return items;
};

async function create (type, item) {
  if ('id' in item) {
    throw new Error('New Items cannot have id.');
  }

  const ref = storage.child(type);
  const id = ref.push().key;
  await ref.child(id).set(item);
  const result = await ref.child(id).once('value');
  return extractItem(result);
}

async function read (type, id) {
  const result = await storage.child(type).child(id).once('value');
  return extractItem(result);
}

async function readMany (type) {
  const results = await storage.child(type).once('value');
  return extractItems(results);
}

async function save (type, item) {
  const { id, ...props } = item;
  const ref = storage.child(type).child(id);
  await ref.set(props);
  const result = await ref.once('value');
  return extractItem(result);
}

async function destroy (type, id) {
  const ref = storage.child(type).child(id);
  const readResult = await ref.once('value');
  if (readResult.val() === null) {
    throw new Error('ID must exist.');
  }

  await ref.remove();
  return id;
}

function FirebaseGateway (types, storageParam) {
  storage = storageParam;
  return { create, read, readMany, save, destroy };
}

export default Gateway(FirebaseGateway);
