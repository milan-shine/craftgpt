"use client";

import { getModelById } from "@/api/assessment-models";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import ModelTable from "./ModelTable";
import { Progress } from "@/components/shadcn/ui/progress";

type ModelsProps = {
  modelIds: string[];
};

const Models: React.FC<ModelsProps> = ({ modelIds }) => {
  const [currentModel, setCurrentModel] = useState<number>(0);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["current_assessment_model"],
    queryFn: () => getModelById(modelIds[currentModel]),
  });

  useEffect(() => {
    if (currentModel !== 0) {
      refetch();
    }
    if (currentModel + 1 === modelIds.length) {
      setIsSubmit(true);
    }
  }, [currentModel]);

  if (isLoading) {
    return <div>Loading..</div>;
  }

  if (!data?.name) {
    return <div>Something went wrong</div>;
  }

  const handleNextModel = () => {
    if (currentModel + 1 < modelIds.length) {
      setCurrentModel((prev) => prev + 1);
    }
  };

  return (
    <>
      <span className="mb-2 mt-4 text-lg">
        Progess {currentModel + 1}/{modelIds.length}
      </span>
      <Progress
        className=""
        value={((currentModel + 1) / modelIds.length) * 100}
      />
      <ModelTable
        tableData={data}
        handleNextModel={handleNextModel}
        isSubmit={isSubmit}
      />
    </>
  );
};

export default Models;
