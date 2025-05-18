import { Button, type ButtonProps } from "../ui/button";
import { useFormStatus } from "react-dom";

type SubmitProps = ButtonProps & {
  role?: "user" | "owner"; // optional
};

export function Submit({ children, role = "user", className = "", ...others }: SubmitProps) {
  const { pending } = useFormStatus();
  const colorVariants = {
    user: "color-primary-300 hover:bg-pink-500 text-white",
    owner: "color-secondary-300 hover:bg-green-500 text-white",
  };

  return (
    <Button type="submit" disabled={pending} className={`${colorVariants[role]} ${className}`} {...others}>
      {children}
    </Button>
  );
}
