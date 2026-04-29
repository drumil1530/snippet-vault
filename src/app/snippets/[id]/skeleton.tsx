import { Card, CardHeader, CardContent, CardFooter } from "@/ui/card";
import { Skeleton } from "@/ui/skeleton";
import { Separator } from "@/ui/separator";

export default function SnippetDetailsPageSkeleton() {
  return (
    <Card className="w-full">
      <CardHeader className="gap-2">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-4 w-20" />
      </CardHeader>
      <Separator />
      <CardContent className="min-h-32">
        <Skeleton className="w-full" />
      </CardContent>
      <CardFooter className="bg-card">
        <Skeleton className="w-20 h-8" />
      </CardFooter>
    </Card>
  );
}
