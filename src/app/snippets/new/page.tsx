import { appRoutes } from "@/utils/routes";
import { Metadata } from "next";
import { getAllLanguages } from "@/features/language/actions/get-languages";
import SnippetCreateForm from "@/features/snippet/routes/create/form";
import AppBreadcrumb from "@/components/custom-ui/breadcrumb";
import { getSession } from "@/features/auth/actions/session";
import { getSessionOrRedirect } from "@/utils/session";

export const metadata: Metadata = {
  title: "Create Snippet",
  description: "Create and save a new code snippet to your collection.",
};

export default async function NewSnippetPage() {
  const session = getSessionOrRedirect(await getSession());
  const languages = await getAllLanguages();

  return (
    <section>
      <AppBreadcrumb links={[{ href: appRoutes.home, label: "Home" }]} page="Create Snippet" />

      <h2 className="text-3xl font-medium mb-4">Create Snippet</h2>
      <SnippetCreateForm languages={languages} />
    </section>
  );
}
