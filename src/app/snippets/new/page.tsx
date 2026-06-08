import { appRoutes } from "@/utils/routes";
import { Metadata } from "next";
import { getAllLanguages } from "@/features/language/actions/get-languages";
import SnippetCreateForm from "@/features/snippet/routes/create/form";
import AppBreadcrumb from "@/components/custom-ui/breadcrumb";
import { getSessionOrRedirect } from "@/utils/session";
import { getSession } from "@/features/auth/actions/session";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Create Snippet",
  description: "Create and save a new code snippet to your collection.",
};

export default async function NewSnippetPage() {
  const languages = await getAllLanguages();

  return (
    <section>
      <Suspense fallback={null}>
        <AuthCheck />
      </Suspense>
      <AppBreadcrumb links={[{ href: appRoutes.home, label: "Home" }]} page="Create Snippet" />

      <h2 className="text-3xl font-medium mb-4">Create Snippet</h2>
      <SnippetCreateForm languages={languages} />
    </section>
  );
}

async function AuthCheck() {
  getSessionOrRedirect(await getSession());
  return null;
}
