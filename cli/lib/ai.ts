import { GoogleGenerativeAI } from "@google/generative-ai";
import { readFile, writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import path, {dirname} from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const genAI = new GoogleGenerativeAI((process.env.GEMINI_API_KEY as string));

export async function generateAIContract(contractName: string) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});

    let filePath = path.join((__dirname as any).split('cli')[0], "cli", contractName);
    let writeFilePath = path.join((__dirname as any).split('cli')[0], "cli/deploy", "Contract.sol");

    const data = await readFile(filePath, 'utf8');

    const prompt = `Take this, '''Rust ${data} ''', basic smart contract written in Rust and write me a smart contract using a Solidity 
        language that performs the same functions so that I can deploy it on the Ethereum network. Don't forget to include SPDX-License-Identifier: MIT and pragma solidity ^0.8.24;. Only give me the solidity contract code.`;
  
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    let res = text.split("```solidity")[1]
    res = (res as string).split("```")[0]

    try {
        await writeFile(writeFilePath, (res as string), { flag: 'w' });
        // console.log('Dosya başarıyla kaydedildi.');
    } catch (err) {
        console.error('Dosyaya yazılırken bir hata oluştu:', err);
    }
}