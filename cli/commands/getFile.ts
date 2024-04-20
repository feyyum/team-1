import { readFile } from 'fs/promises';
import { writeFile } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const getFileName = async (fileName: string) => {
    let filePath = path.join((__dirname as any).split('clicaramel')[0], "clicaramel/team-1/cli", fileName);
    try {
        const isReady = await readFile(filePath);
        console.log("Your file is in the correct folder. You can continue");
        const data = await readFile(filePath, 'utf8');
        const user = JSON.parse(data);
        user.fileName = fileName;
        await writeFile(filePath, JSON.stringify(user), () => { });
    }
    catch {
        console.log("File is not found. Please add the file to ../source-contracts");
    }
}