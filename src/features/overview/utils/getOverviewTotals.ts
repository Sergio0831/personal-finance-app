import type { Transaction } from '@/generated/prisma';

export function getOverviewTotals(transactions: Pick<Transaction, 'amount'>[]) {
  const income = transactions.reduce(
    (sum, tx) => (tx.amount > 0 ? sum + tx.amount : sum),
    0
  );
  const expenses = transactions.reduce(
    (sum, tx) => (tx.amount < 0 ? sum + tx.amount : sum),
    0
  );
  const balance = income + expenses;

  return {
    income,
    expenses: Math.abs(expenses),
    balance,
  };
}
