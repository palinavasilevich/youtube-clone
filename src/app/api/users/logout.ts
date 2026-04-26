"use server";

import { cookies } from "next/headers";
import { AUTH_COOKIE_NAME } from "@/shared/constants/cookiesNames";

export async function logout() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get(AUTH_COOKIE_NAME);

  if (!token?.value) {
    return { ok: true };
  }

  cookiesStore.delete(AUTH_COOKIE_NAME);

  return { ok: true };
}
