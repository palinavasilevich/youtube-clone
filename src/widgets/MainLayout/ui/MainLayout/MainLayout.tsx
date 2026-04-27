import { AuthUser } from "@/shared/types/api.types";
import { Header } from "../Header";
import { Sidebar } from "../Sidebar";

import cls from "./MainLayout.module.css";

type MainLayoutProps = Readonly<{
  children: React.ReactNode;
}> & { user?: AuthUser };

export const MainLayout = ({ user, children }: MainLayoutProps) => {
  return (
    <div className={cls.container}>
      <Header user={user} />
      <Sidebar userId={user?.id} />
      {children}
    </div>
  );
};
