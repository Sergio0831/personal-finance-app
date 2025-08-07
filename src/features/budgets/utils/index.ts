export function calculateSpent<T extends { amount?: number }>(
    transactions: T[]
): number {
    return transactions.reduce(
        (total, transaction) => total + Math.abs(transaction.amount || 0),
        0
    );
}