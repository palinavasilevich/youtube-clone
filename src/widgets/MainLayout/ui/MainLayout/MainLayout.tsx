import { Header } from "../Header";
import { Sidebar } from "../Sidebar";

import cls from "./MainLayout.module.css";

type MainLayoutProps = Readonly<{
  children: React.ReactNode;
}> & { userId?: string };

export const MainLayout = ({ userId, children }: MainLayoutProps) => {
  return (
    <div className={cls.container}>
      <Header userId={userId} />
      <Sidebar userId={userId} />
      {children}
    </div>
  );
};
