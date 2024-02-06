"use client";

import { getModels } from "@/api/assessment-models";
import { useQuery } from "@tanstack/react-query";

const ModelList = ({ initialData }: { initialData: any }) => {
  const { data } = useQuery({
    queryKey: ["models"],
    queryFn: getModels,
    initialData: initialData,
  });

  return (
    <>
      <ul>
        {data.length &&
          data.map(({ name }: { name: string }) => (
            <li key={name}>{name}</li>
          ))}
      </ul>
    </>
  );
};

export default ModelList;
