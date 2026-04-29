import SnippetCreateForm from "./form";
import { getAllLanguages } from "@/app/languages/_actions/get-languages";

export default async function NewSnippetPage() {
  const languages = await getAllLanguages();

  return (
    <div className="p-4">
      <SnippetCreateForm languages={languages} />
    </div>
  );
}
