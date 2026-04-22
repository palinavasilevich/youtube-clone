import withAuth from "@/shared/hoc/withAuth";
import { AuthUser } from "@/shared/types/api.types";
import { MainLayout } from "@/widgets/MainLayout";

type PublicLayoutProps = {
  children: React.ReactNode;
  user?: AuthUser;
};

function PublicLayout({ user, children }: PublicLayoutProps) {
  return <MainLayout userId={user?.id}>{children}</MainLayout>;
}

export default withAuth(PublicLayout);
