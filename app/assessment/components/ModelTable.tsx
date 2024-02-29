import React, { useState } from "react";
import { Question } from "./Question";
import InherentRiskTable from "./risk-assessment/page";
import ObjectivesTable from "./objectives-assessment/page";

type ModelTableProps = {
  tableData: any;
  storedAnswers: any;
  setStoredAnswers: React.Dispatch<any>;
};

const ModelTable: React.FC<ModelTableProps> = ({
  tableData,
  storedAnswers,
  setStoredAnswers,
}) => {
  return (
    <div className="mt-8 flex flex-col items-end gap-4 p-20 pb-4 pt-0">
      <span className="ml-4 self-start">
        <strong>Model Name: </strong>
        {tableData.name}
      </span>
      <div className="m-auto flex justify-center">
        {tableData.type.name.includes("Risk") ? (
          <InherentRiskTable
            storedAnswers={storedAnswers}
            tableData={tableData}
            setStoredAnswers={setStoredAnswers}
          />
        ) : (
          <>
            {tableData.type.name === "Objectives" ? (
              <>
                <ObjectivesTable
                  storedAnswers={storedAnswers}
                  tableData={tableData}
                  setStoredAnswers={setStoredAnswers}
                />
              </>
            ) : (
              <table className="">
                <thead>
                  <tr className="grid w-[80vw] grid-cols-6 divide-x divide-slate-500 rounded-tl-xl rounded-tr-xl border border-slate-500 bg-card">
                    <th className="flex items-center justify-center p-2">
                      Assessment Criteria
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
                  {tableData.questions?.map((question: any) => {
                    const [filterdAnswers] = storedAnswers.filter(
                      (answer: any) => answer.question_id === question._id,
                    );

                    return (
                      <tr
                        className="my-4 grid w-[80vw] grid-cols-6"
                        key={question._id}
                      >
                        <Question
                          key={question._id}
                          question={question}
                          storedAnswer={{
                            currentAnswer:
                              filterdAnswers?.current_level_answer_id || 0,
                            desiredAnswer:
                              filterdAnswers?.desired_level_answer_id || 0,
                          }}
                          setStoredAnswers={setStoredAnswers}
                        />
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ModelTable;
