import { writeFile } from 'fs';
import { readFile } from 'fs/promises';
import checkbox, { Separator } from '@inquirer/checkbox';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const selectNetwork = async () => {
    const networks = await checkbox({
        message: 'Select all the networks you want to deploy contract:',
        choices: [
            { name: 'Arbitrum', value: 'arbitrum' },
            { name: 'Solana', value: 'solana' },
            { name: 'Gnosis', value: 'gnosis' },
            new Separator(),
        ],
        required: true
    });
    let filePath = path.join((__dirname as any).split('cli')[0], "clicaramel/team-1/cli", 'user-info.json');
    const data = await readFile(filePath, 'utf8');
    const user = JSON.parse(data);
    user.selectedNetworks = networks;
    await writeFile(filePath, JSON.stringify(user), () => { });
    console.log(`Selected networks are ${networks}`);


}




