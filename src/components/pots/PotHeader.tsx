interface PotHeaderProps {
  name: string;
  theme: string;
}

const PotHeader = ({ name, theme }: PotHeaderProps) => (
  <div className="flex items-center gap-x-4">
    <div className="size-4 rounded-full" style={{ backgroundColor: theme }} />
    <h2 className="text-preset-2">{name}</h2>
  </div>
);

export default PotHeader;
