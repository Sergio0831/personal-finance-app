import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

import { cn } from '@/lib/clsx';

const buttonVariants = cva(
  'inline-flex cursor-pointer items-center justify-center gap-4 whitespace-nowrap font-bold ring-offset-card transition-colors focus-visible:border-ring focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/60 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary: 'bg-foreground text-white hover:bg-gray-500 ',
        secondary:
          'border border-transparent bg-background text-foreground hover:border-foreground hover:bg-transparent ',
        outline:
          'border border-foreground bg-transparent font-normal hover:border-transparent hover:bg-beige-500 hover:text-white',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-red-400 ',
        link: 'text-foreground underline underline-offset-4 hover:text-muted ',
        ghost: 'bg-transparent text-foreground hover:text-muted ',
      },
      size: {
        sm: 'h-9 rounded-sm px-3 text-preset-3',
        lg: 'h-11 rounded-md px-8 text-preset-4',
        icon: 'h-10 w-10 rounded-md p-0',
        link: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'lg',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
