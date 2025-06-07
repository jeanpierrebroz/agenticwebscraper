import {Browser, BrowserContext, Page} from "playwright";

export interface IScraper
{
    browser: Browser;
    context: BrowserContext;
    page: Page;

    search(query: string): Promise<string>;
}
