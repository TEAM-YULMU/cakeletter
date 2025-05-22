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
} from "./ui/alert-dialog";
import { Button } from "./ui/button";

type Props = {
  className?: string;
  buttonLabel: string;
  title: string;
  description?: string;
  actionLabel: string;
  onAction: () => void;
  actionClassName?: string;
};

export const DialogButton: React.FC<Props> = ({ className, buttonLabel, title, description, actionLabel, onAction, actionClassName }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className={className}>{buttonLabel}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description && <AlertDialogDescription>{description}</AlertDialogDescription>}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction className={actionClassName} onClick={onAction}>
            {actionLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
