import puppeteer from 'puppeteer-core';
import { Browser, Page } from 'puppeteer';
import chrome from 'chrome-aws-lambda';

export class ScraperBase {
  protected browser: Browser | null = null;
  protected page: Page | null = null;

  async initialize(): Promise<void> {
    const executablePath = process.env.IS_VERCEL
    ? await chrome.executablePath
    : 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';
    // @ts-ignore
    this.browser = await puppeteer.launch({
      headless: chrome.headless,
      executablePath,
      args: chrome.args,
      defaultViewport: chrome.defaultViewport,
    });
    if (this.browser) {
      this.page = await this.browser.newPage();
  } else {
      throw new Error('Browser is not initialized.');
  }
  }

  async extractFromElement(element: any | null, selector: string, attribute?: string): Promise<string> {
    if (!this.page || !element) return '';
    const childElement = await element.$(selector);
    if (!childElement) return '';
    
    if (attribute) {
        return await this.page.evaluate((el, attribute) => el.getAttribute(attribute), childElement, attribute);
    } else {
        return await this.page.evaluate(el => el.textContent.trim(), childElement);
    }
}

async extractTechStackFromOffer(element: any | null, selector: string): Promise<string[]> {
    if (!this.page || !element) return [];
    const childElements = await element.$$(selector);
    return await Promise.all(childElements.map((el: any) => this.page!.evaluate(el => el.textContent.trim(), el)));
}

async close(): Promise<void> {
  if (this.browser) {
    await this.browser.close();
  }
}
}