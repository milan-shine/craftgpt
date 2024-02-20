"use client";

import React from "react";
import AdminContainer from "@/components/containers/AdminContainer";
import { Button } from "@/components/shadcn/ui/button";
import { useRouter } from "next/navigation";
import AssessmentList from "./AssessmentList";

interface IAssessment {
  _id: string;
  access_code: string;
  assessment_model_ids: string[];
  completed_submissions: string[];
  name: string;
  submissions_limit: number;
}

const Assessments: React.FC<{
  initialAssessmentsList: IAssessment;
}> = ({ initialAssessmentsList }) => {
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
