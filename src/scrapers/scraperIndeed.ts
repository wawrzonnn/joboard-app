import { ScraperOptions, JobOffer } from './types';
import { ScraperBase } from './scraperBase';
import { sub, parse, format } from 'date-fns';
import { ElementHandle } from 'puppeteer';

export class ScraperIndeed extends ScraperBase {
  options: ScraperOptions;

  constructor(options: ScraperOptions) {
    super();
    this.options = options;
  }

  async navigate(): Promise<void> {
    if (!this.page) {
      throw new Error('Page has not been initialized. Please call initialize() first.');
    }
    const url = `https://www.indeed.com/q-${this.options.searchValue}-jobs.html`;
    try {
      await this.page.goto(url);
    } catch (error) {
      console.error('Error navigating to the page:', error);
      throw new Error('Failed to navigate to the page.');
    }
  }

  async extractLocation(offer: ElementHandle): Promise<string> {
    const locationText = await this.extractFromElement(offer, '.location');
    if (locationText) return locationText;

    return await this.extractFromElement(offer, 'div span.text-xs') || '';
  }

  async getJobOffers(): Promise<JobOffer[]> {
    if (!this.browser || !this.page) {
      throw new Error('Browser has not been initialized. Please call initialize() first.');
    }

    const jobOffersLiElements = await this.page.$$('.css-zu9cdh li');
    const offers = await Promise.all(
      jobOffersLiElements.map(async (offer, index) => {
        const [title, company, technologies, location, jobType, seniority] = await Promise.all([
          this.extractFromElement(offer, 'h2 > a > span'),
          this.extractFromElement(offer, '.companyName'),
          this.extractTechStackFromOffer(offer, '.tech-stack'),
          this.extractLocation(offer),
          this.extractFromElement(offer, 'div.flex.items-start > span'),
          this.extractFromElement(offer, '  div.flex.items-start:nth-of-type(3) > span'),
        ]);

        let addedAt: string = '';
        let employmentType: string = '';
        let salaryFrom: string = '';
        let salaryTo: string = '';
        let currency: string = '';
        let description: string = '';
        let offerLink: string = '';
        try {
          offerLink = 'https://www.indeed.com' + (await this.extractFromElement(offer, 'h2 > a', 'href'));

          console.log(`Offer URL for element ${index + 1}:`, offerLink);
          if (offerLink && this.browser) {
            const newPage = await this.browser.newPage();
            await newPage.goto(offerLink, { waitUntil: 'networkidle0' });

            const salaryText = await newPage.$eval('.salaryText', el => el.textContent);
            const salaryInfo = await this.parseSalary(salaryText);
            salaryFrom = salaryInfo.salaryFrom;
            salaryTo = salaryInfo.salaryTo;
            currency = salaryInfo.currency;

            const dateElements = await newPage.$x('//div[contains(text(), "Posted Date")]/following-sibling::div');

            if (dateElements.length) {
              const dateElement = dateElements[0];
              const dateString = await newPage.evaluate(p => (p.textContent ? p.textContent.trim() : ''), dateElement);
              const offerDate = parse(dateString, 'dd.MM.yyyy', new Date());
              const offerDateMinusOneMonth = sub(offerDate, { months: 1 });
              addedAt = format(offerDateMinusOneMonth, 'dd.MM.yyyy');
            }

            const descriptionElement = await newPage.$('.jobDescriptionText');
            if (descriptionElement) {
              description = await newPage.evaluate(el => (el.textContent ? el.textContent.trim() : ''), descriptionElement);
            }

            await newPage.close();
          }
        } catch (error) {
          console.error('error:', error);
        }

        return {
          title,
          company,
          technologies,
          location,
          jobType,
          seniority,
          addedAt,
          employmentType,
          salaryFrom,
          salaryTo,
          currency,
          description,
          offerLink
        };
      })
    );

    return offers.filter(offer => offer && offer.title).slice(0, this.options.maxRecords);
  }

  async parseSalary(salaryText: string): Promise<{ salaryFrom: string; salaryTo: string; currency: string }> {
    const regex = /Estimated ([\$€£¥])?([\d\.]+[KMB]?) - ([\$€£¥])?([\d\.]+[KMB]?)/;
    const match = salaryText.match(regex);

    if (match) {
      const currency = match[1] || match[3];
      const salaryFrom = match[2];
      const salaryTo = match[4];

      return { salaryFrom, salaryTo, currency };
    }
    return { salaryFrom: 'unknown', salaryTo: 'unknown', currency: 'unknown' };
  }
}
