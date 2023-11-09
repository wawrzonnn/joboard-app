
import { NextApiRequest, NextApiResponse } from 'next';
import { scrapeOffers } from '../../../scripts/scrapeOffers';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }
  try {
    const searchTerms = ['backend', 'frontend', 'fullstack'];
    const limit = 10;
    const results = await scrapeOffers(searchTerms, limit);

    res.status(200).json({ message: 'Scraping successful', data: results });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Scraping error:', error.message);
      res.status(500).json({ error: 'Scraping failed', details: error.message });
    } else {
      console.error('An unknown error occurred:', error);
      res.status(500).json({ error: 'Scraping failed', details: 'An unknown error occurred' });
    }
  }
}
