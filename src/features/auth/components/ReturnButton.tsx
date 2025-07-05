import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

type ReturnButtonProps = {
  href: string;
  label: string;
};

const ReturnButton = ({ href, label }: ReturnButtonProps) => {
  return (
    <Button asChild className="text-white" size="sm" variant="primary">
      <Link href={href}>
        <ArrowLeftIcon /> <span>{label}</span>
      </Link>
    </Button>
  );
};

export default ReturnButton;
