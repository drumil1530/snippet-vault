import AppBreadcrumb from "@/components/custom-ui/breadcrumb";
import { appRoutes } from "@/lib/routes";
import { UserSnippetsProps } from "./page-content";

export default async function BreadcrumWrapper({ props }: UserSnippetsProps) {
  const { username } = await props.params;
  return (
    <AppBreadcrumb
      links={[
        { href: appRoutes.home, label: "Home" },
        { href: appRoutes.users(username).profile, label: `@${username}` },
      ]}
      page="Snippets"
    />
  );
}
