'use client';

import { login } from '@/features/auth/actions';
import { Button } from './ui/button';

const GitHubSignIn = () => {
  return (
    <Button variant="link" size="sm" onClick={() => login()}>
      Login with GitHub
    </Button>
  );
};

export default GitHubSignIn;
