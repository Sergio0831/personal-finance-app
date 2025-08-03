'use client';

import { useEffect, useState } from 'react';
import { Progress } from '@/components/custom';
import ResponsiveModal from '@/components/custom/ResponsiveModal';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import type { Pot as PotType } from '@/generated/prisma';
import { AddMoneyToPot, WithdrawMoneyFromPot } from '.';
import PotActionButton from './PotActionButton';
import PotActions from './PotActions';
import PotHeader from './PotHeader';
import PotProgress from './PotProgress';

type PotProps = Pick<PotType, 'id' | 'name' | 'theme' | 'target' | 'total'>;

const Pot = ({ id, name, theme, target, total }: PotProps) => {
  const [isAddMoneyOpen, setIsAddMoneyOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  const percentage = Math.min((total / target) * 100, 100).toFixed(2);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(+percentage), 500);
    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <>
      <ResponsiveModal
        description="Add funds to grow your savings. Track progress toward your goal."
        isOpen={isAddMoneyOpen}
        setIsOpen={setIsAddMoneyOpen}
        title={`Add to \u2018${name}\u2019?`}
      >
        <AddMoneyToPot
          id={id}
          name={name}
          setIsOpen={setIsAddMoneyOpen}
          target={target}
          theme={theme}
          total={total}
        />
      </ResponsiveModal>
      <ResponsiveModal
        description="Take out money when you need it. Your total will update automatically."
        isOpen={isWithdrawOpen}
        setIsOpen={setIsWithdrawOpen}
        title={`Withdraw from \u2018${name}\u2019?`}
      >
        <WithdrawMoneyFromPot
          id={id}
          name={name}
          setIsOpen={setIsWithdrawOpen}
          target={target}
          theme={theme}
          total={total}
        />
      </ResponsiveModal>
      <Card className="flex flex-col gap-y-8">
        <CardHeader className="flex-row items-center justify-between">
          <PotHeader name={name} theme={theme} />
          <PotActions id={id} name={name} target={target} theme={theme} />
        </CardHeader>
        <CardContent>
          <PotProgress
            label="Total Saved"
            percentage={percentage}
            target={target}
            total={total}
          >
            <Progress
              segments={[
                {
                  key: 1,
                  value: progress,
                  color: theme,
                },
              ]}
            />
          </PotProgress>
        </CardContent>
        <CardFooter className="gap-4">
          <PotActionButton onClick={() => setIsAddMoneyOpen(true)}>
            + Add Money
          </PotActionButton>
          <PotActionButton onClick={() => setIsWithdrawOpen(true)}>
            Withdraw
          </PotActionButton>
        </CardFooter>
      </Card>
    </>
  );
};

export default Pot;
