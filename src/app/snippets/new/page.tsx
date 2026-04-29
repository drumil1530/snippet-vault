import SnippetCreateForm from "@/components/forms/snippets/create-form";
import { getAllLanguages } from "@/lib/actions/languageActions";

export default async function NewSnippetPage() {
  const languages = await getAllLanguages();

  return (
    <div className="p-4">
      <SnippetCreateForm languages={languages} />
    </div>
  );
}
