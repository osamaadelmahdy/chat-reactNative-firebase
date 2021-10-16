import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDcbDVmChPUOtMVbbNzHIge7Euwdm8ksLU',
  authDomain: 'chat-react-native-b8fef.firebaseapp.com',
  projectId: 'chat-react-native-b8fef',
  storageBucket: 'chat-react-native-b8fef.appspot.com',
  messagingSenderId: '478694222854',
  appId: '1:478694222854:web:d8e1c184f397166c49e787',
  measurementId: 'G-WF9FX3SYMV',
};
let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = firebase.firestore(app);
const auth = firebase.auth(app);

export { db, auth };
