#!/usr/bin/env node
import { Command } from 'commander';
import { isRegistered } from './commands/deploy.js';
import { authanticate } from './commands/authanticate.js';
import { selectNetwork } from './commands/select.js';
import { getPK } from './commands/getPK.js';
import { getFileName } from './commands/getFile.js';
import { sendDatabase } from './commands/initiateDatabase.js';
import "./firebase.js";
const program = new Command();

program
  .name('caramel-cli')
  .description('Caramel CLI is a dev-tool for deploying smart contracts to multiple platforms.')
  .version('0.0.1');

program.command('log')
  .description('Log a message to the console')
  .argument('<string>', 'Message to log')
  .option('-c, --capitalize', 'Capitalize the message')
  .action((message: string, options: {
    capitalize?: boolean
  }) => {
    options.capitalize ? console.log(message.toUpperCase()) : console.log(message);
  }
  );
program.command('deploy')
  .description('Start the deployment process')
  .action(() => isRegistered().
    then(() => { })
  );
program.command('authanticate')
  .description('Register for the tool')
  .argument("<string>", "username")
  .argument("<string>", "password")
  .argument("<string>", "API_KEY")
  .action((username: string, password: string, API_KEY: string) => { authanticate(username, password, API_KEY).then(() => { console.log("Type caramel fileName <FILE_NAME>") }) });

program.command('networks')
  .description('Choose the networks for deployment')
  .action(() => selectNetwork().
    then(() => { console.log("Based on your selections,for each network please command caramel pk <network_name> <private_key> "); })
  );
program.command('pk')
  .description('Input private key for deployment')
  .argument("<string>", "network name")
  .argument("<string>", "private key")
  .action((network_name: string, private_key: string) => getPK(network_name, private_key).
    then(() => {
      console.log(`Private key for ${network_name} is captured successfully. `)
      console.log("If you have selected other networks, please do the same process for each of them.")
    })
  );
program.command('fileName')
  .description('Input the name of the file to be deployed')
  .argument("<string>", "file name")
  .action((name: string) => getFileName(name).
    then(() => {
      console.log("You are ready to send info to database");
      console.log("type caramel sendDatabase");
    })
  );
program.command("sendDatabase")
  .description("Creates new deploy object on database")
  .action(() => {
    sendDatabase().then(() => {
      console.log("You have registered to database successfully.");

    }).catch(() => { console.log("Please check your API Key and write it again.") });
  })




program.parse();

//action kısmına nasıl fonksiyon eklendiğini çöz
// inquier ile nasıl checkbox yapılacağını çöz