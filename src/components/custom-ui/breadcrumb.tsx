import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/ui/breadcrumb";
import Link from "next/link";
import { Fragment, ReactNode } from "react";

type BreadcrumbLinkItem = {
  href?: string;
  label: ReactNode;
};

interface AppBreadcrumbProps {
  links: BreadcrumbLinkItem[];
  page: string;
}

export default function AppBreadcrumb(props: AppBreadcrumbProps) {
  return (
    <Breadcrumb className="mb-3">
      <BreadcrumbList>
        {props.links.map((link, i) => (
          <Fragment key={i}>
            <BreadcrumbItem>
              {link.href ? (
                <BreadcrumbLink asChild>
                  <Link href={link.href}>{link.label}</Link>
                </BreadcrumbLink>
              ) : (
                link.label
              )}
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
