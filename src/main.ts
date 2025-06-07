import { Scraper } from "./scraper/scraper";

async function main(): Promise<void> {
    const scraper: Scraper = await Scraper.setup();
    const searchTerm: string = "pickleball events denver colorado";
    const resultsToCheck: number = 5;
    try {
        const links: string[] = await scraper.search(searchTerm, resultsToCheck);
        console.log(`Top ${resultsToCheck} links for "${searchTerm}":`);
        links.forEach((link, index) => {
            console.log(`${index + 1}: ${link}`);
        });
    } catch (error) {
        console.error("An error occurred during scraping:", error);
    } finally {
        await scraper.close();
    }
}

main();