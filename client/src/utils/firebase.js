
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "prepmate-36c53.firebaseapp.com",
  projectId: "prepmate-36c53",
  storageBucket: "prepmate-36c53.firebasestorage.app",
  messagingSenderId: "79547262563",
  appId: "1:79547262563:web:b7e1b0aceb226997f03a56",
  measurementId: "G-RHYZ4VYY57"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export {auth,provider}