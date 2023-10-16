import { NextRequest, NextResponse } from 'next/server'
import { exec } from 'child_process'

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        exec('npm run scrap:offers', (error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${error}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
        });

        return NextResponse.json({ message: 'Script run successfully' });
    } catch (error) {
        return new NextResponse(`${error}`, { status: 500 });
    }
}