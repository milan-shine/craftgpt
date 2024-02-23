import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAssessments } from "@/api/assessments";
import DataTable from "@/components/table/DataTable";
import ActionButton from "@/components/buttons/ActionButton";
import { Edit, Eye, Trash, AlertCircle } from "lucide-react";
import { GLOBAL_CONFIG } from "@/config/globals";
import CopyButton from "@/components/buttons/CopyToClipboardBtn";
import { ConfirmationDialog } from "@/components/modals/Modal";
import { deleteAssessment } from "@/api/assessments";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface IAssessment {
  _id: string;
  access_code: string;
  assessment_model_ids: string[];
  completed_submissions: string[];
  name: string;
  submissions_limit: number;
}

const AssessmentList: React.FC<{
  initialAssessmentsList: IAssessment;
}> = ({ initialAssessmentsList }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["assessments"],
    queryFn: getAssessments,
    initialData: initialAssessmentsList,
  });

  const { mutate } = useMutation({
    mutationFn: deleteAssessment,
    onSuccess: () => {
      toast.success("Modal deleted sucessfully");
      queryClient.invalidateQueries({ queryKey: ["assessments"] });
    },
    onError: (err: any) => {
      toast.error(err.message);
    },
  });

  const modalHandler = (_id: string) => {
    setOpen(true);
    setSelectedId(_id);
  };

  const deleteAction = () => {
    mutate(selectedId);
    setOpen(false);
  };

  const assessmentData =
    data &&
    data.map((cell: IAssessment) => ({
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
              {/* <ActionButton title="View" Icon={Eye} /> */}
              <ActionButton
                onClick={() => router.push(`/admin/assessments/${cell._id}`)}
                title="Edit"
                Icon={Edit}
              />
              <ActionButton
                title="Delete"
                Icon={Trash}
                onClick={() => modalHandler(cell._id)}
              />
              <CopyButton
                text={`${GLOBAL_CONFIG.APP.BASE_URL}/login?access-code=${cell.access_code}`}
              />
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
        isLoading={isLoading}
      />
      <ConfirmationDialog
        icon={<AlertCircle color="red" />}
        onClick={deleteAction}
        open={open}
        setOpen={setOpen}
        title={"Are you sure you want to delete?"}
        description={"This will be permently deleted"}
        buttonText="Delete"
        actionButtonVariant="destructive"
      />
    </>
  );
};

export default AssessmentList;
