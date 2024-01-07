import { NextRequest, NextResponse } from 'next/server'
import { scrapeOffers } from '../../../scripts/scrapeOffers';

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        const searchTerms = ['backend'];
        const limit = 5;
  
        await scrapeOffers(searchTerms, limit);

        return NextResponse.json({ message: 'Script run successfully' });
    } catch (error) {
        return new NextResponse(`${error}`, { status: 500 });
    }
}