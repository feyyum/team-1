import { initializeApp } from 'firebase/app';
import { doc, getDoc, setDoc, query, collection, where, getDocs } from 'firebase/firestore';
import path from 'path';
import { readFile } from 'fs/promises';
import { db } from "../firebase.js";

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



let filePath = path.join((__dirname as any).split('cli')[0], "clicaramel/team-1/cli", 'user-info.json');
const data = await readFile(filePath, 'utf8');
const user = JSON.parse(data);
const userAPI = user.API_KEY;


export const sendDatabase = async () => {
    const collectionRef = collection(db, "users");
    const q = query(collectionRef, where("apiKey", "==", userAPI))

    const snapshot = await getDocs(q);
    let isUser = false;
    snapshot.forEach(async (doc) => {

        const userData = doc.data();
        if (userData.apiKey === userAPI) {
            isUser = true;
            await setDoc(doc.ref, user);
        }
        console.log(userData)

    });



}


