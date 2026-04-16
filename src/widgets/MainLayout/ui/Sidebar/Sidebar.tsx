import { Fragment } from "react";

import Link from "next/link";
import cls from "./Sidebar.module.css";
import { Home, User, PlusCircle, SquarePlay, LucideIcon } from "lucide-react";

type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  withDivider?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/", icon: Home },
  {
    label: "Profile",
    href: "/profile/:profileId",
    icon: User,
    withDivider: true,
  },
  { label: "Add Video", href: "/editor/addVideo", icon: PlusCircle },
  { label: "Your videos", href: "/video", icon: SquarePlay },
];

export function Sidebar() {
  return (
    <aside className={cls.sidebar}>
      <nav className={cls.nav}>
        {NAV_ITEMS.map((navLink) => {
          const { label, href, icon: Icon, withDivider } = navLink;

          return (
            <Fragment key={href}>
              <Link href={href} className={cls.navLink}>
                <Icon width={24} />
                {label}
              </Link>
              {withDivider && <div className={cls.divider}></div>}
            </Fragment>
          );
        })}
      </nav>
    </aside>
  );
}
