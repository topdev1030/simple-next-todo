import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

type AlertDialogPropTypes = {
  label: string;
  title: string;
  description: string;
  className: string;
  handler: () => void;
};

const AlertDialogDemo: React.FC<AlertDialogPropTypes> = ({
  label,
  title,
  description,
  className,
  handler,
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className={className}>{label}</button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handler}>OK</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export { AlertDialogDemo };
