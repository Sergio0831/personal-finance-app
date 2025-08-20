import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/clsx';
import { formatAmount } from '@/lib/format';

export type OverviewCard = {
  title: string;
  value: number;
};

type OverviewSummaryCardsProps = {
  className?: string;
  overviewCards: OverviewCard[];
};

const OverviewSummaryCards = ({
  className,
  overviewCards,
}: OverviewSummaryCardsProps) => {
  return (
    <div
      className={cn(
        'col-span-12 mb-8 grid @min-2xl:grid-flow-col gap-6',
        className
      )}
    >
      {overviewCards.map((card, index) => (
        <Card
          className={cn('sm:p-6', index === 0 && 'bg-foreground text-white')}
          key={card.title + card.value}
        >
          <CardTitle className="mb-4">
            <h2 className="text-preset-4">{card.title}</h2>
          </CardTitle>
          <CardContent>
            <p className="text-preset-1">{formatAmount(card.value)}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default OverviewSummaryCards;
