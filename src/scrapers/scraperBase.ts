import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { Browser, Page } from 'puppeteer';

puppeteer.use(StealthPlugin());

export class ScraperBase {
  protected browser: Browser | null = null;
  protected page: Page | null = null;

  async initialize(): Promise<void> {
    // @ts-ignore
    this.browser = await puppeteer.launch({ headless: false, defaultViewport: null });
    this.page = await this.browser.newPage();
  }

  async extractFromElement(element: any | null, selector: string, attribute?: string): Promise<string> {
    if (!this.page || !element) return '';
    const childElement = await element.$(selector);
    if (!childElement) return '';
    
    if (attribute) {
        return await this.page.evaluate((el: { getAttribute: (arg0: any) => any; }, attribute: any) => el.getAttribute(attribute), childElement, attribute);
    } else {
        return await this.page.evaluate((el: { textContent: string; }) => el.textContent.trim(), childElement);
    }
}

async extractFromNewPage(page: Page, selector: string): Promise<string> {
  const element = await page.$(selector);
  return element ? await page.evaluate((el: any) => el.textContent.trim(), element) : '';
}

async extractTechStackFromOffer(element: any | null, selector: string): Promise<string[]> {
    if (!this.page || !element) return [];
    const childElements = await element.$$(selector);
    return await Promise.all(childElements.map((el: any) => this.page!.evaluate((el: { textContent: string; }) => el.textContent.trim(), el)));
}

async sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async close(): Promise<void> {
  if (this.browser) {
    await this.browser.close();
  }
}
}