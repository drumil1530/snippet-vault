import ProfilePageData from "@/features/user/routes/profile/page-content";
import { UserProfileSkeleton } from "@/features/user/routes/profile/skeleton";
import { Suspense } from "react";

export default function UserProfilePage(props: PageProps<"/users/[username]">) {
  return (
    <section>
      <Suspense fallback={<UserProfileSkeleton />}>
        <ProfilePageData params={props.params} />
      </Suspense>
    </section>
  );
}
