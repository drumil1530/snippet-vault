import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyHeader as Header,
  EmptyTitle as Title,
  EmptyDescription as Description,
  EmptyContent as Content,
} from "@/ui/empty";
import { appRoutes } from "@/lib/routes";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <Empty className="min-h-full border-2 border-solid">
      <Header>
        <Title className="text-3xl font-bold font-heading">404 - Not Found</Title>
      </Header>
      <Content>
        <Description className="text-lg">
          {"The page you're looking for doesn't exist."}
        </Description>
        <Button asChild size="lg">
          <Link href={appRoutes.home}>Go to home</Link>
        </Button>
      </Content>
    </Empty>
  );
}
