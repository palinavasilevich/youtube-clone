import { cookies } from "next/headers";
import jsonwebtoken from "jsonwebtoken";
import { GetUserResponse, UserInfoFromToken } from "@/shared/types/api.types";
import { AUTH_COOKIE_NAME } from "@/shared/constants/cookiesNames";
import prisma from "@/shared/lib/prisma";

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
    return {
      ok: false,
      message: "The token is out of date",
    };
  }
}
