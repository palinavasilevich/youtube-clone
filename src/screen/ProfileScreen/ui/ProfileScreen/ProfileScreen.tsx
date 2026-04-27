"use client";

import { AuthUser, VideoInfo } from "@/shared/types/api.types";
import { VideoList } from "@/widgets/VideoList";
import cls from "./ProfileScreen.module.css";
import { UserAvatar } from "../UserAvatar";
import { EditAvatarModal } from "../EditAvatarModal";
import { useState } from "react";

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
          <UserAvatar
            username={user.username}
            avatar={user.avatar}
            onClick={isOwner ? () => setIsOpenModal(true) : undefined}
          />
          <div className={cls.userInfo}>
            <h1 className={cls.username}>{user.username}</h1>
            <p className={cls.videoCount}>
              {videos.length} video{videos.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
        <VideoList videos={videos} />
      </div>
    </>
  );
}
