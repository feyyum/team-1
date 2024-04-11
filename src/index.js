#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var deploy_js_1 = require("/home/mbo/caramelcli/team-1/cli/dist/commands/deploy.js");
// import prompts, { prompt } from "prompts";
var program = new commander_1.Command();
program
    .name('caramel-cli')
    .description('Caramel CLI is a dev-tool for deploying smart contracts to multiple platforms.')
    .version('0.0.1');
program.command('log')
    .description('Log a message to the console')
    .argument('<string>', 'Message to log')
    .option('-c, --capitalize', 'Capitalize the message')
    .action(function (message, options) {
    options.capitalize ? console.log(message.toUpperCase()) : console.log(message);
});
program.command('deploy')
    .description('Start the deployment process')
    .argument("<string>", "name of the file")
    .action(function () { return (0, deploy_js_1.isRegistered)().
    then(function () { return console.log("hello"); }); });
program.parse();
//action kısmına nasıl fonksiyon eklendiğini çöz
// inquier ile nasıl checkbox yapılacağını çöz
