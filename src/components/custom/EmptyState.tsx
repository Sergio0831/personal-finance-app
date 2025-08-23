import { Button } from '../ui/button';

type EmptyStateProps = {
  title?: string;
  description?: string;
  error?: boolean;
};

const EmptyState = ({
  title = 'Nothing here yet',
  description = 'There’s no data to display.',
  error = false,
}: EmptyStateProps) => {
  return (
    <main className="grid gap-y-4">
      <div>
        <h2 className="mb-2 text-preset-2">{title}</h2>
        <p className="text-muted text-preset-4">{description}</p>
      </div>
      {error && (
        <Button
          onClick={() => window.location.reload()}
          size="lg"
          type="button"
          variant="destructive"
        >
          Retry
        </Button>
      )}
    </main>
  );
};

export default EmptyState;
