import { cookies } from "next/headers";
import jsonwebtoken from "jsonwebtoken";
import { UserInfoFromToken, users } from "../db/users";
import { AUTH_COOKIE_NAME } from "@/shared/constants/cookiesNames";
import { AuthUser } from "@/shared/types/api.types";

export type GetUserResponse =
  | { ok: true; user: AuthUser }
  | { ok: false; message: string };

export async function GET() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get(AUTH_COOKIE_NAME);

  if (!token?.value) {
    const res: GetUserResponse = {
      ok: false,
      message: "The token is out of date",
    };

    return Response.json(res, { status: 400 });
  }

  try {
    const decodedUserInfo = jsonwebtoken.verify(
      token.value,
      "process.env.JWT_SECRET",
    ) as UserInfoFromToken;

    const user = users.get(decodedUserInfo.username);

    if (!user) {
      const res: GetUserResponse = {
        ok: false,
        message: "User with this username not found",
      };

      return Response.json(res, { status: 500 });
    }

    const res: GetUserResponse = {
      ok: true,
      user,
    };

    return Response.json(res);
  } catch (error) {
    console.error(error);
    const res: GetUserResponse = {
      ok: false,
      message: "The token is out of date",
    };

    return Response.json(res, { status: 400 });
  }
}
