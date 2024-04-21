import { writeFile } from 'fs';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import path, {dirname} from 'path';

import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../firebase.js';
import chalk from 'chalk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const authanticate = async (API_KEY: any) => {
    try {
        let filePath = path.join((__dirname as any).split('cli')[0], "cli", "user-info.json");

        const data = await readFile(filePath, 'utf8');
        const user = JSON.parse(data);

        if (!(user.API_KEY)) {

            let userExists = false;

            const userQuery = query(collection(db, "users"), where("apiKey", "==", API_KEY));
            const userSnapshot = await getDocs(userQuery);
            userSnapshot.forEach((doc) => {
                userExists = true;
            });

            if (userExists) {
                user.API_KEY = API_KEY;
                writeFile(filePath, JSON.stringify(user), () => {
                    console.log(chalk.green("\n", "You have registered successfully!") + "\n");
                });
                return;
            }

            console.log(chalk.red("\n", "You are not registered! Please create account!") + "\n");

        }
        else {
            console.log(chalk.blue("\n" ,"You are already registered!") + "\n");
        }

        process.exit(1);
    } catch (error) {
        console.error('An error occurred:', error);
    }

}