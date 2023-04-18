// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVemW4ae1rlgLLmzRWk3TkCxNaYizq4b8",
  authDomain: "cryptocurrency-tracker-a320a.firebaseapp.com",
  projectId: "cryptocurrency-tracker-a320a",
  storageBucket: "cryptocurrency-tracker-a320a.appspot.com",
  messagingSenderId: "468026540673",
  appId: "1:468026540673:web:026b3187f524608ae28380"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db }
export default app

