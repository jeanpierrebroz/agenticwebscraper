import { Scraper } from "./scraper/scraper";

async function main(): Promise<void> {
    const scraper: Scraper = await Scraper.setup();
}

main();