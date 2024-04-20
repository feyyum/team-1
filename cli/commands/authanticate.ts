import { writeFile } from 'fs';
import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const authanticate = async (username: string, password: string, API_KEY: string) => {
    try {
        let filePath = path.join((__dirname as any).split('cli')[0], "clicaramel/team-1/cli", "deploy-object.json");
        const data = await readFile(filePath, 'utf8');
        const user = JSON.parse(data);

        if (!(user.username && user.password && user.API)) {
            user.username = username;
            user.password = password,
                user.API_KEY = API_KEY;

            await writeFile(filePath, JSON.stringify(user), () => { });
            console.log("You have registered successfully!");
        }
        else {
            console.log("You have already registered!");
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }

}