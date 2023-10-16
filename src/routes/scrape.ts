import { NextApiResponse, NextApiRequest } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const exec = require('child_process').exec;
    exec('npm run scrap:offers', (error: any, stdout: any, stderr: any) => {
        if (error) {
            console.error(`Error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
    });
    res.status(200).send('Script run');
}