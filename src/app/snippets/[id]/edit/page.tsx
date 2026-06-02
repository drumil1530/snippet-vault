import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/ui/breadcrumb";
import { appRoutes } from "@/utils/routes";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Suspense } from "react";
import { Skeleton } from "@/ui/skeleton";
import { getSnippet } from "@/features/snippet/actions";
import { getAllLanguages } from "@/features/language/actions/get-languages";
import SnippetUpdateForm from "@/features/snippet/routes/edit/form";

export const metadata: Metadata = {
  title: "Edit Snippet",
  description: "Page to edit the snippet.",
};

export default async function EditSnippetPage(props: PageProps<"/snippets/[id]/edit">) {
  return (
    <section>
      <Breadcrumb className="mb-2">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={appRoutes.home}>Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Update Snippet</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h2 className="text-3xl font-medium mb-4">Update Snippet</h2>
      <Suspense fallback={<FormSkeleton />}>
        <FormWrapper params={props.params} />
      </Suspense>
    </section>
  );
}

async function FormWrapper({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const snippetData = await getSnippet(id);

  if (!snippetData) notFound();
  const languages = await getAllLanguages();

  return <SnippetUpdateForm id={id} snippetData={snippetData} languages={languages} />;
}

function FormSkeleton() {
  return (
    <div>
      <div className="space-y-[20.5px]">
        <div>
          <Skeleton className="w-10 h-4.5 mb-2.25" />
          <Skeleton className="w-full h-8 rounded-lg" />
        </div>
        <div>
          <Skeleton className="w-18 h-4.5 mb-2.25" />
          <Skeleton className="w-full h-8 rounded-lg" />
        </div>
        <div>
          <Skeleton className="w-10 h-4.5 mb-2.25" />
          <Skeleton className="w-full h-8 rounded-lg" />
        </div>
        <div>
          <Skeleton className="w-24 h-4.5 mb-2.25" />
          <Skeleton className="w-full h-60 rounded-lg" />
        </div>
      </div>
      <div>
        <Skeleton className="w-17 h-8 rounded-lg mt-2" />
      </div>
    </div>
  );
}
