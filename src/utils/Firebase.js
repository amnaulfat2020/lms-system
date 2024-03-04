import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
import {
  getAuth
} from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA97A0OwRtfeATrsZkj-tydyRLlH1ukLcY",
  authDomain: "lms-system-3616a.firebaseapp.com",
  projectId: "lms-system-3616a",
  storageBucket: "lms-system-3616a.appspot.com",
  messagingSenderId: "526270552123",
  appId: "1:526270552123:web:412d7f5acea3f768f8241e",
  measurementId: "G-9VMPCG0SFX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const firestore = getFirestore(app);
export const storage = getStorage(app); // Exporting storage here

export { app, auth, db, firestore };

export const getUserIdByEmail = async (email) => {
  try {
    const userRef = doc(db, 'users', email);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();
      return userData.uniqueId;
    }
    return null; 
  } catch (error) {
    console.error('Error fetching user ID:', error);
    return null;
  }
};
