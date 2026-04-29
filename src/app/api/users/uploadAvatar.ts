"use server";

import { put, del } from "@vercel/blob";
import prisma from "@/shared/lib/prisma";

type UploadAvatarProps = {
  userId: string;
  avatar: File;
};

type UploadAvatarResponse =
  | { ok: true; url: string }
  | { ok: false; message: string };

export async function uploadAvatar({
  userId,
  avatar,
}: UploadAvatarProps): Promise<UploadAvatarResponse> {
  if (!userId || typeof userId !== "string") {
    return { ok: false, message: "Missing user ID" };
  }

  if (!(avatar instanceof File) || avatar.size === 0) {
    return { ok: false, message: "No file selected" };
  }

  if (!avatar.type.startsWith("image/")) {
    return { ok: false, message: "File must be an image" };
  }

  try {
    const ext = avatar.name.split(".").pop() ?? "jpg";
    const [existingUser, blob] = await Promise.all([
      prisma.user.findUnique({
        where: { id: userId },
        select: { avatar: true },
      }),
      put(`avatars/${userId}-${Date.now()}.${ext}`, avatar, {
        access: "public",
      }),
    ]);

    if (existingUser?.avatar && existingUser.avatar !== blob.url) {
      await del(existingUser.avatar);
    }

    await prisma.user.update({
      where: { id: userId },
      data: { avatar: blob.url },
    });

    return { ok: true, url: blob.url };
  } catch (error) {
    console.error(error);
    return { ok: false, message: "Failed to upload avatar" };
  }
}
