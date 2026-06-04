export function removeDashAndUppercase(value: string): string {
  return value
    .replace(/-/g, ' ')
    .replace(/\b\w/g, character => character.toUpperCase())
    .trim();
}
