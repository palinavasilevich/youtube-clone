import { cookies } from "next/headers";
import jsonwebtoken from "jsonwebtoken";
import { AuthUser, UserInfoFromToken } from "@/shared/types/api.types";
import { AUTH_COOKIE_NAME } from "@/shared/constants/cookiesNames";
import prisma from "@/shared/lib/prisma";

export type GetUserResponse =
  | { ok: true; user: AuthUser }
  | { ok: false; message: string };

export async function getUsers(): Promise<GetUserResponse> {
  const cookiesStore = await cookies();
  const token = cookiesStore.get(AUTH_COOKIE_NAME);

  if (!token?.value) {
    return {
      ok: false,
      message: "The token is out of date",
    };
  }

  try {
    const decodedUserInfo = jsonwebtoken.verify(
      token.value,
      process.env.JWT_SECRET!,
    ) as UserInfoFromToken;

    const user = await prisma.user.findUnique({
      where: {
        id: decodedUserInfo.id,
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
        message: "User with this username not found",
      };
    }

    return {
      ok: true,
      user: { ...user, avatar: user.avatar ?? undefined },
    };
  } catch (error) {
    console.error(error);
    const message =
      error instanceof Error && error.name === "JsonWebTokenError"
        ? "The token is out of date"
        : "Failed to authenticate user";
    return { ok: false, message };
  }
}
