import React from "react";
import Assessments from "./Assessments";
import { getAssessments } from "@/api/assessments";

const Page: React.FC = async () => {
  const initialData = await getAssessments();

  return <Assessments initialAssessmentsList={initialData} />;
};

export default Page;
