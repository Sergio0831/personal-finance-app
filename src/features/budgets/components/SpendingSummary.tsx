import { Fragment } from 'react';
import {
  DataList,
  DataListItem,
  DataListLabel,
  DataListValue,
} from '@/components/ui/data-list';
import { Separator } from '@/components/ui/separator';
import { formatAmount } from '@/lib/format';
import { calculateSpent } from '../utils';
import type { BudgetProps } from './Budget';

type SpendingSummaryProps = {
  budgets: BudgetProps[] | undefined;
};

const SpendingSummary = ({ budgets }: SpendingSummaryProps) => {
  return (
    <DataList>
      {budgets?.map((budget, index, array) => {
        const { id, category, theme, maximum, lastTransactions } = budget;

        const spent = calculateSpent(lastTransactions);

        return (
          <Fragment key={id}>
            <DataListItem>
              <DataListLabel className="flex items-center gap-x-2">
                <Separator
                  className="h-5 w-1 self-stretch rounded-md"
                  orientation="vertical"
                  style={{ backgroundColor: theme }}
                />
                <span className="text-muted text-preset-4">{category}</span>
              </DataListLabel>
              <DataListValue className="flex items-center gap-x-2">
                <span className="font-bold text-preset-3">
                  {formatAmount(spent)}
                </span>
                <span className="font-normal text-muted text-preset-5">
                  of {formatAmount(maximum)}
                </span>
              </DataListValue>
            </DataListItem>
            {index !== array.length - 1 && <Separator className="my-4" />}
          </Fragment>
        );
      })}
    </DataList>
  );
};

export default SpendingSummary;
