import Image from "next/image";
import Link from "next/link";
import cls from "./Header.module.css";

import LogoImage from "./logo.png";

export function Header() {
  return (
    <header className={cls.header}>
      <Link href="/">
        <Image width={40} src={LogoImage} alt="Youtube Logo Image" />
      </Link>
    </header>
  );
}
