export interface IModelInference {
  callModel(
    context: string,
    modelName?: string,
    temperature?: number,
    maxTokens?: number,
    topP?: number,
    frequencyPenalty?: number,
    presencePenalty?: number): Promise<string>
}
