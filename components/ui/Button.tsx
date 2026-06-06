import { cn } from "@/lib/utils";
import { type ElementType } from "react";

interface PrimaryButtonProps {
  children: React.ReactNode;
  handleClick?: () => void;
  icon?: ElementType;
  leftIcon?: boolean;
  rightIcon?: boolean;
  fullWidth?: boolean;
  className?: string;
}

const PrimaryButton = ({
  children,
  handleClick,
  icon: Icon,
  rightIcon = false,
  fullWidth = false,
  className = "",
}: PrimaryButtonProps) => {
  return (
    <button
      type="button"
      className={cn("btn-primary", fullWidth ? "w-full" : "w-auto", className)}
      onClick={handleClick}
    >
      {Icon && !rightIcon && (
        <Icon className="size-5 shrink-0" aria-hidden="true" />
      )}
      {children}
      {Icon && rightIcon && (
        <Icon className="size-5 shrink-0" aria-hidden="true" />
      )}
    </button>
  );
};

export { PrimaryButton };
