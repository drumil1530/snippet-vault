import RegisterForm from "@/features/auth/routes/register/form";
import { appRoutes } from "@/lib/routes";
import { getSession } from "@/features/auth/actions/session";
import { goToHomeIfLoggedIn } from "@/utils/session";
import Link from "next/link";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create an account to save, organize, and manage your code snippets.",
};

export default function RegisterPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <Suspense fallback={null}>
        <AuthCheck />
      </Suspense>
      <div>
        <h1 className="text-3xl md:text-4xl">Create Account</h1>

        <p className="text-muted-foreground">
          Create an account to start saving and organizing your snippets.
        </p>
      </div>
      <RegisterForm />
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href={appRoutes.auth.login} className="text-foreground underline underline-offset-4">
          Login
        </Link>
      </p>
    </div>
  );
}

async function AuthCheck() {
  goToHomeIfLoggedIn(await getSession());
  return null;
}
