import SnippetDetail from "@/components/page-ui/snippets/details-page";
import SnippetDetailsPageSkeleton from "@/components/skeletons/snippet/details-page";
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
