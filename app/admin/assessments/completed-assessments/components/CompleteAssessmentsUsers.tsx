"use client";

import React, { useEffect } from "react";
import {
  getAssessmentSubmissionById,
  getUserAssessmentSubmission,
} from "@/api/assessments";
import ActionButton from "@/components/buttons/ActionButton";
import DataTable from "@/components/table/DataTable";
import { useQuery } from "@tanstack/react-query";
import { Eye } from "lucide-react";
import { useSearchParams } from "next/navigation";

interface IAssessment {
  user_id: any;
  _id: string;
  access_code: string;
  assessment_model_ids: string[];
  completed_submissions: string[];
  name: string;
  submissions_limit: number;
  completed_submissions_users: { user_id: string[] }[];
}

const CompleteAssessmentsView: any = () => {
  const searchParams = useSearchParams();

  const assestment_id: any = searchParams.get("assestment_id");

  const initialData = getAssessmentSubmissionById(assestment_id);

  const { data, isLoading } = useQuery({
    queryKey: ["assessments"],
    queryFn: () => getAssessmentSubmissionById(assestment_id),
    initialData: initialData,
  });

  const completedAssessmentData =
    data.completed_submissions_users &&
    data.completed_submissions_users.map((cell: IAssessment) => ({
      row: [
        { cell: cell.user_id.name },
        {
          cell: cell?.user_id.email,
        },
        {
          cell: (
            <div className="flex items-center justify-center gap-2">
              <ActionButton title="View" Icon={Eye} />
            </div>
          ),
        },
      ],
    }));

  let submissionData: any;
  const getSubmission = async () => {
    submissionData = await getUserAssessmentSubmission(
      "65e1a2dcb086155d8502dbba",
      "65e1a2f1b086155d8502dbcb",
    );
    console.log("submissionData", submissionData);
  };
  useEffect(() => {
    getSubmission();
  }, []);
  return (
    <div className="my-2">
      <DataTable
        tHeads={["User name", "Email", "Action"]}
        tRows={completedAssessmentData}
        isLoading={isLoading}
      />
    </div>
  );
};

export default CompleteAssessmentsView;
