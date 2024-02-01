import React from "react";
import { Question } from "./components/Question";
import questions from "../../questions.json";

const Page = () => {
  return (
    <table>
      <thead>
        <tr className="border border-slate-500 grid grid-cols-6 w-[80vw] rounded-tr-2xl rounded-tl-2xl bg-indigo-200">
          <th className="flex justify-center items-center">
            Combined Assurance Principle
          </th>
          <th className="border-x border-slate-500 flex justify-center items-center">
            Level 1: Initial
          </th>
          <th className="border-x border-slate-500 flex justify-center items-center">
            Level 2: Developing
          </th>
          <th className="border-x border-slate-500 flex justify-center items-center">
            Level 3: Defined
          </th>
          <th className="border-x border-slate-500 flex justify-center items-center">
            Level 4: Managed
          </th>
          <th className="flex justify-center items-center">
            Level 5: Optimized
          </th>
        </tr>
      </thead>
      <tbody className="w-full border border-black">
        {questions?.map(({ question, options }) => (
          <tr className="grid grid-cols-6 w-[80vw] gap-4 my-4" key={question}>
            <Question key={question} question={question} options={options} />
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Page;
