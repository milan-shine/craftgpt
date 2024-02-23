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

  const { data } = useQuery({
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
  return (
    <>
      {data?.length === 0 ? (
        <div className="flex h-full w-full flex-col items-center justify-center text-2xl">
          <span>No Data found</span>
        </div>
      ) : (
        <ul>
          {data.map(
            ({ name, _id, type }: { name: string; _id: string; type: any }) => (
              <li
                className="m-3 flex items-center justify-between rounded-lg bg-card p-3"
                key={_id}
              >
                <span>{name}</span>
                <span>{type?.name || "-"}</span>
                <div className="flex gap-2">
                  {/* <ActionButton Icon={Eye} /> */}
                  <ActionButton
                    onClick={() =>
                      router.push(`/admin/assessment-models/${_id}`)
                    }
                    Icon={Edit}
                  />
                  <ActionButton
                    Icon={Trash}
                    onClick={() => modalHandler(_id)}
                  />
                </div>
              </li>
            ),
          )}
        </ul>
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
