import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBGtJP6VBe2xSNhci8m_OoMbo5k2YUDTQU",
  authDomain: "foodie-timi.firebaseapp.com",
  projectId: "foodie-timi",
  storageBucket: "foodie-timi.appspot.com",
  messagingSenderId: "972292386462",
  appId: "1:972292386462:web:d36447186d66705b6c158f",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore();

export { auth, db };
