import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/clsx';

const PotActionButton = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, className, ...props }, ref) => (
  <Button
    className={cn('w-full px-0', className)}
    ref={ref}
    variant="secondary"
    {...props}
  >
    {children}
  </Button>
));

export default PotActionButton;
