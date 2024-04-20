import { initializeApp } from 'firebase/app';
import { doc, getDoc, setDoc, query, collection, where, getDocs, DocumentSnapshot, DocumentReference } from 'firebase/firestore';
import path from 'path';
import { readFile } from 'fs/promises';
import { db } from "../firebase.js";


import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { error } from 'console';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



let filePath = path.join((__dirname as any).split('cli')[0], "clicaramel/team-1/cli", 'user-info.json');
const data = await readFile(filePath, 'utf8');
const user = JSON.parse(data);
const userAPI = user.API_KEY;


export const sendDatabase = async () => {
    const collectionRef = collection(db, "users");
    try {
        const q = query(collectionRef, where("apiKey", "==", userAPI));
        const snapshot = await getDocs(q);
        let isUser = false;
        if (!snapshot.empty) {
            for (const _doc of snapshot.docs) {

                const userData = _doc.data();
                if (isUser) {
                    throw new Error("This API key is already in use!");
                } else {
                    isUser = true;
                    let userID = _doc.id;
                    let activeDeploymentsList = [];
                    for (const nw of user.selectedNetworks) {
                        let networkObject = { networkName: nw, status: "prepared" };
                        activeDeploymentsList.push(networkObject);
                    }

                    const userReference = doc(db, "users", userID);

                    await setDoc(userReference, {
                        fileName: user.fileName,
                        selectedNetworks: user.selectedNetworks,
                        status: "prepared",
                        activeDeployments: activeDeploymentsList,
                        previousDeployments: []
                    }, { merge: true });
                }
            };
        } else {
            throw new Error("Document not found!");
        }

        return
    } catch (err) {
        console.log("A problem occured:", err);
    }







}


