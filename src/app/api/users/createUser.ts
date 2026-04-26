"use server";

import crypto from "crypto";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { z } from "zod";
import { cookies } from "next/headers";
import prisma from "@/shared/lib/prisma";
import { AUTH_COOKIE_NAME } from "@/shared/constants/cookiesNames";
import { env } from "@/shared/lib/env";

type CreateUserProps = {
  username: string;
  password: string;
};

export type PostUserResponse = { ok: true } | { ok: false; message: string };

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

export async function createUser(
  data: CreateUserProps,
): Promise<PostUserResponse> {
  const parsed = postUserSchema.safeParse(data);

  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues[0]?.message ?? "Invalid request body",
    };
  }

  const { username, password } = parsed.data;

  const user = await prisma.user.findFirst({
    where: {
      username,
    },
  });

  if (user) {
    return {
      ok: false,
      message: "User with this username is already registered",
    };
  }

  const id = crypto.randomBytes(16).toString("hex");
  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      id,
      username,
      password: hashedPassword,
    },
  });

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
  };
}
