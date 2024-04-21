// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.VITE_FIREBASE_API_KEY,
    authDomain: "caramel-cli.firebaseapp.com",
    projectId: "caramel-cli",
    storageBucket: "caramel-cli.appspot.com",
    messagingSenderId: "885882755989",
    appId: "1:885882755989:web:5db3d4c8a6605cbd4e749c",
    databaseURL: "https://caramel-cli-default-rtdb.europe-west1.firebasedatabase.app",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const rdb = getDatabase(app);

export { db, rdb };
