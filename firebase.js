// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAodpKv81I9DRKdi_BmBoC_Z42Tjz3f1VI",
  authDomain: "twitter-fcd7e.firebaseapp.com",
  databaseURL: "https://twitter-fcd7e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "twitter-fcd7e",
  storageBucket: "twitter-fcd7e.appspot.com",
  messagingSenderId: "633049463065",
  appId: "1:633049463065:web:fc9db20ddbdb2a66f4ad88"
};

// Initialize Firebase

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// database
const db = getFirestore();
// storage
const storage = getStorage();

export { app, db, storage };
