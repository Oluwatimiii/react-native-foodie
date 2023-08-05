import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCtW9oy9_t6yQ_bXRjKpC8FtO1qtGRlYMk",
  authDomain: "metanative-auth.firebaseapp.com",
  projectId: "metanative-auth",
  storageBucket: "metanative-auth.appspot.com",
  messagingSenderId: "944797805394",
  appId: "1:944797805394:web:1aa5918015bdf3cf3b288b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const authentication = getAuth(app);
const database = getFirestore();

export { authentication, database }