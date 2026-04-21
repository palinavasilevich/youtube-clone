import { MainLayout } from "@/widgets/MainLayout";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}
