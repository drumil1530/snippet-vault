import { getSession } from "@/features/auth/actions/session";
import { AuthSession } from "@/lib/auth";
import { appRoutes } from "@/utils/routes";
import { redirect } from "next/navigation";

export function getSessionOrRedirect(session: AuthSession | null) {
  if (session) return session;
  else redirect(appRoutes.auth.login);
}

export async function goToHomeIfLoggedIn() {
  if (await getSession()) redirect(appRoutes.home);
  else return;
}
