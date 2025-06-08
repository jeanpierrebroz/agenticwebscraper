import { IModelInference } from "../interfaces/IModelInference";

export class JudgeAgent {
    model: IModelInference
    userQuery: string
    format: string

    constructor(userQuery: string, format: string, model: IModelInference) {
        this.model = model;
        this.userQuery = userQuery;
        this.format = format;
    }

    public async runTask(context: string): Promise<string> {
        const prompt =
            `You are a quality control expert that evaluates the quality of the provided context based on the user's query and format.
You will be provided with a user's query and a format that the user expects. Your task is to evaluate the context based on these criteria.
You will return either the string "Y" if the context meets the user's expectations or "N" if it does not and nothing else. If anything but a single token is returned, the world will explode.
You will not provide any explanations or additional text, just the single token "Y" or "N". You will also make sure that the context is relevant to the user's query. This is equally if not more important than the format.
Here is the user's expected format: ${this.format}  
Here is the user's query: ${this.userQuery}
Finally, here is the context that you need to evaluate:
   ${context}
`

        return await this.model.callModel(prompt, undefined, undefined, 1);
    }
}
