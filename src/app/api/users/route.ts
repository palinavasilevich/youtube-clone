import crypto from "crypto";
import bcrypt from "bcrypt";
import { users } from "@/app/api/db/users";

type PostUserRequest = {
  login: string;
  password: string;
};

type PostUserResponse = { ok: true } | { ok: false; message: string };

export async function POST(request: Request): Promise<Response> {
  const { login, password }: PostUserRequest = await request.json();

  if (users.has(login)) {
    const res: PostUserResponse = {
      ok: false,
      message: "User with this login is already registered",
    };

    return Response.json(res, { status: 400 });
  }

  const id = crypto.randomBytes(16).toString("hex");
  const hashedPassword = await bcrypt.hash(password, 10);

  users.set(login, { id, login, password: hashedPassword });

  const res: PostUserResponse = { ok: true };

  return Response.json(res);
}
