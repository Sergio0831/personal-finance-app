const whitespaceRegex = /\s+/;

export function getInitials(name: string): string {
  if (!name?.trim()) {
    return 'U';
  }

  const initials = name
    .trim()
    .split(whitespaceRegex)
    .map((n) => n[0])
    .filter(Boolean)
    .join('')
    .toUpperCase();
  return initials;
}
