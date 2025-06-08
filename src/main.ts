import { Scraper } from './scraper/scraper'
import { OllamaQwenInference } from './llms/OllamaQwenInference';
import {FormatterAgent} from "./agents/FormatterAgent";

interface EventFormat {
  "Name of Restaurant": string;
  "Date": string;
  "Location": string;
  "Description": string;
}


async function main(): Promise<void> {
  const scraper: Scraper = await Scraper.setup()
  const searchTerm = 'thai restaurants in golden, colorado'
  const resultsToCheck = 5
  try {
    const userFormat: EventFormat = {
      "Name of Restaurant": "<name of event>",
      "Date": "<date of event in format YYYY-MM-DD>",
      "Location": "<location of event in format City, State>",
      "Description": "Anything you can find about the restaurant, including specialties, and any other relevant information."
    };
    const results: string[] = await scraper.search(searchTerm, resultsToCheck);
    const model = new OllamaQwenInference();
    results.forEach((text, index) => {console.log(`${text.length}`)})
    const formatAgent = new FormatterAgent(JSON.stringify(userFormat), model, searchTerm);
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


