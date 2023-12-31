// import puppeteer from 'puppeteer-extra';
// import StealthPlugin from 'puppeteer-extra-plugin-stealth';
// import { Browser, Page } from 'puppeteer';

// import chromium from "@sparticuz/chromium"
// puppeteer.use(StealthPlugin());
// // import chromium from 'chrome-aws-lambda';
// export class ScraperBase {
//   protected browser: Browser | null = null;
//   protected page: Page | null = null;

//   async initialize(): Promise<void> {
//     // @ts-ignore




// //lokalnie
//     // this.browser = await puppeteer.launch({ headless: true, defaultViewport: null });



// zdalnie
//     const browser = await puppeteer.launch({
//       args: chromium.args,
//       defaultViewport: chromium.defaultViewport,
//       executablePath: await chromium.executablePath(),
//       headless: chromium.headless,
//       ignoreHTTPSErrors: true,
//     });
//     this.browser = browser;
    

    




//     if (this.browser) {
//       this.page = await this.browser.newPage();
//     }
//   }

import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';
import { Browser, Page } from 'puppeteer-core';

export class ScraperBase {
  protected browser: Browser | null = null;
  protected page: Page | null = null;

  async initialize(): Promise<void> {
    this.browser = await puppeteer.launch({
      args: [...chromium.args, '--hide-scrollbars', '--disable-web-security'],
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });

    if (this.browser) {
      this.page = await this.browser.newPage();
    }
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