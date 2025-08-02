import type { Row } from '@tanstack/react-table';
import { formatAmount, formatDate } from '@/lib/format';

export function getTransactionInfo<TData>(row: Row<TData>) {
  const amountValue = row.getValue('amount');
  const amount = Number.parseFloat(String(amountValue ?? 0));

  const isPositive = amount > 0;
  const formattedAmount = isPositive
    ? `+${formatAmount(amount)}`
    : `-${formatAmount(amount)}`;

  const formattedDate = formatDate(row.getValue('date'));

  return {
    amount,
    isPositive,
    formattedAmount,
    formattedDate,
  };
}
