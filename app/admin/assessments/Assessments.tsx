"use client";

import React from "react";
import AdminContainer from "@/components/containers/AdminContainer";
import Header from "@/components/headers/Header";
import { Button } from "@/components/shadcn/ui/button";
import { Separator } from "@/components/shadcn/ui/separator";
import { useRouter } from "next/navigation";
import ModelList from "../assessment-models/ModelList";
import BreadcrumbView from "@/components/breadcrumbs/BreadcrumbView";
import AssessmentList from "./AssessmentList";

const Assessments: React.FC<{ initialAssessmentsList: any }> = ({
  initialAssessmentsList,
}) => {
  const router = useRouter();

  return (
    <div>
      {/* <BreadcrumbView> */}
      <Header title="Assessment List" />
      <Separator className="mt-2 w-[95%]" />
      <AdminContainer>
        <Button
          className="self-end"
          onClick={() => router.push("assessments/new")}
        >
          Add Assessment
        </Button>
        <AssessmentList initialAssessmentsList={initialAssessmentsList} />
      </AdminContainer>
      {/* </BreadcrumbView> */}
    </div>
  );
};

export default Assessments;
