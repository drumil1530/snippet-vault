import SnippetUpdateForm from "./form";
import { getAllLanguages } from "@/app/languages/_actions/get-languages";
import { getSnippet } from "@/app/snippets/_actions/get-snippets";
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

export const metadata: Metadata = {
  title: "Edit Snippet",
  description: "Page to edit the snippet.",
};

export default async function EditSnippetPage(props: PageProps<"/snippets/[id]/edit">) {
  const { id } = await props.params;
  const snippetData = await getSnippet(id);

  if (!snippetData) notFound();
  const languages = await getAllLanguages();

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
      <SnippetUpdateForm id={id} snippetData={snippetData} languages={languages} />
    </section>
  );
}
