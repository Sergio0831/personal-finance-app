'use client';

import { useEffect, useState } from 'react';
import { Progress } from '@/components/custom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import type { Budget as BudgetType } from '@/graphql/generated/output';
import { formatAmount } from '@/lib/format';
import { calculateSpent } from '../utils';
import BudgetActions from './BudgetActions';
import BudgetSummary from './BudgetSummary';
import LatestSpending from './LatestSpending';

export type BudgetProps = Pick<
  BudgetType,
  'id' | 'category' | 'theme' | 'maximum' | 'lastTransactions'
>;

const Budget = ({
  id,
  category,
  theme,
  maximum,
  lastTransactions,
}: BudgetProps) => {
  const [progress, setProgress] = useState(0);

  const spent = calculateSpent(lastTransactions);
  const remaining = maximum - spent;

  const percentage = Math.min((spent / maximum) * 100, 100).toFixed(2);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(+percentage), 500);
    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <Card className="grid gap-y-5">
      <CardHeader className="items-center justify-between space-y-0">
        <div className="flex items-center gap-x-4">
          <div
            className="size-4 rounded-full"
            style={{ backgroundColor: theme }}
          />
          <h2 className="text-preset-2">{category}</h2>
        </div>
        <BudgetActions
          category={category}
          id={id}
          maximum={maximum}
          theme={theme}
        />
      </CardHeader>
      <CardContent>
        <div className="mb-5 grid gap-y-4">
          <p className="text-muted text-preset-4">
            Maximum of {formatAmount(maximum)}
          </p>
          <Progress
            className="h-8 p-1"
            segments={[
              {
                key: 1,
                value: progress,
                color: theme,
              },
            ]}
          />
          <BudgetSummary color={theme} remaining={remaining} spent={spent} />
        </div>
        <LatestSpending
          className="gap-y-4 bg-background p-5 sm:p-5"
          title="Latest Spending"
          transactions={lastTransactions}
        />
      </CardContent>
    </Card>
  );
};

export default Budget;
