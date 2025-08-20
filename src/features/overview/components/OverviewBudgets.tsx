import {
  DataList,
  DataListItem,
  DataListLabel,
  DataListValue,
} from '@/components/ui/data-list';
import { Separator } from '@/components/ui/separator';
import { BudgetChart } from '@/features/budgets/components';
import type { BudgetProps } from '@/features/budgets/components/Budget';
import calculateSpent from '@/features/budgets/utils';
import { formatAmount } from '@/lib/format';
import OverviewCard from './OverviewCard';

type OverviewBudgetsProps = {
  budgets?: BudgetProps[];
};

const OverviewBudgets = ({ budgets }: OverviewBudgetsProps) => {
  if (!budgets || budgets.length === 0) {
    return (
      <OverviewCard title="Budgets">
        <div className="py-4 text-center font-normal text-muted text-preset-3">
          No budgets available.
        </div>
      </OverviewCard>
    );
  }

  const displayedBudgets = budgets.slice(0, 4);

  return (
    <OverviewCard
      contentClassName="flex gap-y-4 flex-col @min-5xl:flex-row"
      href="/budgets"
      title="Budgets"
    >
      <BudgetChart budgets={displayedBudgets} />
      <DataList
        className="grid @max-5xl:grid-cols-2 gap-4"
        orientation={'vertical'}
      >
        {displayedBudgets.map((budget) => {
          const { id, category, theme, lastTransactions } = budget;

          const spent = calculateSpent(lastTransactions);

          return (
            <div className="flex items-center gap-x-4" key={id}>
              <Separator
                className="w-1 rounded-md"
                orientation="vertical"
                style={{ backgroundColor: theme }}
              />
              <DataListItem>
                <DataListLabel className="mb-1">
                  <span className="text-muted text-preset-4">{category}</span>
                </DataListLabel>
                <DataListValue>
                  <span className="font-bold text-preset-3">
                    {formatAmount(spent)}
                  </span>
                </DataListValue>
              </DataListItem>
            </div>
          );
        })}
      </DataList>
    </OverviewCard>
  );
};

export default OverviewBudgets;
