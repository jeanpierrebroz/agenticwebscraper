import { IModelInference} from "../interfaces/IModelInference";

export class FormatterAgent {
  format: string
  model: IModelInference

  constructor(userFormat: string, model: IModelInference) {
    this.format = userFormat
    this.model = model
  }

  public async runTask(context: string): Promise<string> {
    //
    const prompt = `You are a formatter agent. Your task is to format the following text according to the user's specified format: "${this.format}". The text is as follows:\n\n${context}\n\nPlease return the formatted text. It is IMPERATIVE
    That you do not add any additional text or explanations, just the formatted text itself. You can infer the format from the context, 
    but do not add any additional information or explanations. Do not make any assumptions about the format, 
    just follow the user's specified format. Do not make any information up. Try to keep each field as brief as possible while still conveying the necessary information.`;

    return await this.model.callModel(prompt);
  }
}