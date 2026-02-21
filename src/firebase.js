import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAVr0U21jC-3u1-XiZaUGLWc04sZ_NGFNs",
  authDomain: "city-style-d593a.firebaseapp.com",
  projectId: "city-style-d593a",
  storageBucket: "city-style-d593a.firebasestorage.app",
  messagingSenderId: "444457481585",
  appId: "1:444457481585:web:fbcfcb4cc8bdc26b93f2d0",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
  signOut,
  onAuthStateChanged,
};