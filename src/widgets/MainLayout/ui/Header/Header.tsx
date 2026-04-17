import Image from "next/image";
import Link from "next/link";
import cls from "./Header.module.css";

import { Plus } from "lucide-react";

type HeaderProps = {
  profileId: string;
};

export function Header({ profileId }: HeaderProps) {
  return (
    <header className={cls.header}>
      <Link href="/">
        <Image
          priority
          width={93}
          height={24}
          src="/youtubeLogo.svg"
          alt="Youtube Logo Image"
        />
      </Link>

      <div className={cls.links}>
        <Link href={`/editor/addVideo`} className={cls.createVideoLink}>
          <Plus width={24} height={24} /> Create
        </Link>

        <Link href={`/profile/${profileId}`} className={cls.profileLink}>
          <span className={cls.hiddenText}>Profile</span>
        </Link>
      </div>
    </header>
  );
}
