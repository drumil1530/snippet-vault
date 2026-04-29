import SnippetUpdateForm from "@/components/forms/snippets/edit-form";
import { getAllLanguages } from "@/lib/actions/languageActions";
import { getSnippet } from "@/lib/actions/snippetActions";
import { notFound } from "next/navigation";

export default async function EditSnippetPage(
  props: PageProps<"/snippets/edit/[id]">,
) {
  const { id } = await props.params;
  const snippetData = await getSnippet(id);

  if (!snippetData) notFound();
  const languages = await getAllLanguages();

  return (
    <div className="p-4">
      <SnippetUpdateForm
        id={id}
        snippetData={snippetData}
        languages={languages}
      />
    </div>
  );
}
