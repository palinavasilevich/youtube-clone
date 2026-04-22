import Image from "next/image";
import Link from "next/link";
import { ROUTES, buildRoute } from "@/shared/constants/routes";
import cls from "./Header.module.css";

import { Plus, UserCircle } from "lucide-react";

type HeaderProps = {
  userId?: string;
};

export function Header({ userId }: HeaderProps) {
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
        {userId ? (
          <>
            <Link href={ROUTES.ADD_VIDEO} className={cls.createVideoLink}>
              <Plus width={24} height={24} /> Create
            </Link>
            <Link href={buildRoute(ROUTES.PROFILE, { profileId: userId })} className={cls.profileLink}>
              <span className={cls.hiddenText}>Profile</span>
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
