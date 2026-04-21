import bcrypt from "bcrypt";
import { User, users } from "@/app/api/db/users";

type PostUserRequest = {
  login: string;
  password: string;
};

export type PostUserLoginResponse =
  | { ok: true; user: User }
  | { ok: false; message: string };

export async function POST(request: Request): Promise<Response> {
  const data: PostUserRequest = await request.json();

  const user = users.get(data.login);

  if (!user) {
    const res: PostUserLoginResponse = {
      ok: false,
      message: "User with this login not found",
    };

    return Response.json(res, { status: 400 });
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

  const { id, login } = user;

  const res: PostUserLoginResponse = {
    ok: true,
    user: { id, login },
  };

  return Response.json(res);
}
