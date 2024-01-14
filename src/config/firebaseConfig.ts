// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAk_H0g7zlDZRDG88hRcxZVdoWnBvpzW98",
  authDomain: "budgetapp-8ac58.firebaseapp.com",
  projectId: "budgetapp-8ac58",
  storageBucket: "budgetapp-8ac58.appspot.com",
  messagingSenderId: "25316029544",
  appId: "1:25316029544:web:ef749d4cdbbf7c57adf7dd",
  measurementId: "G-YKV9DBSTB0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export default firebaseConfig;
export {app, auth, analytics, db}
