import type { ComponentProps, ReactNode } from "react";
import { useGetId } from "@/shared/lib/useGetId";
import cls from "./TextField.module.css";
import { cn } from "@/shared/lib/css";

export type TextFieldSize = "m" | "l";

export type TextFieldProps = {
  errorMessage?: string;
  label?: ReactNode;
  icon?: ReactNode;
  inputSize?: TextFieldSize;
} & ComponentProps<"input">;

export const TextField = ({
  className,
  errorMessage,
  id,
  icon,
  label,
  inputSize = "m",
  ...props
}: TextFieldProps) => {
  const showError = Boolean(errorMessage);
  const inputId = useGetId(id);

  return (
    <div className={cn(cls.box, className)}>
      {label && <label htmlFor={inputId}>{label}</label>}

      <div className={cls.inputWrapper}>
        {icon && <span className={cls.icon}>{icon}</span>}
        <input
          className={cn(
            cls.input,
            showError && cls.error,
            icon && cls.withIcon,
            inputSize === "l" && cls.large,
          )}
          id={inputId}
          type={"text"}
          {...props}
        />
      </div>

      {showError && <span>{errorMessage}</span>}
    </div>
  );
};
