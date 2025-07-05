'use client';

import { Toaster as Sonner, type ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      style={
        {
          '--success-bg': 'var(--toast)',
          '--success-text': 'var(--toast-foreground)',
          '--success-border': 'var(--toast-border)',
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
