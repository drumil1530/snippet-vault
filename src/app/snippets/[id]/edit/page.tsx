import { Metadata } from "next";
import { Suspense } from "react";
import { BreadcrumbSkeleton, FormSkeleton } from "@/features/snippet/routes/edit/skeletons";
import { BreadcrumbWrapper, FormWrapper } from "@/features/snippet/routes/edit/wrappers";
import { getSessionOrRedirect } from "@/utils/session";
import { getSession } from "@/features/auth/actions/session";

export const metadata: Metadata = {
  title: "Edit Snippet",
  description: "Update an existing code snippet in your collection.",
};

export default async function EditSnippetPage(props: PageProps<"/snippets/[id]/edit">) {
  const session = getSessionOrRedirect(await getSession());

  return (
    <section>
      <Suspense fallback={<BreadcrumbSkeleton />}>
        <BreadcrumbWrapper params={props.params} />
      </Suspense>

      <h2 className="text-3xl font-medium mb-4">Update Snippet</h2>
      <Suspense fallback={<FormSkeleton />}>
        <FormWrapper params={props.params} />
      </Suspense>
    </section>
  );
}
