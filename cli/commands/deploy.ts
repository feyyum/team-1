// @ts-ignore
import inquirer from 'inquirer';
// @ts-ignore
import { v4 as uuidv4 } from 'uuid';
import chalk from 'chalk';
import fs from 'fs';
import path, {dirname} from 'path';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { getDatabase, ref, set, update } from "firebase/database";
import { doc, updateDoc, arrayUnion, arrayRemove, collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../firebase.js';

// Generate Contract
import { generateAIContract } from '../lib/ai.js';
import { deployNeonEVM, deployStylus } from '../lib/deploy.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const deploy = async () => {
    try {
        // Get current directory
        let filePath = (filename: string) => path.join((__dirname as any).split('cli')[0], "cli", filename);

        const data = await readFile(filePath("user-info.json"), 'utf8');
        const user = JSON.parse(data);

        if (!user.API_KEY) {
            console.log(chalk.red("You are not registered! \n"));
            console.log(chalk.whiteBright("Please register by using the command below:"));
            console.log(chalk.greenBright("caramel authenticate <API_KEY>"));

            process.exit(1);
        }

        const selection = {
            name: '',
            contractName: '',
            networks: [],
            keys: {},
        }

        // Questions for the user
        await inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Enter the project name which you want to deploy: ',
            },
            {
                type: 'input',
                name: 'source',
                message: 'Enter the contract file name which you want to deploy: ',
            },
            {
                type: 'checkbox',
                name: 'networks',
                message: 'Select networks: ',
                choices: ["Stylus", "NeonEVM", "GNOSIS"],
            },
        ])
          .then((answers: any) => {
            selection.name = answers.name;
            selection.contractName = answers.source;
            selection.networks = answers.networks;
          })
          .catch((error: any) => {
            if (error.isTtyError) {
            } else {
            console.log(error);
            }
          });

        const fspromises = fs.promises;
        await fspromises.access(filePath(selection.contractName), fs.constants.F_OK);

        const pkPrompts = selection.networks.map((network: string) => {
            return {
                type: 'password',
                name: `${network}`,
                message: `${network} - Private Key: `,
                mask: '*',
            }
        });

        await inquirer.prompt(pkPrompts)
        .then((answers: any) => {
            selection.keys = answers;
          })
          .catch((error: any) => {
            if (error.isTtyError) {
            } else {
            console.log(error);
            }
          });

        //? Inquirer confirm ekle

        // Create object to be sent to the database
        const deploymentId = uuidv4();
        const dobject: any = new Object();
        dobject.name = selection.name;
        dobject.contractName = selection.contractName;
        dobject.networks = selection.networks;
        dobject.deployments = new Object();
        dobject.status = "start"; // start, generate, deploy, done
        selection.networks.forEach((el: string, _i: number) => {
            dobject.deployments[el] = "";
        });

        const rdb = getDatabase();
        await set(ref(rdb, 'deployments/' + deploymentId), dobject);

        // const washingtonRef = doc(db, "users", "DC");

        let infoPath = path.join((__dirname as any).split('cli')[0], "cli", "user-info.json");

        const userData = await readFile(infoPath, 'utf8');
        const key = JSON.parse(userData).API_KEY;

        const userQuery = query(collection(db, "users"), where("apiKey", "==", key));
            const userSnapshot = await getDocs(userQuery);
            userSnapshot.forEach((_doc) => {
                const userRef = doc(db, "users", _doc.id);
                updateDoc(userRef, {
                    activeDeployments: arrayUnion(deploymentId)
                }).then(() => console.log(chalk.greenBright("Deployment is added to your account!") + "\n"));
            });

        // process.exit(1);

        const updates: any = {};
        updates['/deployments/' + deploymentId] = {
            ...dobject,
            status: "generate",
        };

        await update(ref(rdb), updates);

        if ((selection.networks as string[]).includes("GNOSIS") || (selection.networks as string[]).includes("NeonEVM")) {
            await generateAIContract(selection.contractName);
        }

        // Deploy to networks
        if ((selection.networks as string[]).includes("Stylus")) {
            // Ethereum deploy
            const STYLUS_ADDRESS = await deployStylus(selection.contractName, (selection.keys as any).Stylus);
            console.log("STYLUS_ADDRESS: ", STYLUS_ADDRESS);
        }

        if ((selection.networks as string[]).includes("NeonEVM")) {
            const NEON_ADDRESS = await deployNeonEVM((selection.keys as any).NeonEVM);
            console.log("NEON_ADDRESS: ", NEON_ADDRESS);
        }

        if ((selection.networks as string[]).includes("GNOSIS")) {
            const GNOSIS_ADDRESS = await deployNeonEVM((selection.keys as any).GNOSIS);
            console.log("GNOSIS ADDRESS: ", GNOSIS_ADDRESS);
        }

        process.exit(1);


    } catch (error) {
        console.error('An error occurred:', error);
    }
};






// eğer resolve ederse kaynak kontrat dosyası isteyecek
// reject ise authorize yapması gerekecek, ekrana bunu yazdırsın
//promise şeklinde yazmak daha mantıklı olabilir 