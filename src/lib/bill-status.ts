export type BillStatus = 'paid' | 'upcoming' | 'dueSoon';

export function getBillStatus(date: Date): BillStatus | undefined {
  const today = new Date();
  const todayDay = today.getDate();
  const billDay = new Date(date).getDate();

  if (billDay < todayDay) {
    return 'paid';
  }
  if (billDay <= todayDay + 3) {
    return 'dueSoon';
  }
  return 'upcoming';
}
