"use client";

import React from "react";
import AdminContainer from "@/components/containers/AdminContainer";
import Header from "@/components/headers/Header";
import { Button } from "@/components/shadcn/ui/button";
import { Separator } from "@/components/shadcn/ui/separator";
import { useRouter } from "next/navigation";
import BreadcrumbView from "@/components/breadcrumbs/BreadcrumbView";
import AssessmentList from "./AssessmentList";

const Assessments: React.FC<{ initialAssessmentsList: any }> = ({
  initialAssessmentsList,
}) => {
  const router = useRouter();

  return (
    <div>
      <AdminContainer>
        <Button
          className="self-end bg-[#285B7E]"
          onClick={() => router.push("assessments/new")}
        >
          Add Assessment
        </Button>
        <AssessmentList initialAssessmentsList={initialAssessmentsList} />
      </AdminContainer>
    </div>
  );
};

export default Assessments;
