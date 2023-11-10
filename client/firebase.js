// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-f9bd7.firebaseapp.com",
  projectId: "mern-estate-f9bd7",
  storageBucket: "mern-estate-f9bd7.appspot.com",
  messagingSenderId: "551115758024",
  appId: "1:551115758024:web:8ecb2b9e299baa3dec88fd",
  measurementId: "G-87SMGLSFQX",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
