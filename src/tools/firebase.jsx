// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

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
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app



// import { initializeApp } from "firebase/app";
// // Import authentication for login
// import 'firebase/auth'

// // Firebase configuration
// const app = initializeApp({
//     apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//     authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.REACT_APP_FIREBASE_APP_ID
// })

// // Gives authentication instance
// export const auth = app.auth()
// export default app