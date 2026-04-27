import { type ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/shared/lib/css";
import { X } from "lucide-react";
import { Button } from "../Button";

import cls from "./Modal.module.css";

export type ModalProps = {
  children: ReactNode;
  isOpen: boolean;
  title: string;
  className?: string;
  onClose?: () => void;
};

export const Modal = ({
  children,
  isOpen,
  title,
  className,
  onClose,
}: ModalProps) => {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose?.();
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose?.();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const modalContent = (
    <div className={cls.backdrop} onClick={handleBackdropClick}>
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={cn(cls.modal, className)}
      >
        <header className={cls.header}>
          <h2 id="modal-title" className={cls.title}>
            {title}
          </h2>
          <Button
            onClick={onClose}
            aria-label="Close dialog"
            type="button"
            variant="withIcon"
            className={cls.closeButton}
          >
            <X width={20} height={20} />
          </Button>
        </header>
        <div className={cls.content}>{children}</div>
      </section>
    </div>
  );

  if (!isOpen) return null;
  return createPortal(modalContent, document.body);
};
