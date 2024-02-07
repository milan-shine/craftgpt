import { Button } from "@/components/shadcn/ui/button";
import React, { useState } from "react";
import { AnswerType, Question } from "./Question";
import LoadingButton from "@/components/buttons/LoadingButton";
import { toast } from "sonner";

type ModelTableProps = {
  tableData: any;
  handleNextModel: Function;
  isSubmit: boolean;
};

const ModelTable: React.FC<ModelTableProps> = ({
  tableData,
  handleNextModel,
  isSubmit,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="mt-8 flex flex-col items-end gap-4 p-20 pt-0">
      <span className="ml-4 self-start">
        <strong>Model Name: </strong>
        {tableData.name}
      </span>
      <div className="m-auto flex justify-center">
        <table className="">
          <thead>
            <tr className="grid w-[80vw] grid-cols-6 divide-x divide-slate-500 rounded-tl-xl rounded-tr-xl border border-slate-500 bg-card">
              <th className="flex items-center justify-center p-2">
                Combined Assurance Principle
              </th>
              <th className="flex items-center justify-center p-2">
                Level 1: Initial
              </th>
              <th className="flex items-center justify-center p-2">
                Level 2: Developing
              </th>
              <th className="flex items-center justify-center p-2">
                Level 3: Defined
              </th>
              <th className="flex items-center justify-center p-2">
                Level 4: Managed
              </th>
              <th className="flex items-center justify-center p-2 ">
                Level 5: Optimized
              </th>
            </tr>
          </thead>
          <tbody className="w-full border border-black">
            {tableData.questions?.map(
              ({
                content,
                answers,
                _id,
              }: {
                content: string;
                answers: AnswerType[];
                _id: string;
              }) => (
                <tr className="my-4 grid w-[80vw] grid-cols-6" key={_id}>
                  <Question
                    key={content}
                    question={content}
                    answers={answers}
                  />
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
      {isSubmit ? (
        <LoadingButton
          onClick={() => {
            setIsLoading(true);
            setTimeout(() => {
              setIsLoading(false);
              toast.success("Submitted successfully");
            }, 2000);
          }}
          isLoading={isLoading}
        >
          Submit
        </LoadingButton>
      ) : (
        <LoadingButton
          onClick={() => {
            setIsLoading(true);
            setTimeout(() => {
              setIsLoading(false);
              handleNextModel();
            }, 2000);
          }}
          isLoading={isLoading}
        >
          Next
        </LoadingButton>
      )}
    </div>
  );
};

export default ModelTable;
