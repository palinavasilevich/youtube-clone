import { Metadata } from "next";
import { AddVideoScreen } from "@/screen/AddVideoScreen/ui/AddVideoScreen";

export const metadata: Metadata = {
  title: "Add video",
};

export default function AddVideoPage() {
  return <AddVideoScreen />;
}
