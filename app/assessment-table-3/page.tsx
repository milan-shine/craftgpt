"use client";

import React from "react";
import { Question } from "./components/Question";
import questions from "../../questions.json";
import { useRouter } from "next/navigation";
import { Button } from "@/components/shadcn/ui/button";

const Page = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-end p-20 gap-4">
      <div className="m-auto mt-6 flex justify-center">
        <table className="">
          <thead>
            <tr className="grid grid-cols-6 w-[80vw] bg-card divide-x divide-slate-500 border border-slate-500 rounded-tl-xl rounded-tr-xl">
              <th className="flex justify-center items-center p-2">
                Combined Assurance Principle
              </th>
              <th className="flex justify-center items-center p-2">
                Level 1: Initial
              </th>
              <th className="flex justify-center items-center p-2">
                Level 2: Developing
              </th>
              <th className="flex justify-center items-center p-2">
                Level 3: Defined
              </th>
              <th className="flex justify-center items-center p-2">
                Level 4: Managed
              </th>
              <th className="flex justify-center items-center p-2 ">
                Level 5: Optimized
              </th>
            </tr>
          </thead>
          <tbody className="w-full border border-black">
            {questions?.map(({ question, options }) => (
              <tr className="grid grid-cols-6 w-[80vw] my-4" key={question}>
                <Question
                  key={question}
                  question={question}
                  options={options}
                />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Button onClick={() => router.push("/assessment-table-1")}>Next</Button>
    </div>
  );
};

export default Page;
