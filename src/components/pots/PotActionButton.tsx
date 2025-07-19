import { Button } from '../ui/button';

const PotActionButton = ({ children }: { children: React.ReactNode }) => (
  <Button className="w-full px-0" variant="secondary">
    {children}
  </Button>
);

export default PotActionButton;
