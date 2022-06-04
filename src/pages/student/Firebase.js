import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig=firebase.initializeApp({
    apiKey: "AIzaSyBIFHY-htvMHPx7E0SyJESwgWqDML7huLc",
    authDomain: "file-upload-752a5.firebaseapp.com",
    projectId: "file-upload-752a5",
    storageBucket: "file-upload-752a5.appspot.com",
    messagingSenderId: "819032328752",
    appId: "1:819032328752:web:bb7e1a0cff790584923bf5"
})

const db = firebaseConfig.firestore();
const auth = firebaseConfig.auth();
const storage = firebaseConfig.storage();
export { db, auth, storage };