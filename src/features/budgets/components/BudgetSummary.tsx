'use client';

import { Separator } from '@/components/ui/separator';
import { formatAmount } from '@/lib/format';

interface BudgetSummaryProps {
  spent: number;
  remaining: number;
  color: string;
}

const BudgetSummary = ({ spent, remaining, color }: BudgetSummaryProps) => (
  <div className="flex gap-x-4">
    <div className="flex flex-1/2 gap-x-4">
      <Separator
        className="mr-4 w-1 rounded-md"
        orientation="vertical"
        style={{ backgroundColor: color }}
      />
      <div className="grid gap-y-1">
        <span className="text-muted text-preset-5">Spent</span>
        <span className="font-bold text-preset-4">{formatAmount(spent)}</span>
      </div>
    </div>
    <div className="flex flex-1/2 gap-x-4">
      <Separator
        className="mr-4 w-1 rounded-md bg-background"
        orientation="vertical"
      />
      <div className="grid gap-y-1">
        <span className="text-muted text-preset-5">Remaining</span>
        <span className="font-bold text-preset-4">
          {formatAmount(remaining)}
        </span>
      </div>
    </div>
  </div>
);

export default BudgetSummary;
