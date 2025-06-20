import { IModelInference } from '../interfaces/IModelInference'

export class OllamaQwenInference implements IModelInference {
  public async callModel(
    context: string,
        modelName = 'qwen3:8b',
        temperature = 0.1,
        maxTokens = 2048,
        topP = 0.95,
        frequencyPenalty = 0,
        presencePenalty = 0,
  ): Promise<string> {
    try {
      const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: modelName,
          prompt: context,
          temperature,
          max_tokens: maxTokens,
          top_p: topP,
          frequency_penalty: frequencyPenalty,
          presence_penalty: presencePenalty,
          stream: false,
          think: false,
        }),
      })

      if (!response.ok) {
        const errorData = await response.text()
        throw new Error(`Ollama API error: ${response.status} - ${errorData}`)
      }

      const data = await response.json()
      return data.response || ''
    } catch (error) {
      console.error('Error calling Ollama model:', error)
      throw error
    }
  }
}
