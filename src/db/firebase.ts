import * as admin from 'firebase-admin';
const serviceAccount = require('../../strv-addrsbook-classen-thiago.json');

const fireDb = admin
    .initializeApp({
        credential: admin.credential.cert(serviceAccount)
    })
    .firestore();

export { fireDb };
