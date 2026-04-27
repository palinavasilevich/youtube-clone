import Image from "next/image";
import cls from "./UserAvatar.module.css";
import { cn } from "@/shared/lib/css";

type UserAvatarProps = {
  avatar?: string;
  username: string;
  className?: string;
  onClick?: () => void;
};

export function UserAvatar({
  avatar,
  username,
  className,
  onClick,
}: UserAvatarProps) {
  return (
    <button className={cn(cls.avatar, className)} onClick={onClick}>
      {avatar ? (
        <Image
          src={avatar}
          alt={username}
          width={24}
          height={24}
          unoptimized
          className={cls.avatarImg}
        />
      ) : (
        <span className={cls.avatarInitial}>{username[0].toUpperCase()}</span>
      )}
    </button>
  );
}
