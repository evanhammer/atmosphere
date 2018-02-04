import admin from 'firebase-admin';

let app;

function getStorage () {
  return app.database().ref('giant');
}

function close () {
  app.delete();
}

function FirebaseDB ({ serviceAccount, dbName }) {
  app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${dbName}.firebaseio.com`,
  });

  return { getStorage, close };
}

export default FirebaseDB;
