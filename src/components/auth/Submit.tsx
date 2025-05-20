import { Button, type ButtonProps } from "../ui/button";
import { useFormStatus } from "react-dom";

type SubmitProps = ButtonProps & {
  role?: "user" | "owner"; // optional
};

export function Submit({ children, role = "user", className = "", ...others }: SubmitProps) {
  const { pending } = useFormStatus();
  const colorVariants = {
    user: "bg-primary-300 hover:bg-primary-400 text-white",
    owner: "bg-secondary-300 hover:bg-secondary-400 text-white",
  };

  return (
    <Button type="submit" disabled={pending} className={`${colorVariants[role]} ${className}`} {...others}>
      {children}
    </Button>
  );
}
