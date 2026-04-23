import { cookies } from "next/headers";
import jsonwebtoken from "jsonwebtoken";

import { GetUserResponse, UserInfoFromToken } from "@/shared/types/api.types";
import { AUTH_COOKIE_NAME } from "@/shared/constants/cookiesNames";
import { users } from "@/app/api/db/users";

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

    const user = users.get(decodedUserInfo.username);

    if (!user) {
      return {
        ok: false,
        message: "User with this username not found",
      };
    }

    return {
      ok: true,
      user,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: "The token is out of date",
    };
  }
}
