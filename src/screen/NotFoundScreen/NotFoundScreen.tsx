import Link from "next/link";
import cls from "./NotFoundScreen.module.css";

import Image from "next/image";

export const NotFoundScreen = () => {
  return (
    <div className={cls.container}>
      <Image
        unoptimized
        width="185"
        height="174"
        src="/monkey.webp"
        alt="Page not found"
        className={cls.img}
      />

      <p>This page isn&apos;t available. Sorry about that.</p>
      <p>Try searching for something else.</p>

      <Link href="/" className={cls.link}>
        <Image
          width="145"
          height="30"
          src="/youtubeLogo.svg"
          alt="YouTube Logo"
        />
      </Link>
    </div>
  );
};
