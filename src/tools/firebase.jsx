// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-eB4a39si8NSV9LbvBWvdjnUUts2u-8U",
  authDomain: "cryptocurrencytracker-prod.firebaseapp.com",
  projectId: "cryptocurrencytracker-prod",
  storageBucket: "cryptocurrencytracker-prod.appspot.com",
  messagingSenderId: "846616768947",
  appId: "1:846616768947:web:9f03e849aad8da7ac3dbc6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db }
export default app

