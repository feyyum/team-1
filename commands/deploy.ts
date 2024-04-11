import { readFile } from 'fs/promises';


export const isRegistered = async () => {
    console.log("Welcome to Caramel");

    try {
        const filePath = '/home/mbo/caramelcli/team-1/cli/caramelconfig.json';
        const data = await readFile(filePath, 'utf8');
        const user = JSON.parse(data);

        if (user.API && user.username && user.password) {
            console.log("Deploy starts")
        }
        else {
            console.log("You need to register first.");
            console.log("Command", " caramel authanticate <username> <password> <API_KEY>");
        }

    } catch (error) {
        console.error('An error occurred:', error);
    }


};






// eğer resolve ederse kaynak kontrat dosyası isteyecek
// reject ise authorize yapması gerekecek, ekrana bunu yazdırsın
//promise şeklinde yazmak daha mantıklı olabilir 