import { writeFile } from 'fs';
import { readFile } from 'fs/promises';
export const getPK = async (network_name, private_key) => {
    const filePath = "../caramelconfig.json";
    try {
        const filePath = '/home/mbo/caramelcli/team-1/cli/caramelconfig.json';
        const data = await readFile(filePath, 'utf8');
        const user = JSON.parse(data);
        switch (network_name) {
            case "arbitrum": {
                user.ArbitrumPK = private_key;
            }
            case "solana": {
                user.SolanaPK = private_key;
            }
            case "gnosis": {
                user.GnosisPK = private_key;
            }
        }
        await writeFile(filePath, JSON.stringify(user), () => { });
    }
    catch (error) {
        console.error('An error occurred during getting the useer info:', error);
    }
};
