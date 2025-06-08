import { Browser, chromium, devices, BrowserContext, Page } from 'playwright'
import { IScraper } from '../interfaces/IScraper'

export class Scraper implements IScraper {
  private browser: Browser
  private context: BrowserContext
  private page: Page
  private constructor(browser: Browser, context: BrowserContext, page: Page) {
    this.browser = browser
    this.context = context
    this.page = page
  }

  static async setup(): Promise<Scraper> {
    const browser = await chromium.launch({ headless: false })
    const context = await browser.newContext(devices['iPhone 14 Pro'])
    const page = await context.newPage()

    return new Scraper(browser, context, page)
  }

  // Called for each keyword phrase. Returns the content of each web page explored.
  async search(searchTerm: string, resultsToCheck: number): Promise<string[]> {
    const searchResultPage: Page | null = await this.getSearchResults(searchTerm)
    if (searchResultPage == null) {
      return []
    }
    const links: string[] = await this.getTopLinks(searchResultPage, resultsToCheck)
    return await Promise.all(
      links.map(async (link: string) => {
        try {
          return await this.getPageContent(link)
        } catch (error) {
          console.error(`Error fetching content from ${link}:`, error)
          return ''
        }
      }),
    )
  }

  async close(): Promise<void> {
    await this.browser.close()
    await this.page.close()
    await this.browser.close()
  }

  private async getSearchResults(searchTerm: string): Promise<Page | null> {
    const url = 'https://www.bing.com/search?q=' + encodeURIComponent(searchTerm)
    const response = await this.page.goto(url)
    if (!response || !response.ok()) {
      return null
    }
    return this.page
  }

  // Extracts the top k links from the search results page.
  private async getTopLinks(searchPageResults: Page, k: number): Promise<string[]> {
    return await searchPageResults.$$eval('li.b_algo a[href]', (anchors, max) =>
      anchors.slice(0, max).map(a => (a as HTMLAnchorElement).href),
    k)
  }

  // Returns the content of the web page at the given URL.
  private async getPageContent(url: string): Promise<string> {
    const page = await this.context.newPage()
    try {
      const response = await page.goto(url, {
        timeout: 30000,
        waitUntil: 'networkidle',
      })

      if (!response || !response.ok()) {
        throw new Error(`Failed to load page: ${url}`)
      }

      await page.waitForTimeout(2000)

      // get all of the content to feed agent
      const content = await page.evaluate(() => {
        const main = document.querySelector('main, article')
        if (main) return (main as HTMLElement).innerText

        const divs = Array.from(document.querySelectorAll('div'))
        let largestDiv = divs[0] || document.body
        for (const div of divs) {
          if ((div as HTMLElement).innerText.length > (largestDiv as HTMLElement).innerText.length) {
            largestDiv = div
          }
        }
        return (largestDiv as HTMLElement).innerText || (document.body as HTMLElement).innerText
      })

      return content.trim()
    } finally {
      await page.close()
    }
  }
}
