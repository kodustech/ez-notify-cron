const functions = require('firebase-functions');
const { auth } = require('firebase');
const firebase = require('firebase/app');
require('firebase/firestore');

const env = require('./.env.json');

const scheduleMessages = require('./f/scheduleMessages');

const authFirebase = async () => {
  const { userFirebase, passwordFirebase } = env;
  await auth().signInWithEmailAndPassword(
    userFirebase,
    passwordFirebase
  );
}

if (!firebase.apps.length) {
  firebase.initializeApp(env.firebaseConfig);
}

/* const teste = async (req, res) => {
  await authFirebase();
  scheduleMessages();
  res.send('ok')
} */

const sendMessage = async () => {
  try {
    await authFirebase();
    scheduleMessages();
    console.log(Date())
  } catch (error) {
    console.log('sendMessage -> error', error)
  }
} 

/* exports.teste = functions.https.onRequest(async (req, res) => teste(req, res)); */
exports.job = functions.pubsub.schedule('0 * * * *').onRun(context => sendMessage());

console.log('---- build ----');
