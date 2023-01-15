const Firestore = require('@google-cloud/firestore');

const db = new Firestore({
  projectId: 'stem-thesis-database',
  keyFilename: 'keys/stem-thesis-database-firebase-adminsdk-aean6-df50d55892.json',
});