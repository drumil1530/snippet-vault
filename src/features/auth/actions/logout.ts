"use server";

import { auth } from "@/lib/auth";
import { appRoutes } from "@/utils/routes";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });
  } catch (error) {
    console.error(error);
  }
  redirect(appRoutes.auth.login);
}
