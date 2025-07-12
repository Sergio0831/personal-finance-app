import type { Row } from '@tanstack/react-table';
import { formatAmount, formatDate } from '@/lib/format';

export function useTransactionInfo<TData>(row: Row<TData>) {
  const amount = Number.parseFloat(row.getValue('amount'));
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
