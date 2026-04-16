import React from "react";

import Link from "next/link";
import cls from "./Sidebar.module.css";
import { Home, User, PlusCircle, SquarePlay, LucideIcon } from "lucide-react";

type Link = {
  label: string;
  href: string;
  icon: LucideIcon;
  withDivider?: boolean;
};

const LINKS: Link[] = [
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
        {LINKS.map((link) => {
          const { label, href, icon: Icon, withDivider } = link;

          return (
            <React.Fragment key={href}>
              <Link href={href} className={cls.link}>
                <Icon width={24} />
                {label}
              </Link>
              {withDivider && <div className={cls.divider}></div>}
            </React.Fragment>
          );
        })}
      </nav>
    </aside>
  );
}
