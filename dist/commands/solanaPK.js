import { writeFile } from 'fs';
import { readFile } from 'fs/promises';
export const getPK = async (network_name, private_key) => {
    const filePath = "../caramelconfig.json";
    try {
        const filePath = '/home/mbo/caramelcli/team-1/cli/caramelconfig.json';
        const data = await readFile(filePath, 'utf8');
        const user = JSON.parse(data);
        if (network_name === "solana") {
            user.SolanaPK = private_key;
        }
        else if (network_name === "arbitrum") {
            user.ArbitrumPK = private_key;
        }
        else {
            user.GnosisPK = private_key;
        }
        await writeFile(filePath, JSON.stringify(user), () => { });
        console.log("Private key for Solana is captured.");
    }
    catch (error) {
        console.error('An error occurred during getting the useer info:', error);
    }
};
