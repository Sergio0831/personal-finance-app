import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

interface ResponsiveModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title: string;
  description: string;
}

export const ResponsiveModal = ({
  children,
  isOpen,
  setIsOpen,
  title,
  description,
}: ResponsiveModalProps) => (
  <Dialog onOpenChange={setIsOpen} open={isOpen}>
    <DialogContent>
      <DialogHeader className="pr-4">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      {children}
    </DialogContent>
  </Dialog>
);

export default ResponsiveModal;
