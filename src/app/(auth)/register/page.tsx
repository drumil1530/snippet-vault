import RegisterForm from "@/features/auth/routes/register/form";

export default function RegisterPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="my-4">
        <h1 className="text-3xl md:text-4xl">Register user</h1>
        <p className="text-muted-foreground">
          Register to Snippet Vault to access world of snippets.
        </p>
      </div>
      <RegisterForm />
    </div>
  );
}
