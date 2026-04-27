"use client";

import { useRouter } from "next/navigation";
import { Modal, Button } from "@/shared/components";
import cls from "./EditAvatarModal.module.css";
import { uploadAvatar } from "@/app/api/users/uploadAvatar";

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
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    const result = await uploadAvatar(formData);

    if (result.ok) {
      router.refresh();
      onClose();
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Avatar">
      <form className={cls.form} action={handleSubmit}>
        <input type="hidden" name="userId" value={userId} />

        <input
          type="file"
          name="file"
          accept="image/*"
          className={cls.fileInput}
        />

        <div className={cls.actions}>
          <Button type="submit" fullWidth className={cls.btn}>
            Save
          </Button>
          <Button type="button" fullWidth className={cls.btn} onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
}
