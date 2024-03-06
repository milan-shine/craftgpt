"use client";

import React, { useEffect } from "react";
import {
  exportExcel,
  getAssessmentSubmissionById,
  getUserAssessmentSubmission,
} from "@/api/assessments";
import ActionButton from "@/components/buttons/ActionButton";
import DataTable from "@/components/table/DataTable";
import { useQuery } from "@tanstack/react-query";
import { Eye,ArrowDownCircle } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";

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
  const searchParams = useParams();
  const assestment_id: any = searchParams["assessment-id"];
  const initialData = getAssessmentSubmissionById(assestment_id);
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["assessments"],
    queryFn: () => getAssessmentSubmissionById(assestment_id),
    initialData: initialData,
  });

  const exportHandler = (user_id: string) => {
    const fileName = "export.xlsx";
    exportExcel(assestment_id, user_id, fileName);
  };

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
              <ActionButton
                title="View"
                Icon={Eye}
                onClick={() =>
                  router.push(`${assestment_id}/${cell.user_id._id}`)
                }
              />
              <ActionButton
                title="Export"
                Icon={ArrowDownCircle}
                onClick={() => exportHandler(cell.user_id._id)}
              />
            </div>
          ),
        },
      ],
    }));

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
