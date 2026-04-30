import { Card, CardContent, CardFooter, CardHeader } from "@/ui/card";
import { Separator } from "@/ui/separator";
import { Skeleton } from "@/ui/skeleton";

function SnippetSkeletonCard() {
  return (
    <Card className="w-full cursor-progress">
      <CardHeader className="gap-2 flex justify-between items-center">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-4 w-20" />
      </CardHeader>
      <Separator />
      <CardContent>
        <Skeleton className="h-42 w-full" />
      </CardContent>
      <CardFooter className="bg-card gap-2 justify-end p-2">
        <Skeleton className="w-1/5 h-7" />
      </CardFooter>
    </Card>
  );
}

export function SnippetsListSkeleton() {
  return (
    <>
      <div className="grid gap-3 grid-cols-[repeat(auto-fit,minmax(20rem,1fr))]">
        <SnippetSkeletonCard />
        <SnippetSkeletonCard />
        <SnippetSkeletonCard />
        <SnippetSkeletonCard />
        <SnippetSkeletonCard />
        <SnippetSkeletonCard />
      </div>
      <div className="max-w-60 mx-auto mt-4 mb-2">
        <Skeleton className="w-full h-9" />
      </div>
    </>
  );
}
