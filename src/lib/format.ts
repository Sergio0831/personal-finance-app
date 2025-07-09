export function formatAmount(amount: number): string {
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(Math.abs(amount));

  return formatted;
}

export function formatDate(isoDate: Date): string {
  const date = new Date(isoDate);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function formatDueDay(day: number): string {
  if (day > 3 && day < 21) {
    return `Monthly – ${day}th`;
  }
  switch (day % 10) {
    case 1:
      return `Monthly – ${day}st`;
    case 2:
      return `Monthly – ${day}nd`;
    case 3:
      return `Monthly – ${day}rd`;
    default:
      return `Monthly – ${day}th`;
  }
}
