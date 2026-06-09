import { AuthSession } from "@/lib/auth";
import { appRoutes } from "@/utils/routes";
import { redirect } from "next/navigation";

export function getSessionOrRedirect(session: AuthSession | null) {
  if (session) return session;
  else redirect(appRoutes.auth.login);
}

export function goToHomeIfLoggedIn(session: AuthSession | null) {
  if (session) redirect(appRoutes.home);
  else return;
}
