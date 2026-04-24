import { cookies } from "next/headers";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { getUsersData } from "@/app/api/db/blobUsers";
import { AUTH_COOKIE_NAME } from "@/shared/constants/cookiesNames";
import { AuthUser } from "@/shared/types/api.types";
import { env } from "@/shared/lib/env";

type PostUserRequest = {
  username: string;
  password: string;
};

export type PostUserLoginResponse =
  | { ok: true; user: AuthUser }
  | { ok: false; message: string };

export async function POST(request: Request): Promise<Response> {
  const data: PostUserRequest = await request.json();
  const users = await getUsersData();

  const user = users.get(data.username);

  if (!user) {
    const res: PostUserLoginResponse = {
      ok: false,
      message: "User with this username not found",
    };

    return Response.json(res, { status: 500 });
  }

  try {
    const isPasswordsEqual = await bcrypt.compare(data.password, user.password);

    if (!isPasswordsEqual) {
      const res: PostUserLoginResponse = {
        ok: false,
        message: "Incorrect password",
      };

      return Response.json(res, { status: 400 });
    }
  } catch {
    const res: PostUserLoginResponse = {
      ok: false,
      message: "Error logging in",
    };

    return Response.json(res, { status: 500 });
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

  const res: PostUserLoginResponse = {
    ok: true,
    user: { id, username },
  };

  return Response.json(res);
}
