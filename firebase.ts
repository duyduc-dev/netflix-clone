// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDQvTxIexnd_Y_KtnicMsSJxmVT8bP80ck',
  authDomain: 'netflix-clone-99d61.firebaseapp.com',
  projectId: 'netflix-clone-99d61',
  storageBucket: 'netflix-clone-99d61.appspot.com',
  messagingSenderId: '1053563281881',
  appId: '1:1053563281881:web:87ddddccc8c9aa041cb9c8',
  measurementId: 'G-ZQBQYRRJR1',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
