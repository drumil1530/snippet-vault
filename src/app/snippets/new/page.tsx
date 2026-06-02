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
import { Metadata } from "next";
import { getAllLanguages } from "@/features/language/actions/get-languages";
import SnippetCreateForm from "@/features/snippet/routes/create/form";

export const metadata: Metadata = {
  title: "New Snippet",
  description: "Page to create new snippet.",
};

export default async function NewSnippetPage() {
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
            <BreadcrumbPage>New Snippet</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h2 className="text-3xl font-medium mb-4">Create Snippet</h2>
      <SnippetCreateForm languages={languages} />
    </section>
  );
}
