"use client";
import { getAssessmentSubmissionById } from "@/api/assessments";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const CompleteAssessmentsView: any = () => {
  const searchParams = useSearchParams();

  const assestment_id: any = searchParams.get("assestment_id");

  const getData = async () => {
    const initialData = await getAssessmentSubmissionById(assestment_id);

    console.log(initialData, "initialData");
  };

  useEffect(() => {
    getData();
  }, []);

  return <div>CompleteAssessmentsView</div>;
};

export default CompleteAssessmentsView;
