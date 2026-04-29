"use client";

import { Modal, Button, Loader } from "@/shared/components";
import cls from "./EditAvatarModal.module.css";
import { useUploadAvatar } from "../../lib/useUploadAvatar";

type EditAvatarModalProps = {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
};

export function EditAvatarModal({
  isOpen,
  onClose,
  userId,
}: EditAvatarModalProps) {
  const { isLoading, errors, errorMessage, register, onSubmit, onClose: handleClose } =
    useUploadAvatar(userId, onClose);

  const hasAvatarError = !!errors.avatar;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Edit Avatar">
      {isLoading ? (
        <div className={cls.loaderContainer}>
          <Loader size={48} />
        </div>
      ) : (
        <form className={cls.form} onSubmit={onSubmit}>
          <label htmlFor="avatar" className={cls.label}>
            <input
              id="avatar"
              type="file"
              accept="image/*"
              className={cls.fileInput}
              {...register("avatar")}
            />

            {hasAvatarError && (
              <p className={cls.inputErrorMessage}>{errors.avatar?.message}</p>
            )}
          </label>

          {errorMessage && !hasAvatarError && (
            <p className={cls.errorMessage}>{errorMessage}</p>
          )}

          <div className={cls.actions}>
            <Button type="submit" fullWidth className={cls.btn}>
              Save
            </Button>
            <Button
              type="button"
              fullWidth
              className={cls.btn}
              onClick={handleClose}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
