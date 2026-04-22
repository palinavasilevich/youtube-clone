import crypto from "crypto";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { z } from "zod";
import { users } from "@/app/api/db/users";
import { cookies } from "next/headers";
import { AUTH_COOKIE_NAME } from "@/shared/constants/cookiesNames";

const postUserSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(32)
    .regex(/^\w+$/, "Login must contain only letters, digits, or underscores"),
  password: z
    .string()
    .min(3, { message: "The password must be more than 3 characters long" }),
});

export type PostUserResponse = { ok: true } | { ok: false; message: string };

export async function POST(request: Request): Promise<Response> {
  const parsed = postUserSchema.safeParse(await request.json());

  if (!parsed.success) {
    const res: PostUserResponse = {
      ok: false,
      message: parsed.error.issues[0]?.message ?? "Invalid request body",
    };
    return Response.json(res, { status: 400 });
  }

  const { username, password } = parsed.data;

  if (users.has(username)) {
    const res: PostUserResponse = {
      ok: false,
      message: "User with this username is already registered",
    };

    return Response.json(res, { status: 400 });
  }

  const id = crypto.randomBytes(16).toString("hex");
  const hashedPassword = await bcrypt.hash(password, 10);

  users.set(username, { id, username, password: hashedPassword });

  const jwt = jsonwebtoken.sign({ id, username }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });

  const cookieStore = await cookies();

  cookieStore.set(AUTH_COOKIE_NAME, jwt, {
    maxAge: 3600,
    httpOnly: true,
    secure: true,
  });

  const res: PostUserResponse = {
    ok: true,
  };

  return Response.json(res);
}
