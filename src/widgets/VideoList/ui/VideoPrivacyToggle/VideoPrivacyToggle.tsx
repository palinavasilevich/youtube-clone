"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateVideoPrivacy } from "@/app/api/videos/updateVideoPrivacy";
import cls from "./VideoPrivacyToggle.module.css";

type VideoPrivacyToggleProps = {
  videoId: string;
  userId: string;
  isPrivate: boolean;
};

export function VideoPrivacyToggle({
  videoId,
  userId,
  isPrivate: initialIsPrivate,
}: VideoPrivacyToggleProps) {
  const router = useRouter();
  const [isPrivate, setIsPrivate] = useState(initialIsPrivate);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleChange = async () => {
    const next = !isPrivate;
    setIsPrivate(next);
    setIsUpdating(true);
    const result = await updateVideoPrivacy({ userId, videoId, isPrivate: next });
    if (result.ok) {
      router.refresh();
    } else {
      setIsPrivate(!next);
    }
    setIsUpdating(false);
  };

  return (
    <label className={cls.toggle}>
      <span className={cls.label}>{isPrivate ? "Private" : "Public"}</span>
      <div className={cls.toggleSwitch}>
        <input
          type="checkbox"
          checked={isPrivate}
          onChange={handleChange}
          disabled={isUpdating}
        />
        <span className={cls.toggleTrack} />
      </div>
    </label>
  );
}
