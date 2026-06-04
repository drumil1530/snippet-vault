import LoginForm from "@/features/auth/routes/login/form";

export default function LoginPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="my-4">
        <h1 className="text-3xl md:text-4xl">Login</h1>
        <p className="text-muted-foreground">
          Login to Snippet Vault to continue your journey of snippets.
        </p>
      </div>
      <LoginForm />
    </div>
  );
}
