"use server";

import prisma from "@/shared/lib/prisma";
import { AuthUser } from "@/shared/types/api.types";

type GetUserByIdProps = {
  userId: string;
};

type GetUserByIdResponse =
  | { ok: true; user: AuthUser }
  | { ok: false; message: string };

export async function getUserById({
  userId,
}: GetUserByIdProps): Promise<GetUserByIdResponse> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      omit: {
        password: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return {
        ok: false,
        message: "User not found",
      };
    }

    return {
      ok: true,
      user: { ...user, avatar: user.avatar ?? undefined },
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: "Failed to fetch user",
    };
  }
}
