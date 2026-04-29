"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteVideo } from "@/app/api/videos/deleteVideo";
import cls from "./VideoDeleteButton.module.css";

type VideoDeleteButtonProps = {
  videoId: string;
  userId: string;
};

export function VideoDeleteButton({ videoId, userId }: VideoDeleteButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDeleting(true);
    const result = await deleteVideo({ userId, videoId });
    if (result.ok) {
      router.refresh();
    } else {
      setIsDeleting(false);
    }
  };

  return (
    <button
      className={cls.deleteButton}
      onClick={handleDelete}
      disabled={isDeleting}
    >
      {isDeleting ? "Deleting..." : "Delete"}
    </button>
  );
}
