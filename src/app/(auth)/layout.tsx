type Props = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  return (
    <main>
      <div>
        <h1>Logo</h1>
        
      </div>
      <div>{children}</div>
    </main>
  );
};

export default AuthLayout;
