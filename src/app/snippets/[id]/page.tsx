import SnippetDetail from "./details";
import SnippetDetailsPageSkeleton from "./skeleton";
import { Suspense } from "react";

export default async function SnippetDetailPage(
  props: PageProps<"/snippets/[id]">,
) {
  const { id } = await props.params;

  return (
    <div className="p-4">
      <Suspense fallback={<SnippetDetailsPageSkeleton />}>
        <SnippetDetail id={id} />
      </Suspense>
    </div>
  );
}
