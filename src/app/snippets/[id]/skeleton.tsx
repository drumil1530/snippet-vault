import { Card, CardHeader, CardContent, CardFooter } from "@/ui/card";
import { Skeleton } from "@/ui/skeleton";
import { Separator } from "@/ui/separator";

export default function SnippetDetailsPageSkeleton() {
  return (
    <Card className="w-full cursor-progress">
      <CardHeader className="gap-2 flex justify-between items-center">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-4 w-20" />
      </CardHeader>
      <Separator />
      <CardContent className="h-42 min-h-32">
        <Skeleton className="size-full" />
      </CardContent>
      <CardFooter className="bg-card justify-between">
        <div className="flex gap-2">
          <Skeleton className="w-18 h-7" />
          <Skeleton className="w-12 h-7" />
        </div>
        <Skeleton className="w-26 h-7" />
      </CardFooter>
    </Card>
  );
}
