import AppBreadcrumb from "@/components/custom-ui/breadcrumb";
import { getAllLanguages } from "@/features/language/actions/get-languages";
import { appRoutes } from "@/lib/routes";
import { notFound } from "next/navigation";
import { getOwnedSnippet } from "@/features/snippet/actions";
import SnippetEditForm from "./form";
import { getSessionOrRedirect } from "@/utils/session";
import { getSession } from "@/features/auth/actions/session";

interface WrapperProps {
  params: Promise<{ id: string }>;
}

export async function BreadcrumbWrapper({ params }: WrapperProps) {
  const { id } = await params;

  return (
    <AppBreadcrumb
      links={[
        { href: appRoutes.home, label: "Home" },
        { href: appRoutes.snippets.item(id).details, label: "Snippet Details" },
      ]}
      page="Edit Snippet"
    />
  );
}

export async function FormWrapper({ params }: WrapperProps) {
  const { id } = await params;
  const { user } = getSessionOrRedirect(await getSession());
  const snippetData = await getOwnedSnippet(user.id, id);

  if (!snippetData) notFound();
  const languages = await getAllLanguages();

  return <SnippetEditForm id={id} snippetData={snippetData} languages={languages} />;
}
