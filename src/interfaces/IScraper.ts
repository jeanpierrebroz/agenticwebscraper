export interface IScraper {
  search(query: string, resultsToCheck: number): Promise<string[]>
}
