
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCt4XknoNZN1BKuEoTfXV4TNXq4-ToywnY",
  authDomain: "taskflow-6bc2e.firebaseapp.com",
  projectId: "taskflow-6bc2e",
  storageBucket: "taskflow-6bc2e.firebasestorage.app",
  messagingSenderId: "680995891147",
  appId: "1:680995891147:web:01e0088668a6cb538a784e",
  measurementId: "G-7XXL8F40VL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
