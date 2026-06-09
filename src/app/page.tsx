import { appRoutes } from "@/lib/routes";
import { redirect } from "next/navigation";

export default function ToHomePage() {
  redirect(appRoutes.home);
}
