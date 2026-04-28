import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

function SnippetSkeletonCard() {
  return (
    <Card className="w-full grow">
      <CardHeader className="gap-2">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-4 w-20" />
      </CardHeader>
      <Separator />
      <CardContent>
        <Skeleton className="h-30 w-full" />
      </CardContent>
      <CardFooter className="bg-card gap-2">
        <Skeleton className="w-1/4 h-9" />
        <Skeleton className="w-1/5 h-9" />
      </CardFooter>
    </Card>
  );
}

export function SnippetsListSkeleton() {
  return (
    <>
      <div className="flex flex-wrap gap-2">
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
