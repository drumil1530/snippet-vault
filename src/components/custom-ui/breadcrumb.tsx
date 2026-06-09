import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/ui/breadcrumb";
import Link from "next/link";
import { Fragment } from "react";

interface AppBreadcrumbProps {
  links: { href: string; label: string }[];
  page: string;
}

export default function AppBreadcrumb(props: AppBreadcrumbProps) {
  return (
    <Breadcrumb className="mb-2">
      <BreadcrumbList>
        {props.links.map((link, i) => (
          <Fragment key={i}>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={link.href}>{link.label}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />
          </Fragment>
        ))}
        <BreadcrumbItem>
          <BreadcrumbPage>{props.page}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
