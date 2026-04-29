"use client";

import { useState } from "react";
import { AuthUser, VideoInfo } from "@/shared/types/api.types";
import { VideoList } from "@/widgets/VideoList";
import { UserAvatar } from "../UserAvatar";
import { EditAvatarModal } from "../EditAvatarModal";
import cls from "./ProfileScreen.module.css";
import { Camera } from "lucide-react";

type ProfileScreenProps = {
  user: AuthUser;
  videos: VideoInfo[];
  isOwner: boolean;
};

export function ProfileScreen({ user, videos, isOwner }: ProfileScreenProps) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <>
      {isOwner && (
        <EditAvatarModal
          isOpen={isOpenModal}
          onClose={() => setIsOpenModal(false)}
          userId={user.id}
        />
      )}
      <div className={cls.container}>
        <div className={cls.header}>
          <div
            className={cls.userAvatar}
            onClick={isOwner ? () => setIsOpenModal(true) : undefined}
          >
            <UserAvatar username={user.username} avatar={user.avatar} />
            <div className={cls.iconWrapper}>
              <Camera className={cls.icon} />
            </div>
          </div>
          <div className={cls.userInfo}>
            <h1 className={cls.username}>{user.username}</h1>
            <p className={cls.videoCount}>
              {videos.length} video{videos.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
        <VideoList videos={videos} currentUserId={isOwner ? user.id : undefined} />
      </div>
    </>
  );
}
