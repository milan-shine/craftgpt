"use client";

import { getModelById } from "@/api/assessment-models";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import ModelTable from "./ModelTable";
import { Progress } from "@/components/shadcn/ui/progress";
import LoadingButton from "@/components/buttons/LoadingButton";

type ModelsProps = {
  modelIds: string[];
  setAssessmentModelAnswers: (modelData: any) => void;
  handleSubmit: (lastModelData: any) => void;
  isPending:boolean
};

const Models: React.FC<ModelsProps> = ({
  modelIds,
  setAssessmentModelAnswers,
  handleSubmit,
  isPending
}) => {
  const [currentModel, setCurrentModel] = useState<number>(0);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [storedAnswers, setStoredAnswers] = useState<any>([]);

  const { data, isLoading: isModelLoading } = useQuery({
    queryKey: ["current_assessment_model", currentModel],
    queryFn: () => getModelById(modelIds[currentModel]),
  });

  useEffect(() => {
    if (currentModel + 1 === modelIds.length) {
      setIsSubmit(true);
    }
  }, [currentModel, modelIds.length]);

  const mapAnswers = (storedAnswers: any, questions: any) => {
    const mappedAnswers = storedAnswers.map(
      (
        { question_id, current_level_answer_id, desired_level_answer_id }: any,
        index: number,
      ) => {
        const questionData = questions.find(
          (question: any) => question._id === question_id,
        );
        const currentAnswer = questionData.answers.find(
          (answer: any) => answer.level.toString() === current_level_answer_id,
        );
        const desiredAnswer = questionData.answers.find(
          (answer: any) => answer.level.toString() === desired_level_answer_id,
        );

        return {
          question_id,
          current_level_answer_id: currentAnswer._id,
          desired_level_answer_id: desiredAnswer._id,
        };
      },
    );

    return mappedAnswers;
  };
  const handleNextModel = () => {
    if (currentModel + 1 < modelIds.length) {
      setCurrentModel((prev) => prev + 1);
    }

    let mappedAnswers;
    if (!data.type.name.toLowerCase().includes("risk")) {
      mappedAnswers = mapAnswers(storedAnswers, data.questions);
    } else {
      mappedAnswers = storedAnswers;
    }
    setAssessmentModelAnswers({
      model_id: data._id,
      questions: mappedAnswers,
    });
    setStoredAnswers([]);
  };

  if (isModelLoading) {
    return <div>Loading..</div>;
  }

  if (!data?.name) {
    return <div>Something went wrong</div>;
  }

  const submitHandler = async() => {
    let mappedAnswers;
    if (!data.type.name.toLowerCase().includes("risk")) {
      mappedAnswers = mapAnswers(storedAnswers, data.questions);
    } else {
      mappedAnswers = storedAnswers;
    }
   await handleSubmit({
      model_id: data._id,
      questions: mappedAnswers,
    });
  };
  const nextHandler = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      handleNextModel();
    }, 500);
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
        storedAnswers={storedAnswers}
        setStoredAnswers={setStoredAnswers}
      />
      <div className="self-end">
        {isSubmit ? (
          <LoadingButton onClick={submitHandler} isLoading={isPending}>
            Submit
          </LoadingButton>
        ) : (
          <LoadingButton onClick={nextHandler} isLoading={isLoading}>
            Next
          </LoadingButton>
        )}
      </div>
    </>
  );
};

export default Models;
