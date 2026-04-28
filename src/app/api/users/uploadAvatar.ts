"use server";

import { put } from "@vercel/blob";
import prisma from "@/shared/lib/prisma";

type UploadAvatarResponse = { ok: true; url: string } | { ok: false; message: string };

export async function uploadAvatar(formData: FormData): Promise<UploadAvatarResponse> {
  const userId = formData.get("userId") as string;
  const file = formData.get("file") as File | null;

  if (!userId) {
    return { ok: false, message: "Missing user ID" };
  }

  if (!file || file.size === 0) {
    return { ok: false, message: "No file selected" };
  }

  if (!file.type.startsWith("image/")) {
    return { ok: false, message: "File must be an image" };
  }

  try {
    const ext = file.name.split(".").pop();
    const blob = await put(`avatars/${userId}.${ext}`, file, {
      access: "public",
      allowOverwrite: true,
    });

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
