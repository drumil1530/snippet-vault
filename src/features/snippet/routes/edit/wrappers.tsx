import AppBreadcrumb from "@/components/app/breadcrumb";
import { getAllLanguages } from "@/features/language/actions/get-languages";
import { appRoutes } from "@/utils/routes";
import { notFound } from "next/navigation";
import { getSnippet } from "@/features/snippet/actions";
import SnippetUpdateForm from "./form";

type WrapperProps = {
  params: Promise<{ id: string }>;
};

export async function BreadcrumbWrapper({ params }: WrapperProps) {
  const { id } = await params;

  return (
    <AppBreadcrumb
      links={[
        { href: appRoutes.home, label: "Home" },
        { href: appRoutes.snippets.details(id), label: "Snippet Details" },
      ]}
      page="Update Snippet"
    />
  );
}

export async function FormWrapper({ params }: WrapperProps) {
  const { id } = await params;
  const snippetData = await getSnippet(id);

  if (!snippetData) notFound();
  const languages = await getAllLanguages();

  return <SnippetUpdateForm id={id} snippetData={snippetData} languages={languages} />;
}
