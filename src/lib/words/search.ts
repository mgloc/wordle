// Create a function to build a Set from the dictionary
async function buildDictionarySet(): Promise<Set<string>> {
  const response = await fetch("/dictionary.txt");
  const content = await response.text();
  const words = content.split("\n");
  return new Set(words);
}

// Usage example:
export async function checkIfWordExists(word: string): Promise<boolean> {
  const dictionarySet = await buildDictionarySet();

  return dictionarySet.has(word);
}
