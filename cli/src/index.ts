#!/usr/bin/env node
import { Command } from 'commander';
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

program.parse();