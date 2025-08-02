import type { Row } from '@tanstack/react-table';
import { getBillStatus } from '@/lib/bill-status';
import { formatDueDay } from '@/lib/format';

export function getBillInfo<TData>(row: Row<TData>) {
  const date = new Date(row.getValue('date'));
  const day = date.getDate();
  const formattedDate = formatDueDay(day);
  const status = getBillStatus(date);

  return { date, day, formattedDate, status };
}
