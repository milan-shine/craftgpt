"use client";

import { getModels } from "@/api/assessment-models";
import ActionButton from "@/components/buttons/ActionButton";
import { useQuery } from "@tanstack/react-query";
import { Edit, Eye, Trash } from "lucide-react";

const ModelList = ({ initialData }: { initialData: any }) => {
  const { data } = useQuery({
    queryKey: ["models"],
    queryFn: getModels,
    initialData: initialData,
  });

  return (
    <>
      {data?.length === 0 ? (
        <div className="flex h-full w-full flex-col items-center justify-center text-2xl">
          <span>No Data found</span>
        </div>
      ) : (
        <ul>
          {data.map(({ name, _id }: { name: string; _id: string }) => (
            <li
              className="m-3 flex items-center justify-between rounded-lg bg-card p-3"
              key={_id}
            >
              <span>{name}</span>
              <div className="flex gap-2">
                <ActionButton Icon={Eye} />
                <ActionButton Icon={Edit} />
                <ActionButton Icon={Trash} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default ModelList;
