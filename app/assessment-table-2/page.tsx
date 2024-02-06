"use client";

import React from "react";
import { Question } from "./components/Question";
import questions from "../../questions.json";
import { Button } from "@/components/shadcn/ui/button";
import { useRouter } from "next/navigation";

//  Dark Green, Low  Light Green, Moderate Light Orange, High Dark Orange and Critical Red

const optionsRow1 = [
  {
    label:
      "Risks in this category have minimal impact and are unlikely to affect the organization’s operations or objectives significantly. These risks require minimal attention and resources.",
    value: "darkGreen",
  },
  {
    label:
      "Risks that might have a slight impact on operations or financial stability, but are easily managed or mitigated with standard procedures. These risks warrant regular monitoring.",
    value: "lightGreen",
  },
  {
    label:
      "Risks that could cause noticeable disruption to operations or objectives, warranting a moderate level of attention for mitigation or planning to reduce potential impacts.",
    value: "lightOrange",
  },
  {
    label:
      "Risks that are likely to have a significant impact on the organization’s operations, reputation, or finances, requiring urgent attention and substantial resources to manage.",
    value: "darkOrange",
  },
  {
    label:
      "These represent the most severe risks with the potential to cause extensive damage, disrupt core operations, or threaten the organization’s survival. Immediate action is required.",
    value: "criticalRed",
  },
];

const optionsRow2 = [
  {
    label: "",
    value: "darkGreen",
  },
  {
    label: "",
    value: "lightGreen",
  },
  {
    label: "",
    value: "lightOrange",
  },
  {
    label: "",
    value: "darkOrange",
  },
  {
    label: "",
    value: "criticalRed",
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
                Risk Name
              </th>
              <th className="flex justify-center items-center p-2 col-span-2">
                Description
              </th>
              <th className="flex justify-center items-center p-2">
                Negligible 0-20
              </th>
              <th className="flex justify-center items-center p-2">
                Low 20-40
              </th>
              <th className="flex justify-center items-center p-2">
                Moderate 40-60
              </th>
              <th className="flex justify-center items-center p-2">
                High 60-80
              </th>
              <th className="flex justify-center items-center p-2">
                Critical 80-100
              </th>
            </tr>
          </thead>
          <tbody className="w-full border border-black ">
            <tr className="grid grid-cols-8 w-[80vw]">
              <td className="px-2 pb-4 border-r-[1px] border-r-black">
                <strong>Funding Volatility</strong>
              </td>
              <td className="mx-2 col-span-2 pb-4">
                Dependence on donations, grants, and sponsorships can lead to
                financial instability due to economic downturns, changes in
                donor priorities, or scandals.
              </td>
              <Question question="" options={optionsRow1} />
            </tr>
            <tr className="grid grid-cols-8 w-[80vw]">
              <td className=" px-2 pb-4 border-r-[1px] border-r-black">
                <strong>Regulatory Compliance</strong>
              </td>
              <td className="mx-2 col-span-2 pb-4">
                {`Failure to comply with legal and regulatory requirements in various countries, including charity law, data protection, and financial reporting standards.`}
              </td>
              <Question question="" options={optionsRow2} />
            </tr>
            <tr className="grid grid-cols-8 w-[80vw]">
              <td className=" px-2 pb-4 border-r-[1px] border-r-black">
                <strong>Mission Drift</strong>
              </td>
              <td className="mx-2 col-span-2 pb-4">
                {`Shifting away from the core mission to pursue funding opportunities or partnerships that do not align with the organization's primary goal.`}
              </td>
              <Question question="" options={optionsRow2} />
            </tr>
          </tbody>
        </table>
      </div>
      <Button onClick={() => router.push("/assessment-table-3")}>Next</Button>
    </div>
  );
};

export default Page;
