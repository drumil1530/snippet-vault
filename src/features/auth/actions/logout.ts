"use server";

import { auth } from "@/lib/auth";
import { appRoutes } from "@/lib/routes";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
  await auth.api.signOut({
    headers: await headers(),
  });

  redirect(appRoutes.auth.login);
}
