import { appRoutes } from "@/utils/routes";
import { Metadata } from "next";
import { getAllLanguages } from "@/features/language/actions/get-languages";
import SnippetCreateForm from "@/features/snippet/routes/create/form";
import AppBreadcrumb from "@/components/app/breadcrumb";

export const metadata: Metadata = {
  title: "New Snippet",
  description: "Page to create new snippet.",
};

export default async function NewSnippetPage() {
  const languages = await getAllLanguages();

  return (
    <section>
      <AppBreadcrumb links={[{ href: appRoutes.home, label: "Home" }]} page="New Snippet" />

      <h2 className="text-3xl font-medium mb-4">Create Snippet</h2>
      <SnippetCreateForm languages={languages} />
    </section>
  );
}
