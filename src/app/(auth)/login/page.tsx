import LoginForm from "@/features/auth/routes/login/form";
import { appRoutes } from "@/lib/routes";
import { getSession } from "@/features/auth/actions/session";
import { goToHomeIfLoggedIn } from "@/utils/session";
import Link from "next/link";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to access your snippets and continue where you left off.",
};

export default async function LoginPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <Suspense fallback={null}>
        <AuthCheck />
      </Suspense>
      <div>
        <h1 className="text-3xl md:text-4xl">Login</h1>
        <p className="text-muted-foreground">
          Access your personal collection of snippets and continue where you left off.
        </p>
      </div>
      <LoginForm />
      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href={appRoutes.auth.register}
          className="text-foreground underline underline-offset-4"
        >
          Register
        </Link>
      </p>
    </div>
  );
}

async function AuthCheck() {
  goToHomeIfLoggedIn(await getSession());
  return null;
}
