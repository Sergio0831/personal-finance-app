import { type PropsWithChildren } from 'react';

const AuthWrapper = ({ children }: PropsWithChildren<unknown>) => {
  return <div>{children}</div>;
};

export default AuthWrapper;
