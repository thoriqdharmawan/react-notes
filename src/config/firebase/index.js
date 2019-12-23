import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyAerRuX5C88RVV4u7rXvWecJLsWo1c5EVY",
    authDomain: "simple-notes-firebase-ec6fb.firebaseapp.com",
    databaseURL: "https://simple-notes-firebase-ec6fb.firebaseio.com",
    projectId: "simple-notes-firebase-ec6fb",
    storageBucket: "simple-notes-firebase-ec6fb.appspot.com",
    messagingSenderId: "917257668003",
    appId: "1:917257668003:web:6434a806b4047f42370616",
    measurementId: "G-4G8HLCP7XE"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();
export const database = firebase.database();

export default firebase;