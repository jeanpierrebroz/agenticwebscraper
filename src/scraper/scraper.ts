import {Browser, chromium, devices, BrowserContext, Page, Response} from "playwright";
import { IScraper } from "../interfaces/IScraper"

export class Scraper implements IScraper
{
    private browser: Browser;
    private context: BrowserContext;
    private page: Page;
    private constructor(browser: Browser, context: BrowserContext, page: Page) {
        this.browser = browser;
        this.context = context;
        this.page = page;
    }

    static async setup(): Promise<Scraper>
    {

        const browser = await chromium.launch();
        const context = await browser.newContext(devices['iPhone 14 Pro'])
        const page = await context.newPage();

        return new Scraper(browser, context, page);
    }

    //Called for each keyword phrase
    async search(searchTerm: string): Promise<string[]>
    {
        var result: string[] = [];
        var searchResults: Response | null = await this.getWebsiteResults(searchTerm);
        if (searchResults == null)
        {
            return [];
        }

        return result;
    }

    async close(): Promise<void>
    {
        await this.browser.close();
        await this.page.close();
        await this.browser.close();
    }

    private async getWebsiteResults(searchTerm: string): Promise<Response | null>
    {
        var url: string = "https://www.bing.com/search?q=" + searchTerm;
        var response = await this.page.goto(url);
        return response;
    }

}