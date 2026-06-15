// Words that describe a field type rather than its value (e.g. "chapter 1" → order: 1).
// Dropping them lets searches like "class 9 biology chapter 1" match on the
// remaining meaningful tokens instead of failing because no field literally
// contains the word "chapter".
const SEARCH_STOPWORDS = new Set([
  'class',
  'book',
  'chapter',
  'heading',
  'subheading',
  'sub-heading',
]);

export function getSearchWords(search: string): string[] {
  const words = search.trim().split(/\s+/).filter(Boolean);
  const filtered = words.filter(word => !SEARCH_STOPWORDS.has(word.toLowerCase()));
  return filtered.length > 0 ? filtered : words;
}
