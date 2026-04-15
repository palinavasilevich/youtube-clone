import Link from "next/link";
import cls from "./NotFoundPage.module.css";

import NotFoundImage from "./notFound.png";
import Image from "next/image";

export const NotFoundPage = () => {
  return (
    <div className={cls.notFoundPage}>
      <Image width={500} src={NotFoundImage} alt="Page not found" />
      <Link href="/">Return Home</Link>
    </div>
  );
};
