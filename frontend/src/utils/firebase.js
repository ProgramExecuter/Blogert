import firebase from 'firebase';

// Initialize Firebase
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBSyNcAxg-4-ULPjQ9zCvx7mTPE_AXEMAE",
  authDomain: "blogert-df45a.firebaseapp.com",
  projectId: "blogert-df45a",
  storageBucket: "blogert-df45a.appspot.com",
  messagingSenderId: "1048341419123",
  appId: "1:1048341419123:web:556bea5fa2882e1d4a0606",
  measurementId: "G-6WNP78MBTW"
});

const db =  firebaseApp.firestore();
const auth =  firebase.auth();
const storage = firebase.storage();

const backend = "http://localhost:2000";

export {storage, backend};