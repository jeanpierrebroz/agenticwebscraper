import { Browser, BrowserContext, Page } from 'playwright'

export interface IScraper {
  search(query: string, resultsToCheck: number): Promise<string[]>
}
