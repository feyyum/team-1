// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "caramel-cli.firebaseapp.com",
  projectId: "caramel-cli",
  storageBucket: "caramel-cli.appspot.com",
  messagingSenderId: "885882755989",
  appId: "1:885882755989:web:5db3d4c8a6605cbd4e749c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
