// @ts-ignore
import CP from 'child_process';
import util from 'util';
import { readFile, writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import path, {dirname} from 'path';

const exec = util.promisify(CP.exec);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function deployStylus(contractName: string, private_key: string) {
    const projectRoot = path.join((__dirname as any).split('cli')[0]);
    let filePath = path.join((__dirname as any).split('cli')[0], "cli", contractName);
    let writeFilePath = path.join((__dirname as any).split('cli')[0], "cli/rust/src/lib.rs");

    const data = await readFile(filePath, 'utf8');

    await writeFile(writeFilePath, (data as string), { flag: 'w' });

    // Compile and Deploy

    const rustDir = path.join(projectRoot, 'cli/rust');

    const command = `cargo stylus check && cargo stylus deploy --private-key ${private_key}`;

    const options = { cwd: rustDir, shell: '/bin/zsh' }; // Yolu ve kabuğu doğrudan belirleyin

    const {stdout} = await exec(command, options);

    let res = stdout.split("Deploying program to address ")[1];
    res = (res as string).split("Base fee")[0];

    return res;
}

export async function deployNeonEVM(private_key: string) {
    const projectRoot = path.join((__dirname as any).split('cli')[0]);
    let filePath = path.join((__dirname as any).split('cli')[0], "cli/deploy/Contract.sol");
    let writeFilePath = path.join((__dirname as any).split('cli')[0], "cli/hardhat/contracts/Contract.sol");
    let pkWriteFilePath = path.join((__dirname as any).split('cli')[0], "cli/hardhat/.env");

    const data = await readFile(filePath, 'utf8');

    await writeFile(writeFilePath, (data as string), { flag: 'w' });
    await writeFile(pkWriteFilePath, `PRIVATE_KEY_OWNER=${private_key}`, { flag: 'w' });

    // Compile and Deploy

    const hardhatDir = path.join(projectRoot, 'cli/hardhat');

    const command = `npx hardhat compile && npx hardhat run scripts/deploy.js --network neondevnet`;

    const options = { cwd: hardhatDir, shell: '/bin/zsh' }; // Yolu ve kabuğu doğrudan belirleyin

    const {stdout} = await exec(command, options);

    let res = stdout
    res = (res as any).split("0x")[1]
    
    return `0x${res}`;
}

export async function deployGNOSIS(private_key: string) {
    const projectRoot = path.join((__dirname as any).split('cli')[0]);
    let filePath = path.join((__dirname as any).split('cli')[0], "cli/deploy/Contract.sol");
    let writeFilePath = path.join((__dirname as any).split('cli')[0], "cli/hardhat/contracts/Contract.sol");
    let pkWriteFilePath = path.join((__dirname as any).split('cli')[0], "cli/hardhat/.env");

    const data = await readFile(filePath, 'utf8');

    await writeFile(writeFilePath, (data as string), { flag: 'w' });
    await writeFile(pkWriteFilePath, `PRIVATE_KEY_OWNER=${private_key}`, { flag: 'w' });

    // Compile and Deploy

    const hardhatDir = path.join(projectRoot, 'cli/hardhat');

    const command = `npx hardhat compile && npx hardhat run scripts/deploy.js --network gnosis`;

    const options = { cwd: hardhatDir, shell: '/bin/zsh' }; // Yolu ve kabuğu doğrudan belirleyin

    const {stdout} = await exec(command, options);

    let res = stdout
    res = (res as any).split("0x")[1]
    
    return `0x${res}`;
}