import withAuth from "@/shared/hoc/withAuth";
import { AuthUser } from "@/shared/types/api.types";
import { MainLayout } from "@/widgets/MainLayout";

type PrivateLayoutProps = {
  children: React.ReactNode;
  user?: AuthUser;
};

function PrivateLayout({ user, children }: PrivateLayoutProps) {
  return <MainLayout user={user}>{children}</MainLayout>;
}

export default withAuth(PrivateLayout);
