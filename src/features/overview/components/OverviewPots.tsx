import { IconPot } from '@/assets/icons';
import { Separator } from '@/components/ui/separator';
import type { PotProps } from '@/features/pots/components/Pot';
import { formatAmount } from '@/lib/format';
import OverviewCard from './OverviewCard';

type PotPropsPartial = Pick<PotProps, 'id' | 'name' | 'theme' | 'total'>;

type OverviewPotsProps = {
  pots?: PotPropsPartial[];
};

const OverviewPots = ({ pots }: OverviewPotsProps) => {
  if (!pots || pots.length === 0) {
    return (
      <OverviewCard className="col-span-12" title="Pots">
        <div className="py-4 text-center font-normal text-muted text-preset-3">
          No pots available.
        </div>
      </OverviewCard>
    );
  }

  const displayedPots = pots.slice(0, 4);
  const totalSaved = pots.reduce((sum, pot) => sum + pot.total, 0) ?? 0;

  return (
    <OverviewCard
      className="col-span-12 gap-6"
      contentClassName="flex flex-wrap gap-5"
      href="/pots"
      title="Pots"
    >
      <div className="flex flex-1 items-center gap-x-4 rounded-xl bg-background p-4">
        <IconPot className="size-10" />
        <div>
          <h3 className="mb-3 text-muted text-preset-4">Total Saved</h3>
          <span className="text-preset-1">
            {formatAmount(totalSaved, false)}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {displayedPots.map((pot) => (
          <div className="flex flex-1/2 gap-x-4" key={pot.id}>
            <Separator
              className="mr-4 w-1 rounded-md"
              orientation="vertical"
              style={{ backgroundColor: pot.theme }}
            />
            <div className="grid gap-y-1">
              <span className="text-muted text-preset-5">{pot.name}</span>
              <span className="font-bold text-preset-4">
                {formatAmount(pot.total, false)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </OverviewCard>
  );
};

export default OverviewPots;
