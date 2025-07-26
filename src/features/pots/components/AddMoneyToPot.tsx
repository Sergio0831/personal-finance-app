'use client';

import { type Dispatch, type SetStateAction, useState } from 'react';
import { cn } from '@/lib/clsx';
import AddMoneyToPotForm from './AddMoneyToPotForm';
import PotProgress from './PotProgress';

type AddManyToPotProps = {
  id: string;
  name: string;
  total: number;
  target: number;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  progress: number;
  theme: string;
  percantage: string;
};

const AddMoneyToPot = ({
  setIsOpen,
  total,
  target,
  progress,
  theme,
  id,
  name,
  percantage,
}: AddManyToPotProps) => {
  const [amount, setAmount] = useState(0);

  const newTotal = total + amount;
  const newPercentage = Math.min((newTotal / target) * 100, 100).toFixed(2);

  const isAdding = amount > 0;

  return (
    <>
      <PotProgress
        className={cn(isAdding && 'text-accent')}
        label="New Amount"
        percentage={newPercentage}
        progress={progress}
        target={target}
        theme={theme}
        total={newTotal}
      />
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
