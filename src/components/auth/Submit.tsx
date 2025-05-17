import { Button, type ButtonProps } from "../ui/button";

type SubmitProps = ButtonProps & {
  role: "user" | "owner";
};

export function Submit({ children, role, className, ...others }: SubmitProps) {
  const colorVariants = {
    user: "color-primary-300 hover:bg-pink-600 text-white",
    owner: "color-secondary-300 hover:bg-green-600 text-white",
  };

  return (
    <Button type="submit" className={`${className} ${colorVariants[role]}`} {...others}>
      {children}
    </Button>
  );
}
