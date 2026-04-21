import crypto from "crypto";
import bcrypt from "bcrypt";
import { z } from "zod";
import { users } from "@/app/api/db/users";

const postUserSchema = z.object({
  login: z.string().min(3).max(32).regex(/^\w+$/, "Login must contain only letters, digits, or underscores"),
  password: z.string().min(8),
});

type PostUserResponse = { ok: true } | { ok: false; message: string };

export async function POST(request: Request): Promise<Response> {
  const parsed = postUserSchema.safeParse(await request.json());

  if (!parsed.success) {
    const res: PostUserResponse = {
      ok: false,
      message: parsed.error.issues[0]?.message ?? "Invalid request body",
    };
    return Response.json(res, { status: 400 });
  }

  const { login, password } = parsed.data;

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
