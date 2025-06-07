import {Browser, chromium, devices, BrowserContext, Page} from "playwright";
import { IScraper } from "../interfaces/IScraper"

export class Scraper implements IScraper
{
    browser!: Browser;
    context!: BrowserContext;
    page!: Page;
    constructor() {}

    static async setup(): Promise<Scraper>
    {
        const scraper = new Scraper();

        scraper.browser = await chromium.launch();
        scraper.context = await scraper.browser.newContext(devices['iPhone 14 Pro'])
        scraper.page = await scraper.context.newPage();

        return scraper;
    }



    async search(searchTerm: string): Promise<string>
    {

        return '';
    }

}