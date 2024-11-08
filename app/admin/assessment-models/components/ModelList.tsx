"use client";

import { getModels } from "@/api/assessment-models";
import ActionButton from "@/components/buttons/ActionButton";
import { ConfirmationDialog } from "@/components/modals/Modal";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Edit, Eye, Trash, AlertCircle } from "lucide-react";
import { deleteModel } from "@/api/assessment-models";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import DataTable from "@/components/table/DataTable";

interface IModel {
  _id: string;
  name: string;
  description: string;
  type: any;
}

const ModelList = ({ initialData }: { initialData: IModel }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["models"],
    queryFn: getModels,
    initialData: initialData,
  });

  const { mutate } = useMutation({
    mutationFn: deleteModel,
    onSuccess: () => {
      toast.success("Modal deleted sucessfully");
      queryClient.invalidateQueries({ queryKey: ["models"] });
    },
    onError: (err: any) => {
      toast.error(err.message);
    },
  });

  const modalHandler = (_id: any) => {
    setOpen(true);
    setSelectedId(_id);
  };

  const deleteAction = async () => {
    mutate(selectedId);
    setOpen(false);
  };

  const assessmentData =
    data &&
    data.map((cell: IModel) => ({
      row: [
        { cell: cell.name },
        { cell: cell.type?.name || "-" },
        {
          cell: (
            <div className="flex items-center justify-center gap-2">
              {/* <ActionButton title="View" Icon={Eye} /> */}
              <ActionButton
               style={{color:"#375d70"}}
                onClick={() =>
                  router.push(`/admin/assessment-models/${cell._id}`)
                }
                Icon={Edit}
              />
              <ActionButton
               style={{color:"#375d70"}}
                Icon={Trash}
                onClick={() => modalHandler(cell._id)}
              />
            </div>
          ),
        },
      ],
    }));

  return (
    <>
      {data?.length === 0 ? (
        <div className="flex h-full w-full flex-col items-center justify-center text-2xl">
          <span>No Data found</span>
        </div>
      ) : (
        <DataTable
          tHeads={["Name", "Model Type", "Actions"]}
          tRows={assessmentData}
          isLoading={isLoading}
        />
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

export default ModelList;
