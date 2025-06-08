import { Scraper } from './scraper/scraper'
import { OllamaQwenInference } from './llms/OllamaQwenInference';
import {FormatterAgent} from "./agents/FormatterAgent";

interface EventFormat {
  "Name of Event": string;
  "Date": string;
  "Location": string;
  "Description": string;
}


async function main(): Promise<void> {
  const scraper: Scraper = await Scraper.setup()
  const searchTerm = 'pickleball games denver colorado May 2025'
  const resultsToCheck = 5
  try {
    const userFormat: EventFormat = {
      "Name of Event": "<name of event>",
      "Date": "<date of event in format YYYY-MM-DD>",
      "Location": "<location of event in format City, State>",
      "Description": "<description of event including any relevant details such as time, cost, and contact information>"
    };
    const results: string[] = await scraper.search(searchTerm, resultsToCheck);
    const model = new OllamaQwenInference();
    const formatAgent = new FormatterAgent(JSON.stringify(userFormat), model);
    console.log(`Top ${resultsToCheck} results for "${searchTerm}":`);
    const formattedResults =
    results.forEach(async (link, index) => {
      console.log(`${index + 1}: ${await formatAgent.runTask(link)}`);
    })
  } catch (error) {
    console.error('An error occurred during scraping:', error)
  } finally {
    await scraper.close()
  }
}

main()


