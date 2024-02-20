// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "realestate-c63d4.firebaseapp.com",
  projectId: "realestate-c63d4",
  storageBucket: "realestate-c63d4.appspot.com",
  messagingSenderId: "29369416766",
  appId: "1:29369416766:web:fe0fd029e0ce0f5d2aa56f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

