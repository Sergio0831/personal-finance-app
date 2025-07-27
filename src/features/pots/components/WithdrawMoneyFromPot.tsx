'use client';

import { type Dispatch, type SetStateAction, useState } from 'react';
import { Progress } from '@/components/custom';
import { cn } from '@/lib/clsx';
import PotProgress from './PotProgress';
import WithdrawFromPotForm from './WithdrawFromPotForm';

type WithdrawMoneyFromPotProps = {
  id: string;
  name: string;
  total: number;
  target: number;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  progress: number;
  theme: string;
  percantage: string;
};

const WithdrawMoneyFromPot = ({
  setIsOpen,
  total,
  target,
  theme,
  id,
  name,
}: WithdrawMoneyFromPotProps) => {
  const [amount, setAmount] = useState(0);

  const newTotal = Math.max(total - amount, 0);
  const oldPercentage = Math.min((total / target) * 100, 100);
  const removedPercentage = Math.min((amount / target) * 100, 100);
  const newPercentage = Math.max(oldPercentage - removedPercentage, 0);

  return (
    <>
      <PotProgress
        className={cn(amount > 0 && 'text-destructive')}
        label="New Amount"
        percentage={newPercentage.toFixed(2)}
        target={target}
        total={newTotal}
      >
        <Progress
          segments={[
            {
              key: 1,
              value: newPercentage,
              color: theme,
            },
            {
              key: 2,
              value: removedPercentage,
              color: 'var(--destructive)',
            },
          ]}
        />
      </PotProgress>
      <WithdrawFromPotForm
        id={id}
        name={name}
        onAmountChange={setAmount}
        setIsOpen={setIsOpen}
      />
    </>
  );
};

export default WithdrawMoneyFromPot;
