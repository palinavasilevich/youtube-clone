import Link from "next/link";
import cls from "./Sidebar.module.css";

const LINKS: { label: string; href: string }[] = [
  { label: "Add video", href: "/editor/addVideo" },
  { label: "Profile", href: "/profile/:videoId" },
];

export function Sidebar() {
  return (
    <aside className={cls.sidebar}>
      <nav className={cls.nav}>
        {LINKS.map(({ label, href }) => (
          <Link key={href} href={href}>
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
