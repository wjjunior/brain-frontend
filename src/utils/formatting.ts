export function transformTextIntoInitials(input: string): string {
  const chunks = input.replace(/\s+/g, ' ').trim().split(' ');

  if (chunks.length <= 1) return chunks[0][0] || '';

  const first = chunks.shift();
  const last = chunks.pop();

  return (first ? first[0] : '') + (last ? last[0] : '');
}
