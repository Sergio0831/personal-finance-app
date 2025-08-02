'use client';

import { type Dispatch, type SetStateAction, useState } from 'react';
import { Progress } from '@/components/custom';
import { cn } from '@/lib/clsx';
import AddMoneyToPotForm from './AddMoneyToPotForm';
import PotProgress from './PotProgress';

type AddMoneyToPotProps = {
  id: string;
  name: string;
  total: number;
  target: number;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  theme: string;
};

const AddMoneyToPot = ({
  setIsOpen,
  total,
  target,
  theme,
  id,
  name,
}: AddMoneyToPotProps) => {
  const [amount, setAmount] = useState(0);

  const newTotal = total + amount;
  const oldPercentage = Math.min((total / target) * 100, 100);
  const addedPercentage = Math.min((amount / target) * 100, 100);

  return (
    <>
      <PotProgress
        className={cn(amount > 0 && 'text-accent')}
        label="New Amount"
        percentage={(oldPercentage + addedPercentage).toFixed(2)}
        target={target}
        total={newTotal}
      >
        <Progress
          segments={[
            {
              key: 1,
              value: oldPercentage,
              color: theme,
            },
            {
              key: 2,
              value: addedPercentage,
              color: 'var(--accent)',
            },
          ]}
        />
      </PotProgress>
      <AddMoneyToPotForm
        id={id}
        name={name}
        onAmountChange={setAmount}
        setIsOpen={setIsOpen}
      />
    </>
  );
};

export default AddMoneyToPot;
