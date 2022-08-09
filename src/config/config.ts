import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyASOW4pEuKlUWlLw4-5eCkZVAwRc5c4sfU',
  authDomain: 'ecom-52274.firebaseapp.com',
  projectId: 'ecom-52274',
  storageBucket: 'ecom-52274.appspot.com',
  messagingSenderId: '174071191606',
  appId: '1:174071191606:web:7c7b05bc51adb16287a097',
  measurementId: 'G-WV2GX22VG9'
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
