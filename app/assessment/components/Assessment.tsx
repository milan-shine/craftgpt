"use client";

import { getAssessmentByAccessCode } from "@/api/assessments";
import Header from "@/components/headers/Header";
import { Separator } from "@/components/shadcn/ui/separator";
import React, { useState } from "react";
import Models from "./Models";
import { useMutation, useQuery } from "@tanstack/react-query";
import { submitAssessment } from "@/api/assessment-submission";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type AssessmentProps = {
  accessCode: string;
};

const Assessment = ({ accessCode }: AssessmentProps) => {
  const router = useRouter();
  let userString;
  if (typeof localStorage !== "undefined") {
    userString = localStorage.getItem("user");
  }
  let user: null | any = null;
  if (userString && userString !== "undefined") {
    user = JSON.parse(userString);
  }

  const { data, isLoading } = useQuery({
    queryKey: ["assessment"],
    queryFn: () => getAssessmentByAccessCode(accessCode),
  });

  const assessmentMutation = useMutation({
    mutationFn: submitAssessment,
    onSuccess: () => {
      toast.success("Submitted successfully");
      router.push("/thank-you");
      // router.push("/risk-assessment");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const [modelSubmissionData, setModelSubmissionData] = useState<any>([]);

  const setAssessmentModelAnswers = (modelData: any) => {
    setModelSubmissionData((prev: any) => [...prev, modelData]);
  };

  const handleSubmit = (lastModelData: any) => {
    console.log({
      user_id: user?._id,
      assessment_id: data._id,
      assessment_models: [...modelSubmissionData, lastModelData],
    });
    assessmentMutation.mutate({
      user_id: user?._id,
      assessment_id: data._id,
      assessment_models: [...modelSubmissionData, lastModelData],
    });
  };

  if (isLoading) {
    return <div>Loading..</div>;
  }

  if (!data || (data && !data.name)) {
    return <div>Something went wrong</div>;
  }

  return (
    <section className="mx-auto flex w-[80vw] flex-col items-center p-4">
      <Header title={`Assessment: ${data.name}`} className="self-start" />
      <Separator className="my-2" />
      <span className="text-xl">
        Welcome there are {data.assessment_model_ids.length} assessment models
        to be completed.
      </span>
      <Separator className="my-2" />
      <Models
        modelIds={data.assessment_model_ids}
        setAssessmentModelAnswers={setAssessmentModelAnswers}
        handleSubmit={handleSubmit}
      />
    </section>
  );
};

export default Assessment;
