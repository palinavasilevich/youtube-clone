import { Header } from "../Header";
import { Sidebar } from "../Sidebar";

import cls from "./MainLayout.module.css";

type MainLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className={cls.container}>
      <Header profileId={"29051453"} />
      <Sidebar />
      {children}
    </div>
  );
};
