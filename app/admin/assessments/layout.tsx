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
      <Header title="Assessments" />
      <div className="px-8">
        <Separator className="mt-2 w-[100%]" />
        <BreadcrumbView>{children}</BreadcrumbView>
      </div>
    </>
  );
}
