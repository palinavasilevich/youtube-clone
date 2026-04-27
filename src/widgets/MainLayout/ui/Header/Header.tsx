import Image from "next/image";
import Link from "next/link";
import { ROUTES, buildRoute } from "@/shared/constants/routes";
import cls from "./Header.module.css";

import { Plus, UserCircle } from "lucide-react";
import { UserAvatar } from "@/screen/ProfileScreen/ui/UserAvatar";
import { AuthUser } from "@/shared/types/api.types";

type HeaderProps = {
  user?: AuthUser;
};

export function Header({ user }: HeaderProps) {
  return (
    <header className={cls.header}>
      <Link href={ROUTES.HOME}>
        <Image
          priority
          width={93}
          height={24}
          src="/youtubeLogo.svg"
          alt="Youtube Logo Image"
        />
      </Link>

      <div className={cls.actions}>
        {user?.id ? (
          <>
            <Link href={ROUTES.ADD_VIDEO} className={cls.createVideoLink}>
              <Plus width={24} height={24} /> Create
            </Link>
            <Link
              href={buildRoute(ROUTES.PROFILE, { userId: user.id })}
              className={cls.profileLink}
            >
              <span className={cls.hiddenText}>Profile</span>
              <UserAvatar
                username={user.id}
                avatar={user.avatar}
                className={cls.avatar}
              />
            </Link>
          </>
        ) : (
          <>
            <Link href={ROUTES.LOGIN} className={cls.loginLink}>
              <UserCircle width={24} height={24} /> Sign in
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
