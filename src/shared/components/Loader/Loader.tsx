import { Loader2 } from "lucide-react";
import cls from "./Loader.module.css";

type LoaderProps = {
  size?: number;
};

export function Loader({ size = 24 }: LoaderProps) {
  return (
    <Loader2
      role="status"
      aria-label="Loading"
      size={size}
      className={cls.loader}
    />
  );
}
