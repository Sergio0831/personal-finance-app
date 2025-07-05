'use client';

import { AlertOctagon } from 'lucide-react';

import { Alert, AlertTitle } from '@/components/ui/alert';

const AuthAlert = ({ error }: { error: string }) => {
  return (
    <Alert className="mb-8" variant="destructive">
      <AlertOctagon />
      <AlertTitle>{error}</AlertTitle>
    </Alert>
  );
};

export default AuthAlert;
