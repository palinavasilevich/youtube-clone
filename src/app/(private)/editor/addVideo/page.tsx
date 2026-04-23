import { Metadata } from "next";
import { AddVideoScreen } from "@/screen/AddVideoScreen/ui/AddVideoScreen";
import withAuth from "@/shared/hoc/withAuth";
import { AuthUser } from "@/shared/types/api.types";

export const metadata: Metadata = {
  title: "Add video",
};

type Props = { user?: AuthUser };

function AddVideoPage({ user }: Props) {
  return <AddVideoScreen userId={user?.id ?? ""} />;
}

export default withAuth(AddVideoPage);
