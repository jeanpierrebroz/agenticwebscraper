import { IModelInference } from "../interfaces/IModelInference";

export class KeywordAgent {
  format: string
  model: IModelInference

  constructor(userFormat: string, model: IModelInference) {
    this.format = userFormat
    this.model = model
  }

  public async runTask(context: string): Promise<string> {
    const prompt =
`You are a search engine genius.

Your task is to generate keywords which will be inputted into search engines.

You will be provided a search query from a user.

The keywords you generate should capture important details about the user's query, such as date, time or location constraints.

Your entire response will be used as input to the search engine. DO NOT add any additional text or explanations. DO NOT use Markdown formatting.

The user's query is as follows:
---
${context}
`

    return await this.model.callModel(prompt);
  }
}
