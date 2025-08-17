import Link from 'next/link';
import { CaretRight } from '@/assets/icons';

const ViewAllLink = ({
  href,
  label = 'View All',
}: {
  href: string;
  label?: string;
}) => {
  return (
    <Link
      className="flex items-center gap-x-3 text-muted text-preset-4 transition-colors hover:text-foreground focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/60"
      href={href}
    >
      {label}
      <CaretRight className="size-3" />
    </Link>
  );
};

export default ViewAllLink;
