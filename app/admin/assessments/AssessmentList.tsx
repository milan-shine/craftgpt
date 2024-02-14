import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getAssessments } from "@/api/assessments";
import DataTable from "@/components/table/DataTable";
import ActionButton from "@/components/buttons/ActionButton";
import { Edit, Eye, Trash, Share2 } from "lucide-react";
import { GLOBAL_CONFIG } from "@/config/globals";
import { toast } from "sonner";
import CopyButton from "@/components/buttons/CopyToClipboardBtn";

const AssessmentList: React.FC<{ initialAssessmentsList: any }> = ({
  initialAssessmentsList,
}) => {
  const { data } = useQuery({
    queryKey: ["assessments"],
    queryFn: getAssessments,
    initialData: initialAssessmentsList,
  });

  const assessmentData =
    data &&
    data.map((cell: any) => ({
      row: [
        { cell: cell.name },
        {
          cell: cell?.completed_submissions
            ? cell.completed_submissions.length
            : 0,
        },
        { cell: cell.submissions_limit },
        {
          cell: (
            <div className="flex items-center justify-center gap-2">
              <ActionButton title="View" Icon={Eye} />
              <ActionButton title="Edit" Icon={Edit} />
              <ActionButton title="Delete" Icon={Trash} />
              <CopyButton text={`${GLOBAL_CONFIG.APP.BASE_URL}/login?access-code=${cell.access_code}`}/>
            </div>
          ),
        },
      ],
    }));

  return (
    <>
      <DataTable
        tHeads={[
          "Name",
          "Completed assessment",
          "Total assessment limit",
          "Actions",
        ]}
        tRows={assessmentData}
      />
    </>
  );
};

export default AssessmentList;
