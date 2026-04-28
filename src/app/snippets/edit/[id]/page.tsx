import SnippetUpdateForm from "@/components/forms/snippets/edit-form";
import { getSnippet } from "@/lib/actions/snippetActions";
import { notFound } from "next/navigation";

export default async function EditSnippetPage(
  props: PageProps<"/snippets/edit/[id]">,
) {
  const { id } = await props.params;
  const snippetData = await getSnippet(id);

  if (!snippetData) notFound();

  return (
    <div className="p-4">
      <SnippetUpdateForm id={id} snippetData={snippetData} />
    </div>
  );
}
