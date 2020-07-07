export default function capitalize(word: string): string {
  const c = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  return c;
}
