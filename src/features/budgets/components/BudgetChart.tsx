'use client';

import { useMemo } from 'react';
import { Label, Pie, PieChart } from 'recharts';
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { formatAmount } from '@/lib/format';
import { calculateSpent } from '../utils';
import type { BudgetProps } from './Budget';

type BudgetChartProps = {
  budgets: BudgetProps[] | undefined;
};

const BudgetChart = ({ budgets }: BudgetChartProps) => {
  // Chart data
  const chartData = useMemo(() => {
    if (!budgets) {
      return [];
    }

    return budgets.map((budget) => ({
      category: budget.category,
      spent: calculateSpent(budget.lastTransactions),
      fill: budget.theme,
    }));
  }, [budgets]);

  // Chart config
  const chartConfig = useMemo<ChartConfig>(() => {
    if (!budgets) {
      return {};
    }

    return budgets.reduce((acc, budget) => {
      acc[budget.category] = {
        label: budget.category,
        color: budget.theme,
      };
      return acc;
    }, {} as ChartConfig);
  }, [budgets]);

  const totalSpent = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.spent, 0);
  }, [chartData]);

  const totalLimit = useMemo(() => {
    return budgets?.reduce((acc, curr) => acc + curr.maximum, 0) || 0;
  }, [budgets]);

  return (
    <div className="flex-1 pb-0">
      <ChartContainer
        className="mx-auto aspect-square max-h-70"
        config={chartConfig}
      >
        <PieChart height={240} width={240}>
          <ChartTooltip
            content={
              <ChartTooltipContent
                formatter={(value, name) => (
                  <>
                    <div
                      className="h-2.5 w-2.5 shrink-0 rounded-[2px] bg-(--color-bg)"
                      style={
                        {
                          '--color-bg': `var(--color-${name})`,
                        } as React.CSSProperties
                      }
                    />
                    {chartConfig[name as keyof typeof chartConfig]?.label ||
                      name}
                    <div className="ml-auto font-bold tabular-nums">
                      {formatAmount(+value)}
                    </div>
                  </>
                )}
                hideLabel
              />
            }
            cursor={false}
          />
          <Pie
            data={chartData}
            dataKey="spent"
            innerRadius={80}
            nameKey="category"
            strokeWidth={5}
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                  return (
                    <text
                      dominantBaseline="middle"
                      textAnchor="middle"
                      x={viewBox.cx}
                      y={viewBox.cy}
                    >
                      <tspan
                        className="fill-foreground font-bold text-3xl"
                        x={viewBox.cx}
                        y={viewBox.cy}
                      >
                        {formatAmount(totalSpent)}
                      </tspan>
                      <tspan
                        className="fill-muted-foreground"
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                      >
                        of {formatAmount(totalLimit)} limit
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
    </div>
  );
};

export default BudgetChart;
