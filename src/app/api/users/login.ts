"use server";

import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { cookies } from "next/headers";
import prisma from "@/shared/lib/prisma";
import { AUTH_COOKIE_NAME } from "@/shared/constants/cookiesNames";
import { AuthUser } from "@/shared/types/api.types";
import { env } from "@/shared/lib/env";

type LoginUserProps = {
  username: string;
  password: string;
};

export type PostUserLoginResponse =
  | { ok: true; user: AuthUser }
  | { ok: false; message: string };

export async function login(
  data: LoginUserProps,
): Promise<PostUserLoginResponse> {
  const user = await prisma.user.findFirst({
    where: {
      username: data.username,
    },
  });

  if (!user) {
    return {
      ok: false,
      message: "User with this username not found",
    };
  }

  try {
    const isPasswordsEqual = await bcrypt.compare(data.password, user.password);

    if (!isPasswordsEqual) {
      return {
        ok: false,
        message: "Incorrect password",
      };
    }
  } catch {
    return {
      ok: false,
      message: "Error logging in",
    };
  }

  const { id, username } = user;

  const jwt = jsonwebtoken.sign({ id, username }, env.JWT_SECRET, {
    expiresIn: "1h",
  });

  const cookieStore = await cookies();

  cookieStore.set(AUTH_COOKIE_NAME, jwt, {
    maxAge: 3600,
    httpOnly: true,
    secure: true,
  });

  return {
    ok: true,
    user: { id, username },
  };
}
