import { IModelInference} from "../interfaces/IModelInference";

export class FormatterAgent {
  format: string
  model: IModelInference
  userPrompt: string

  constructor(userFormat: string, model: IModelInference, userPrompt: string) {
    this.format = userFormat
    this.model = model
    this.userPrompt = userPrompt
  }

  public async runTask(context: string): Promise<string> {
    //
    const prompt = `You are a formatter agent. Your task is to format the following text according to the user's specified format: "${this.format}" based on the user's question: "${this.userPrompt}" It is IMPERATIVE
    That you do not add any additional text or explanations, just the formatted text itself. You can infer the format from the context, 
    but do not add any additional information or explanations. Do not make any assumptions about the format, 
    just follow the user's specified format. Do not make any information up. Try to keep each field as brief as possible while still conveying the necessary information. Ensure you don't format information that doesn't match up with the specifications the user gives. The text is as follows:\n\n${context}\n\nPlease return the formatted text.`;

    return await this.model.callModel(prompt);
  }
}