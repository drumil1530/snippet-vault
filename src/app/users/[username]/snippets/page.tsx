import UserSnippetsPageData from "@/features/user/routes/snippets/page-content";

export default function UserSnippetsPage(props: PageProps<"/users/[username]/snippets">) {
  return (
    <>
      <UserSnippetsPageData props={props} />
    </>
  );
}
