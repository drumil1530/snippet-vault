import { Suspense } from "react";
import UserSnippets from "./snippets";
import { SnippetsListSkeleton } from "@/features/snippet/routes/list/skeleton";
import { BreadCrumbSkeleton } from "./skeleton";
import BreadcrumWrapper from "./breadcrumb";
import { Button } from "@/ui/button";
import SnippetSearch from "@/features/snippet/routes/list/search";
import { getAllLanguages } from "@/features/language/actions/get-languages";
import { appRoutes } from "@/lib/routes";
import { Language } from "@/generated/prisma/client";

export interface UserSnippetsProps {
  props: PageProps<"/users/[username]/snippets">;
}

export default async function UserSnippetsPageData({ props }: UserSnippetsProps) {
  const languages = await getAllLanguages();

  return (
    <>
      <Suspense fallback={<BreadCrumbSkeleton />}>
        <BreadcrumWrapper props={props} />
      </Suspense>
      <div className="w-full -mt-8.5 mb-2">
        <Suspense fallback={<Button value="Loading" variant="outline" />}>
          <SearchWrapper languages={languages} props={props} />
        </Suspense>
      </div>
      <div className="py-2">
        <Suspense fallback={<SnippetsListSkeleton />}>
          <UserSnippets languages={languages} props={props} />
        </Suspense>
      </div>
    </>
  );
}

async function SearchWrapper({ languages, props }: { languages: Language[] } & UserSnippetsProps) {
  return (
    <SnippetSearch
      languages={languages}
      route={appRoutes.users((await props.params).username).snippets}
    />
  );
}
