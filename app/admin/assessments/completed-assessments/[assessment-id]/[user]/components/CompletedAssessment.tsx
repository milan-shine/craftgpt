"use client";
import React, { useState } from "react";
import { getUserAssessmentSubmission } from "@/api/assessments";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Assessment from "@/app/assessment/components/Assessment";
import ModelTable from "@/app/assessment/components/ModelTable";
import LoadingButton from "@/components/buttons/LoadingButton";

const CompletedAssessment = () => {

  const searchParams = useParams();
  const assestment_id: any = searchParams["assessment-id"];
  const user_id: any = searchParams["user"];

  const initialData = getUserAssessmentSubmission(assestment_id, user_id);
  const { data, isLoading: getSubmissionLoading } = useQuery({
    queryKey: ["assessments"],
    queryFn: () => getUserAssessmentSubmission(assestment_id, user_id),
    initialData: initialData,
  });

  if (getSubmissionLoading) {
    return <div>Loading..</div>;
  }

  const accessCode = data?.data?.[0]?.assessment_id.access_code;
  return <>{accessCode && <Assessment accessCode={accessCode} completedData={data}/>}</>;
};

export default CompletedAssessment;
