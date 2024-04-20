import { writeFile } from 'fs';
import * as fs from 'fs';
import dotenv from 'dotenv';
import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const getPK = async (network_name: string, private_key: string) => {

    try {
        // let filePath = path.join((__dirname as any).split('cli')[0], "clicaramel/team-1/cli", "user-info.json");

        // const data = await readFile(filePath, 'utf8');
        // const user = JSON.parse(data);
        dotenv.config();
        switch (network_name) {
            case "arbitrum": {
                fs.appendFileSync('.env', `arbitrumPK: ${private_key}`);
                break;
            }
            case "solana": {
                fs.appendFileSync('.env', ` solanaPK: ${private_key}`);
                break;
            }
            case "gnosis": {
                fs.appendFileSync('.env', `gnosisPK:${private_key}`);
                break;
            }

        }
        dotenv.config();
        //  await writeFile(filePath, JSON.stringify(user), () => { });

    }
    catch (error) {
        console.error('An error occurred during getting the useer info:', error);
    }
}

