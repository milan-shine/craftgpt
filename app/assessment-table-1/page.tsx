"use client";

import React from "react";
import { Question } from "./components/Question";
import questions from "../../questions.json";
import { useRouter } from "next/navigation";
import { Button } from "@/components/shadcn/ui/button";

const optionsRow1 = [
  {
    label: "Will Achieve KPIs demonstrate objective will be met",
    value: "green",
  },
  {
    label:
      "Should Achieve KPIs demonstrate that some uncertainty exists if the objective will be met",
    value: "yellow",
  },
  {
    label:
      "Uncertain KPIs provide evidence that the objective will not be met.",
    value: "orange",
  },
];
const optionsRow2 = [
  {
    label: "",
    value: "green",
  },
  {
    label: "",
    value: "yellow",
  },
  {
    label: "",
    value: "orange",
  },
];

const Page = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-end p-20 gap-4">
      <div className="m-auto mt-6 flex justify-center">
        <table className="">
          <thead>
            <tr className="grid grid-cols-8 w-[80vw] bg-card divide-x divide-slate-500 border border-slate-500 rounded-tl-xl rounded-tr-xl">
              <th className="flex justify-center items-center p-2">
                Objective
              </th>
              <th className="flex justify-center items-center p-2 col-span-3">
                Overview
              </th>
              <th className="flex justify-center items-center p-2">Owner</th>
              <th className="flex justify-center items-center p-2 col-span-3">
                Performance
              </th>
            </tr>
          </thead>
          <tbody className="w-full border border-black ">
            <tr className="grid grid-cols-8 w-[80vw]">
              <td className="border-r-[1px] border-r-black pb-4 px-2">
                <strong>Making the Bible Accessible</strong>
              </td>
              <td className="px-2 col-span-3 border-r-[1px] border-r-black ">
                The core mission of the American Bible Society is to make the
                Bible available to every person in a language and format each
                can understand and afford. This objective underscores their
                commitment to overcoming barriers to Scripture engagement by
                ensuring that all people may experience its life-changing
                message.
              </td>
              <td className="mx-2 flex justify-center">CEO</td>
              <Question question="" options={optionsRow1} />
            </tr>
            <tr className="grid grid-cols-8 w-[80vw]">
              <td className="border-r-[1px] border-r-black pb-4 px-2">
                <strong>
                  Transforming America through Scripture Engagement
                </strong>
              </td>
              <td className="px-2 col-span-3 border-r-[1px] border-r-black ">
                {`One strategic area of focus is to ignite a renewal of Scripture
              engagement in the U.S. This involves Bible innovation and advocacy
              efforts to deepen people's connection with the Bible and its
              teachings.`}
              </td>
              <td className="mx-2 flex justify-center">Operations</td>
              <Question question="" options={optionsRow2} />
            </tr>
            <tr className="grid grid-cols-8 w-[80vw]">
              <td className="border-r-[1px] border-r-black pb-4 px-2">
                <strong>Bible-Based Trauma Healing</strong>
              </td>
              <td className="px-2 col-span-3 border-r-[1px] border-r-black ">
                {`The American Bible Society pioneers in providing Bible-based
              trauma healing to help suffering individuals find solace and
              healing in God's Word. This ministry equips churches to support
              those affected by emotional shock and pain, fostering communities
              where individuals can reconnect with God through Scripture.`}
              </td>
              <td className="mx-2 flex justify-center">Operations</td>
              <Question question="" options={optionsRow2} />
            </tr>
          </tbody>
        </table>
      </div>
      <Button onClick={() => router.push("/assessment-table-2")}>Next</Button>
    </div>
  );
};

export default Page;
