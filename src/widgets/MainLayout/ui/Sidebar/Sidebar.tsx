"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ROUTES, buildRoute } from "@/shared/constants/routes";
import { Home, User, PlusCircle, SquarePlay, LogOut } from "lucide-react";
import cls from "./Sidebar.module.css";

type SidebarProps = {
  userId?: string;
};

export function Sidebar({ userId }: SidebarProps) {
  const router = useRouter();

  const onLogout = async () => {
    try {
      const response = await fetch("/api/users/logout");

      if (!response.ok) {
        throw new Error(`Logout request failed: ${response.status}`);
      }

      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <aside className={cls.sidebar}>
      <nav className={cls.nav}>
        <Link href={ROUTES.HOME} className={cls.navLink}>
          <Home width={24} />
          Home
        </Link>

        {userId && (
          <>
            <Link href={buildRoute(ROUTES.PROFILE, { profileId: userId })} className={cls.navLink}>
              <User width={24} />
              Profile
            </Link>

            <div className={cls.divider}></div>

            <Link href={ROUTES.ADD_VIDEO} className={cls.navLink}>
              <PlusCircle width={24} />
              Add Video
            </Link>

            <Link href={ROUTES.MY_VIDEOS} className={cls.navLink}>
              <SquarePlay width={24} />
              Your Videos
            </Link>

            <button className={cls.buttonNavLink} onClick={onLogout}>
              <LogOut width={24} />
              Logout
            </button>
          </>
        )}
      </nav>
    </aside>
  );
}
