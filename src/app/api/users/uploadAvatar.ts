"use server";

import { writeFile, mkdir } from "fs/promises";
import path from "path";
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
    const filename = `${userId}.${ext}`;
    const uploadsDir = path.join(process.cwd(), "public", "uploads", "avatars");

    await mkdir(uploadsDir, { recursive: true });

    const bytes = await file.arrayBuffer();
    await writeFile(path.join(uploadsDir, filename), Buffer.from(bytes));

    const avatarUrl = `/uploads/avatars/${filename}`;

    await prisma.user.update({
      where: { id: userId },
      data: { avatar: avatarUrl },
    });

    return { ok: true, url: avatarUrl };
  } catch (error) {
    console.error(error);
    return { ok: false, message: "Failed to upload avatar" };
  }
}
