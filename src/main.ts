import { Scraper } from './scraper/scraper'
import { OllamaQwenInference } from './llms/OllamaQwenInference';
import { FormatterAgent } from "./agents/FormatterAgent";
import { KeywordAgent } from './agents/KeywordAgent';
import { JudgeAgent } from './agents/JudgeAgent';

interface EventFormat {
  "Name": string;
  "Biography": string;
  "Notable Achievements": string;
  "Related Topics": string;
}

async function main(): Promise<void> {
  const model = new OllamaQwenInference();
  const scraper: Scraper = await Scraper.setup()

  const userQuery = 'who is Drew Ruana?'

  console.log('generating search term...')


  const resultsToCheck = 5;
  try {
    const userFormat: EventFormat = {
      "Name": "<name>",
      "Biography": "<biography>",
      "Notable Achievements": "<notable achievements>",
      "Related Topics": "<related topics>"
    };

    const keywordAgent = new KeywordAgent(model)
    const searchTerm = await keywordAgent.runTask(userQuery)
    console.log('searchTerm', searchTerm)
    console.log('searching...')
    const results: string[] = await scraper.search(searchTerm, resultsToCheck);

    console.log('formatting...')
    const formatAgent = new FormatterAgent(JSON.stringify(userFormat), model, userQuery);

    results.forEach((value, idx) => console.log(value.length));
    const formattedResults = await Promise.all(results.map(value => formatAgent.runTask(value)));

    console.log('judging...');
    const judgeAgent = new JudgeAgent(userQuery, JSON.stringify(userFormat), model);

    const judgedResults = await Promise.all(formattedResults.map(value => judgeAgent.runTask(value)));
    const filteredResults = formattedResults.filter((_, idx) => judgedResults[idx] === 'Y');

     filteredResults.forEach( value => {console.log(value)});


  } catch (error) {
    console.error('An error occurred during scraping:', error)
  } finally {
    await scraper.close()
  }
}

main()
