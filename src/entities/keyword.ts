export const commonModifiers = ["online", "free", "beautiful"];

export function createKeywords(base: string, modifiers: Array<string>) {
  return [base, ...modifiers.map((modifier) => `${modifier} ${base}`)];
}
