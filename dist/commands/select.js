import { writeFile } from 'fs';
import { readFile } from 'fs/promises';
import checkbox, { Separator } from '@inquirer/checkbox';
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
    const filePath = '/home/mbo/caramelcli/team-1/cli/caramelconfig.json';
    const data = await readFile(filePath, 'utf8');
    const user = JSON.parse(data);
    user.selectedNetworks = networks;
    await writeFile(filePath, JSON.stringify(user), () => { });
    console.log(`Selected networks are ${networks}`);
};
//hangi ağlarda deply edileceği bilgisini alacak
// buna göre switch-case ?? yapabilir
//sonra zaten dosyaya yazmaca
