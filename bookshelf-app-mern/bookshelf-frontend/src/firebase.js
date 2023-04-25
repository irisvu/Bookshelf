// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword  } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import 'firebase/compat/auth';
import firebase from "firebase/compat/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration



const firebaseConfig = {
  apiKey: "AIzaSyCuQaVDuozggNHUlyzSZXXHfqaFHWvSE7A",
  authDomain: "bookshelf-app-mern.firebaseapp.com",
  projectId: "bookshelf-app-mern",
  storageBucket: "bookshelf-app-mern.appspot.com",
  messagingSenderId: "490702079298",
  appId: "1:490702079298:web:29a0b1c1058eea809c74db"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage,createUserWithEmailAndPassword,signInWithEmailAndPassword   }


// Initialize Firebas

//const app = initializeApp(firebaseConfig);