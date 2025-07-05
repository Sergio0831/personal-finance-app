export const formatAmount = (amount: number): string => {
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(Math.abs(amount));

  return formatted;
};

export const formatDate = (isoDate: Date): string => {
  const date = new Date(isoDate);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};
