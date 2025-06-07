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

    //Called for each keyword phrase. Returns the content of each web page explored.
    async search(searchTerm: string, resultsToCheck: number): Promise<string[]>
    {
        var searchResultPage: Page | null = await this.getSearchResults(searchTerm);
        if (searchResultPage == null)
        {
            return [];
        }
        var links: string[] = await this.getTopLinks(searchResultPage, resultsToCheck);

        return links;
    }

    async close(): Promise<void>
    {
        await this.browser.close();
        await this.page.close();
        await this.browser.close();
    }


    private async getSearchResults(searchTerm: string): Promise<Page | null> {
        const url = "https://www.bing.com/search?q=" + encodeURIComponent(searchTerm);
        const response = await this.page.goto(url);
        if (!response || !response.ok()) {
            return null;
        }
        return this.page;
    }

    //Extracts the top k links from the search results page.
    private async getTopLinks(searchPageResults: Page, k: number): Promise<string[]>
    {
        const links: string[] = await searchPageResults.$$eval('li.b_algo a[href]', (anchors, max) =>
                anchors.slice(0, max).map(a => (a as HTMLAnchorElement).href),
            k);

        return links;
    }
}