'use client';

import { useEffect, useState } from 'react';
import type { Pot as PotType } from '@/generated/prisma';
import { formatAmount } from '@/lib/format';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { Progress } from '../ui/progress';
import PotActions from './PotActions';
import PotHeader from './PotHeader';

type PotProps = Pick<PotType, 'name' | 'theme' | 'target' | 'total'>;

const Pot = ({ name, theme, target, total }: PotProps) => {
  const percentage = Math.min((total / target) * 100, 100).toFixed(2);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(+percentage), 500);
    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <Card className="flex flex-col gap-y-8">
      <CardHeader className="flex-row items-center justify-between">
        <PotHeader name={name} theme={theme} />
        <PotActions />
      </CardHeader>
      <CardContent className="flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <span className="text-muted text-preset-4">Total Saved</span>
          <span className="text-preset-1">{formatAmount(total)}</span>
        </div>
        <Progress color={theme} value={progress} />
        <div>
          <div className="flex items-center justify-between text-muted text-preset-5">
            <span className="font-bold">{percentage}%</span>
            <span>{formatAmount(target)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="gap-4">
        <Button className="w-full px-0" variant="secondary">
          + Add Money
        </Button>
        <Button className="w-full px-0" variant="secondary">
          Withdraw
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Pot;
