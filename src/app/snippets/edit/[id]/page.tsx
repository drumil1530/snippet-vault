import SnippetUpdateForm from "./form";
import { getAllLanguages } from "@/app/languages/_actions/get-languages";
import { getSnippet } from "@/app/snippets/_actions/get-snippets";
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
