'use client';

import { ViewAllLink } from '@/components/custom';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/clsx';

type OverviewCardProps = {
  children: React.ReactNode;
  title: string;
  href: string;
  className?: string;
  contentClassName?: string;
};

const OverviewCard = ({
  children,
  title,
  href,
  className,
  contentClassName,
}: OverviewCardProps) => {
  return (
    <Card className={cn('', className)}>
      <CardTitle className="flex justify-between">
        <h2 className="text-preset-2">{title}</h2>
        <ViewAllLink href={href} />
      </CardTitle>
      <CardContent className={cn('', contentClassName)}>{children}</CardContent>
    </Card>
  );
};

export default OverviewCard;
