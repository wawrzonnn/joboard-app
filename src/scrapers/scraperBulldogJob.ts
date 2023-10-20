import { ScraperOptions, JobOffer } from './types';
import { ScraperBase } from './scraperBase';
import { ElementHandle } from 'puppeteer';
import { sub, parse, format } from 'date-fns';

export class ScraperBulldogJob extends ScraperBase {
    options: ScraperOptions;

    constructor(options: ScraperOptions) {
        super();
        this.options = options;
    }

    async sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async navigate(): Promise<void> {
        await this.sleep(1000);  // Sleep for 1 second
        if (!this.page) {
            throw new Error('Page has not been initialized. Please call initialize() first.');
        }
        const url = `https://bulldogjob.pl/companies/jobs/s/role,${this.options.searchValue}/order,published,asc`;
        try {
            await this.page.goto(url);
        } catch (error) {
            console.error('Error navigating to the page:', error);
            throw new Error('Failed to navigate to the page.');
        }
    }

    async extractLocation(offer: ElementHandle): Promise<string> {
        await this.sleep(1000);  // Sleep for 1 second
        const locationText = await this.extractFromElement(offer, 'span.group.flex.rounded-md');
        if (locationText) return locationText;
    
        return await this.extractFromElement(offer, 'div span.text-xs') || '';
    }

    async getJobOffers(): Promise<JobOffer[]> {
        await this.sleep(1000);  // Sleep for 1 second
        if (!this.browser || !this.page) {
            throw new Error('Browser has not been initialized. Please call initialize() first.');
        }

        const jobOffersLiElements = await this.page.$$('.container a.shadow-jobitem');
        const offers: JobOffer[] = [];
        for (let index = 0; index < 5; index++) {
            await this.sleep(1000);  // Sleep for 1 second
            const offer = jobOffersLiElements[index];
            if (!offer) {
                break;
            }
            const [title, company, technologies, location, jobType, seniority, image] = await Promise.all([
                this.extractFromElement(offer, 'div > h3'),
                this.extractFromElement(offer, '.text-xxs'),
                this.extractTechStackFromOffer(offer, 'span.py-2'),
                this.extractLocation(offer),
                this.extractFromElement(offer, 'div.flex.items-start > span'),
                this.extractFromElement(offer, '  div.flex.items-start:nth-of-type(3) > span'),
                this.extractFromElement(offer, 'div > div > img', 'src'),
            ]);

            let addedAt: string = '';
            let employmentType: string = '';
            let salary: string = 'Ask';
            let description: string = '';
            let city: string = '';
            let offerLink: string = '';
            try {
                await this.sleep(1000);  // Sleep for 1 second
                const offerURL = await offer.evaluate((a: { getAttribute: (arg0: any) => any; }) => a.getAttribute('href'));
                console.log(`Offer URL for element ${index + 1}:`, offerURL);
                if (offerURL && this.browser) {
                    const newPage = await this.browser.newPage();
                    await newPage.goto(offerURL, { waitUntil: 'networkidle0' });

						const baseElements = await newPage.$x('//p[contains(@class, "text-gray-300") and contains(text(), "Typ")]')

						if (baseElements.length) {
							const baseElement = baseElements[0]
							const parentDiv = await baseElement.$x('..')
							if (parentDiv.length) {
								const siblingDiv = await parentDiv[0].$x('./div[1]')
								if (siblingDiv.length) {
									const paragraph = await siblingDiv[0].$('p')
									if (paragraph) {
                                        employmentType = await newPage.evaluate((p: Element) => (p.textContent ? p.textContent.trim() : ''), paragraph)
									}
								}
							}
						}

                        offerLink = offerURL;
						const dateElements = await newPage.$x('//p[contains(@class, "text-md") and contains(text(), "2023")]')

                        if (dateElements.length) {
                            const dateElement = dateElements[0];
                            const dateString = await newPage.evaluate((p: any) => (p.textContent ? p.textContent.trim() : ''), dateElement);
                            const offerDate = parse(dateString, 'dd.MM.yyyy', new Date());  
                            const offerDateMinusOneMonth = sub(offerDate, { months: 1 });
                            addedAt = format(offerDateMinusOneMonth, 'dd.MM.yyyy'); 
						}

						const salaryElement = await newPage.$('div.jsx-651043755.mb-4 > p')
						if (salaryElement) {
                            salary = await newPage.evaluate((p: any) => (p.textContent ? p.textContent.trim() : ''), salaryElement);
						} else {
							salary = 'Ask'
						}

						const descriptionGroup = await newPage.$('#accordionGroup')
						if (descriptionGroup) {
							const elements = await descriptionGroup.$$('p, div') 
							const texts = await Promise.all(
								elements.map((element: any) => newPage.evaluate((el: { textContent: any; }) => (el.textContent ? el.textContent.trim() : ''), element))
							)

							description = texts.join(' ') 
						}

						const cityElements = await newPage.$x(
							'//p[contains(@class, "text-gray-300") and contains(text(), "Location") or contains(text(), "Lokalizacja") ]'
						)

						if (cityElements.length) {
							const cityElement = cityElements[0]
							city = await newPage.evaluate((p: { textContent: any; }) => (p.textContent ? p.textContent.trim() : ''), cityElement)
							const parentDiv = await cityElement.$x('..')
							if (parentDiv.length) {
								const siblingDiv = await parentDiv[0].$x('./div[1]')
								if (siblingDiv.length) {
									const paragraph = await siblingDiv[0].$('p')
									if (paragraph) {
										city = await newPage.evaluate((p: Element) => (p.textContent ? p.textContent.trim() : ''), paragraph)

									}
								}
							}
						}

						await newPage.close()
					}
				} catch (error) {
					console.error('error:', error)
				}

                const jobOffer: JobOffer = {
                    title,
                    company,
                    technologies,
                    location,
                    jobType,
                    seniority,
                    image,
                    addedAt,
                    employmentType,
                    salary,
                    description,
                    city,
                    offerLink
                };
    
                offers.push(jobOffer); 
            }
    
            return offers;   
        }
    }