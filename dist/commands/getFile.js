import { readFile } from 'fs/promises';
export const getFileName = async (fileName) => {
    const filePath = "../source-contracts/" + fileName;
    try {
        const isReady = await readFile(filePath);
        console.log("Your file is in the correct folder. You can continue");
    }
    catch {
        console.log("File is not found. Please add the file to ../source-contracts");
    }
};
