import React from "react";
import { Question } from "./Question";

type InherentRiskTableProps = {
  tableData?: any;
  storedAnswers?: any;
  setStoredAnswers: React.Dispatch<any>;
};

const InherentRiskTable: React.FC<InherentRiskTableProps> = ({
  tableData,
  storedAnswers,
  setStoredAnswers,
}) => {
  const questions = tableData.questions.map((question: any) => ({
    ...question,
    answers: question.answers.filter(
      (answer: any) => !Number.isNaN(+answer.level),
    ),
  }));

  const questionDescriptions = tableData.questions.map((question: any) => ({
    description: question.answers.filter((answer: any) =>
      Number.isNaN(+answer.level),
    )[0],
  }));

  return (
    <table className="">
      <thead>
        <tr className="grid w-[80vw] grid-cols-9 divide-x divide-slate-500 rounded-tl-xl rounded-tr-xl border border-slate-500 bg-card">
          <th className="flex items-center justify-center p-2">Risk Name</th>
          <th className="col-span-2 flex items-center justify-center p-2">
            Description
          </th>
          <th className="flex items-center justify-center p-2">Score</th>
          <th className="flex items-center justify-center p-2">
            Negligible 0-20
          </th>
          <th className="flex items-center justify-center p-2">Low 20-40</th>
          <th className="flex items-center justify-center p-2">
            Moderate 40-60
          </th>
          <th className="flex items-center justify-center p-2">High 60-80</th>
          <th className="flex items-center justify-center p-2">
            Critical 80-100
          </th>
        </tr>
      </thead>
      <tbody className="w-full border border-black ">
        {questions.map((question: any, index: number) => {
          const [filterdAnswers] = storedAnswers.filter(
            (answer: any) => answer.question_id === question._id,
          );
          return (
            <tr key={question._id} className="grid w-[80vw] grid-cols-9">
              <td className=" border-r-[1px] border-r-black px-2 pb-4">
                <strong>Regulatory Compliance</strong>
              </td>
              <td className="col-span-2 mx-2 pb-4">
                {questionDescriptions[index].description.content}
              </td>
              <Question
                key={question._id}
                question={question}
                storedAnswer={{
                  answer: filterdAnswers?.current_level_answer_id || 0,
                  score: 0,
                }}
                setStoredAnswers={setStoredAnswers}
              />
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default InherentRiskTable;
