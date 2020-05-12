const firebase = require('firebase/app');
const moment = require('moment');
const axios = require('axios');
const { uniqBy, delay } = require('lodash');

const scheduleMessages = async function() {
  try {
    const notificationsRef = firebase.firestore().collection('notification');
    const snapshot = await notificationsRef
      .where('sended', '==', false)
      .where('date', '==', moment().format('YYYY-MM-DD'))
      .where('hour', '==', moment().subtract(3, 'h').format('HH:mm')) // para o firebase 
      .get();

    const messages = [];
    if (!snapshot.empty) {
      snapshot.forEach(doc => {
        messages.push({
          ...doc.data(),
          uid: doc.id
        });
      });
    }

    const organizationsId = 
      uniqBy(messages, 'organizationId')
      .map(x => (x.organizationId));
    
    const snapshotSlack = await firebase.firestore().collection('slack').get();
    if (!snapshotSlack.empty) {
      snapshotSlack.forEach(doc => {
        const message = messages.filter(x => x.organizationId == doc.id)
        for (let index = 0; index < message.length; index++) {
          const m = message[index];
          m.slackBotToken = doc.data().botToken;
        }
      });
    }

    for (let index = 0; index < messages.length; index++) {
      const message = messages[index];
      delay((m) => {
        for (let toIndex = 0; toIndex < m.to.length; toIndex++) {
          const to = m.to[toIndex];
          axios.get(
            'https://slack.com/api/chat.postMessage?token=' + m.slackBotToken +
            '&channel=' + to +
            '&text=' + m.message
          );
        }
      }, 100, message);

      firebase
        .firestore()
        .collection('notification')
        .doc(message.uid)
        .update({ sended: true });
    }
  } catch (error) {
    console.log('error', error)
  }
}

module.exports = scheduleMessages;
