"use client";

import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { exportExcel, getAssessments } from "@/api/assessments";
import DataTable from "@/components/table/DataTable";
import ActionButton from "@/components/buttons/ActionButton";
import {
  Edit,
  Eye,
  Trash,
  AlertCircle,
  ArrowDownCircle,
} from "lucide-react";
import { GLOBAL_CONFIG } from "@/config/globals";
import CopyButton from "@/components/buttons/CopyToClipboardBtn";
import { ConfirmationDialog } from "@/components/modals/Modal";
import { deleteAssessment } from "@/api/assessments";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Badge } from '@/components/shadcn/ui/badge'
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

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
  const [chartData, setChartData] = useState({ X: [], y: [] });

  const { data: assessmentListData, isLoading } = useQuery({
    queryKey: ["assessments"],
    queryFn: getAssessments,
    initialData: initialAssessmentsList,
  });

  const { mutate } = useMutation({
    mutationFn: deleteAssessment,
    onSuccess: () => {
      toast.success("Assessment deleted sucessfully");
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

  useEffect(() => {
    const barChartData = {
      x: assessmentListData && assessmentListData.length ? assessmentListData.map((obj) => obj.name) : [],
      y: assessmentListData && assessmentListData.length ? assessmentListData.map((obj) => obj.completed_submissions.length) : [],
    };
    setChartData(barChartData);
  }, [assessmentListData]);

  const assessmentData =
    assessmentListData.length &&
    assessmentListData?.map((cell: IAssessment) => ({
      row: [
        { cell: cell.name },
        {
          cell: cell?.completed_submissions ? (
            <div className="flex items-center justify-center gap-2">
              <Badge variant="custom">{cell.completed_submissions.length}</Badge>
              <Eye
              color="#085C7C"
                style={{ cursor: 'pointer' }}
                onClick={() =>
                  router.push(`assessments/completed-assessments/${cell._id}`)
                }
              />
              <ActionButton
              style={{color:"#085C7C"}}
                title="Export"
                Icon={ArrowDownCircle}
                onClick={() => {
                  toast.success("Your file is being downloaded");
                  return exportExcel(cell._id, "", "export-all.xlsx")
                }}
              />
            </div>
          ) : (
            0
          ),
        },
        { cell: <Badge variant='custom'>{cell.submissions_limit} </Badge>},
        {
          cell: (
            <div className="flex items-center justify-center gap-2">
              {/* <ActionButton title="View" Icon={Eye} /> */}
              <ActionButton
              style={{color:"#375d70"}}
                onClick={() => router.push(`/admin/assessments/${cell._id}`)}
                title="Edit"
                Icon={Edit}
              />
              <ActionButton
              style={{color:"#375d70"}}
                title="Delete"
                Icon={Trash}
                onClick={() => modalHandler(cell._id)}
              />
              <CopyButton
                disabled={
                  cell?.completed_submissions &&
                  cell.completed_submissions.length <= cell.submissions_limit
                }
                text={`${GLOBAL_CONFIG.APP.BASE_URL}/login?access-code=${cell.access_code}`}
              />
            </div>
          ),
        },
      ],
    }));

  return (
    <>
      {assessmentListData?.length === 0 ? (
        <div className="flex h-full w-full flex-col items-center justify-center text-2xl">
          <span>No Data found</span>
        </div>
      ) : (
        <>
          <Plot
            data={[{ type: "bar", x: chartData.x, y: chartData.y }]}
            layout={{title: "Assessment chart", margin: {l: 50,r: 50,t: 80,b: 120,}}}
          />
          <div style={{ marginTop: '30px', width: "100%" }}>
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
          </div>
        </>
      )}
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