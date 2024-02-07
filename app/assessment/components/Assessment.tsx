import { getAssessmentByAccessCode } from "@/api/assessments";
import Header from "@/components/headers/Header";
import { Separator } from "@/components/shadcn/ui/separator";
import React from "react";
import Models from "./Models";

type AssessmentProps = {
  accessCode: string;
};

const dummyAssessment = {
  _id: "65c31a03237209059c8baf9b",
  name: "valid assessment",
  submissions_limit: 1,
  assessment_model_ids: ["65c2186b15eb7465901472fa"],
  access_code: "O2XR3N",
  createdAt: "2024-02-07T05:49:55.446Z",
  updatedAt: "2024-02-07T05:49:55.446Z",
};

const Assessment = async ({ accessCode }: AssessmentProps) => {
  const data = await getAssessmentByAccessCode(accessCode);

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
      <Models modelIds={data.assessment_model_ids} />
    </section>
  );
};

export default Assessment;
