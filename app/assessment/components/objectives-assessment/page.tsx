import React from "react";
import { Question } from "./Question";

type InherentRiskTableProps = {
  tableData?: any | never;
  storedAnswers?: any;
  setStoredAnswers: React.Dispatch<any>;
};

const Page: React.FC<InherentRiskTableProps> = ({
  tableData,
  storedAnswers,
  setStoredAnswers,
}) => {
  const questions = tableData?.questions?.map((question: any) => ({
    ...question,
    answers: question.answers.filter(
      (answer: any) => !Number.isNaN(+answer.level),
    ),
  }));

  const questionDescriptions = tableData?.questions?.map((question: any) => ({
    question: question.answers.filter((answer: any) =>
      Number.isNaN(+answer.level),
    )[0],
  }));

  const extractedAnswers = tableData?.questions?.map((question: any) => {
    if (question.answers.length > 1) {
      return question.answers[1].content;
    } else {
      return null;
    }
  });

  const owners = tableData?.questions?.map((question: any) => ({
    question: question.answers.filter((answer: any) =>
      Number.isNaN(+answer.level),
    )[2],
  }));

  return (
    <table className="">
      <thead>
        <tr className="grid w-[80vw] grid-cols-8 divide-x divide-slate-500 rounded-tl-xl border bg-card px-1">
          <th className="flex items-center justify-center p-2">Objectives</th>
          <th className="col-span-3 flex items-center justify-center p-2">
            Overview
          </th>
          <th className="flex items-center justify-center p-2">Owner</th>
          <th className="flex items-center justify-center p-2">Level-1</th>
          <th className="flex items-center justify-center p-2">Level-2</th>
          <th className="flex items-center justify-center p-2">Level-3</th>
        </tr>
      </thead>
      <tbody className="w-full border border-black ">
        {questions?.map((question: any, index: number) => {
          const [filterdAnswers] = storedAnswers.filter(
            (answer: any) =>
              (typeof answer.question_id == "string"
                ? answer.question_id
                : answer.question_id._id) === question._id,
          );

          return (
            <tr
              key={question._id}
              className="my-4 grid w-[80vw] grid-cols-8 px-1"
            >
              <td className="border-r-[1px] border-r-black px-2 pb-4">
                <strong>{questionDescriptions[index].question.content}</strong>
              </td>
              <td className="col-span-3 border-r-[1px] border-r-black px-2 pb-4">
                {extractedAnswers[index]}
              </td>
              <td className="mx-2 pb-4">{owners[index].question.content}</td>
              <Question
                key={question._id}
                question={question}
                storedAnswer={{
                  answer: filterdAnswers?.current_level_answer_id || 0,
                  score: Number(filterdAnswers?.current_level_answer_id?.score) || 0,
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

export default Page;
