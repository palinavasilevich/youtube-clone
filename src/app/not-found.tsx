import { Metadata } from "next";
import { NotFoundScreen } from "@/screen/NotFoundScreen";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return <NotFoundScreen />;
}
