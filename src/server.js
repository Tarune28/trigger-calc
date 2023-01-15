const Firestore = require('@google-cloud/firestore');

const db = new Firestore({
  projectId: 'stem-thesis-database',
  keyFilename: 'keys/stem-thesis-database-firebase-adminsdk-aean6-df50d55892.json',
});

async function start() {
    const snapshot = await db.collection('abstracts').get();
    snapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
    });
}

start();
