// Create a function to build a Set from the dictionary
async function buildDictionarySet(): Promise<Set<string>> {
  const response = await fetch("/dictionary.txt");
  const content = await response.text();
  const words = content.split("\n");
  return new Set(words);
}

const dictionarySet = await buildDictionarySet();

// Usage example:
export function checkIfWordExists(word: string): boolean {
  return (
    dictionarySet.has(word) ||
    (word.endsWith("s") && dictionarySet.has(word.slice(0, -1))) ||
    (word.endsWith("es") && dictionarySet.has(word.slice(0, -2))) ||
    (word.endsWith("e") && dictionarySet.has(word.slice(0, -1)))
  );
}

export function getRandomWord(): string {
  const dictIterator = dictionarySet.values();
  const randomIndex: number = Math.floor(Math.random() * dictionarySet.size);
  let i = 0;
  let result = dictIterator.next();
  while (i < randomIndex) {
    result = dictIterator.next();
    i++;
  }
  return result.value;
}
