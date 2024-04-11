import { writeFile } from 'fs';
import { readFile } from 'fs/promises';
export const authanticate = async (username, password, API_KEY) => {
    try {
        const filePath = '/home/mbo/caramelcli/team-1/cli/caramelconfig.json';
        const data = await readFile(filePath, 'utf8');
        const user = JSON.parse(data);
        if (!(user.username && user.password && user.API)) {
            user.username = username;
            user.password = password,
                user.API = API_KEY;
            await writeFile(filePath, JSON.stringify(user), () => { });
            console.log("You have registered successfully!");
        }
        else {
            console.log("You have already registered!");
        }
    }
    catch (error) {
        console.error('An error occurred:', error);
    }
};
