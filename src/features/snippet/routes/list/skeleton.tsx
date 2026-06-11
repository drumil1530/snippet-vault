import { Card, CardContent, CardHeader } from "@/ui/card";
import { Separator } from "@/ui/separator";
import { Skeleton } from "@/ui/skeleton";

export function SnippetCardSkeleton() {
  return (
    <Card className="w-full cursor-progress">
      <CardHeader className="gap-2">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-4 w-20" />
      </CardHeader>
      <Separator />
      <CardContent>
        <Skeleton className="h-50 w-full" />
      </CardContent>
    </Card>
  );
}

export function SnippetsListSkeleton() {
  return (
    <>
      <div className="grid gap-3 grid-cols-[repeat(auto-fit,minmax(20rem,1fr))]">
        <SnippetCardSkeleton />
        <SnippetCardSkeleton />
        <SnippetCardSkeleton />
        <SnippetCardSkeleton />
        <SnippetCardSkeleton />
        <SnippetCardSkeleton />
      </div>
      <div className="max-w-60 mx-auto mt-4 mb-2">
        <Skeleton className="w-full h-9" />
      </div>
    </>
  );
}
