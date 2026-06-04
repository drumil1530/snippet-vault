import { AuthSession } from "@/lib/auth";
import { appRoutes } from "@/utils/routes";
import { redirect } from "next/navigation";

export async function getSessionOrRedirect(session: AuthSession | null) {
  if (session) return session;
  else redirect(appRoutes.auth.login);
}
