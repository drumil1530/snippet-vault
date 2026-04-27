import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "@/components/ui/empty";
import { appRoutes } from "@/utils/routes";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <Empty className="min-h-[calc(100vh-5rem)] border-2 border-solid">
      <EmptyHeader>
        <EmptyTitle className="text-3xl font-bold font-heading">
          404 - Not Found
        </EmptyTitle>
      </EmptyHeader>
      <EmptyContent>
        <EmptyDescription className="text-lg">
          The page you're looking for doesn't exist.
        </EmptyDescription>
        <Button asChild size={"lg"}>
          <Link href={appRoutes.home}>Go to home</Link>
        </Button>
      </EmptyContent>
    </Empty>
  );
}
