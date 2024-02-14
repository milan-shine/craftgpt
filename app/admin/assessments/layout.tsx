import BreadcrumbView from "@/components/breadcrumbs/BreadcrumbView";
import Header from "@/components/headers/Header";
import { Separator } from "@/components/shadcn/ui/separator";
import React from "react";

export default function AssessmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header title="Assessment" />
      <Separator className="mt-2 w-[95%]" />
      <BreadcrumbView>{children}</BreadcrumbView>
    </>
  );
}
