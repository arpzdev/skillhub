import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged,GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup,signOut } from 'firebase/auth';
import { getFirestore, collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAABjtMXxdGd2yv066kPvtU0FylCY_nx3Y",
    authDomain: "skillhub-9043e.firebaseapp.com",
    projectId: "skillhub-9043e",
    storageBucket: "skillhub-9043e.appspot.com",
    messagingSenderId: "891671590903",
    appId: "1:891671590903:web:38735faf0be07f3ca8e0f2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export {
    app,
    auth,
    storage,
    firestore,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    collection,
    addDoc,
    query,
    signOut,
    onAuthStateChanged,
    getAuth,
    where,
    getDocs,
  };

