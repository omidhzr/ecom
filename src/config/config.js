import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyASOW4pEuKlUWlLw4-5eCkZVAwRc5c4sfU",
    authDomain: "ecom-52274.firebaseapp.com",
    projectId: "ecom-52274",
    storageBucket: "ecom-52274.appspot.com",
    messagingSenderId: "174071191606",
    appId: "1:174071191606:web:7c7b05bc51adb16287a097",
    measurementId: "G-WV2GX22VG9"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestorage();
const storage = firebase.storage();

export {auth, db, storage} 
