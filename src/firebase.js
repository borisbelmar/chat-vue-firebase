const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/firestore');
require('firebase/storage');

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCzDDfEPTp7WFc6n-cfSXKThtYAahfj9IY",
    authDomain: "fb-ggl-login.firebaseapp.com",
    databaseURL: "https://fb-ggl-login.firebaseio.com",
    projectId: "fb-ggl-login",
    storageBucket: "fb-ggl-login.appspot.com",
    messagingSenderId: "851287826831",
    appId: "1:851287826831:web:03a1685431bcc052"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {firebase, db, auth, storage};