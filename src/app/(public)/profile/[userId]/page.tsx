import { getUserById } from "@/app/api/users/getUserById";
import { getUsers } from "@/app/api/users/getUsers";
import { getVideos } from "@/app/api/videos/getVideos";
import { ProfileScreen } from "@/screen/ProfileScreen/ui/ProfileScreen";
import { Metadata } from "next";
import { cache } from "react";

const cachedGetUserById = cache(getUserById);
const cachedGetVideos = cache(getVideos);

type ProfilePageProps = {
  params: Promise<{ userId: string }>;
};

export async function generateMetadata({
  params,
}: ProfilePageProps): Promise<Metadata> {
  const { userId } = await params;

  try {
    const response = await cachedGetUserById({ userId });

    if (!response.ok) {
      throw new Error("No user data available");
    }

    return {
      title:
        response.user.username.charAt(0).toUpperCase() +
        response.user.username.slice(1),
    };
  } catch (error) {
    console.error(error);
    return {
      title: "Something went wrong..",
    };
  }
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { userId } = await params;

  try {
    const [userResponse, currentUserResponse] = await Promise.all([
      cachedGetUserById({ userId }),
      getUsers(),
    ]);

    if (!userResponse.ok) {
      throw new Error("No user data available");
    }

    const isOwner =
      currentUserResponse.ok && currentUserResponse.user.id === userId;

    const currentUserId = currentUserResponse.ok
      ? currentUserResponse.user.id
      : undefined;

    const videosResponse = await cachedGetVideos({ userId, currentUserId });

    return (
      <ProfileScreen
        user={userResponse.user}
        videos={videosResponse.ok ? videosResponse.data : []}
        isOwner={isOwner}
      />
    );
  } catch (error) {
    console.error(error);
    return <div>Something went wrong...</div>;
  }
}
