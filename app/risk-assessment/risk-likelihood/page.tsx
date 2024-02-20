"use client";

import React from "react";
import { Question } from "./components/Question";
import { Button } from "@/components/shadcn/ui/button";
import { useRouter } from "next/navigation";

//  Dark Green, Low  Light Green, Moderate Light Orange, High Dark Orange and Critical Red

const optionsRow1 = [
  {
    label:
      "The risk is almost certain to not occur in the current circumstances with no or very limited instances over a long period of time.",
    value: "darkGreen",
  },
  {
    label:
      "This has occurred but not in the past 2+ years and is unlikely to occur given the current circumstances.",
    value: "lightGreen",
  },
  {
    label:
      "This has occurred occasionally in the past three years, and there is a possibility that this will recur.",
    value: "lightOrange",
  },
  {
    label:
      "This is likely to repeat during the current cycle, and the current circumstances make this more likely to repeat during the next year.",
    value: "darkOrange",
  },
  {
    label:
      "This is almost certain to happen/is happening and will continue over the next year.",
    value: "criticalRed",
  },
];

const optionsRow2 = [
  {
    label:
      "The risk is almost certain to not occur in the current circumstances with no or very limited instances over a long period of time.",
    value: "darkGreen",
  },
  {
    label:
      "This has occurred but not in the past 2+ years and is unlikely to occur given the current circumstances.",
    value: "lightGreen",
  },
  {
    label:
      "This has occurred occasionally in the past three years, and there is a possibility that this will recur.",
    value: "lightOrange",
  },
  {
    label:
      "This is likely to repeat during the current cycle, and the current circumstances make this more likely to repeat during the next year.",
    value: "darkOrange",
  },
  {
    label:
      "This is almost certain to happen/is happening and will continue over the next year.",
    value: "criticalRed",
  },
];

const optionsRow = [
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
    <div className="flex flex-col items-end gap-4 p-20">
      <h1 className="self-center text-3xl font-bold">Risk Likelihood</h1>
      <div className="m-auto mt-6 flex justify-center">
        <table className="">
          <thead>
            <tr className="grid w-[80vw] grid-cols-9 divide-x divide-slate-500 rounded-tl-xl rounded-tr-xl border border-slate-500 bg-card">
              <th className="flex items-center justify-center p-2">
                Risk Name
              </th>
              <th className="col-span-2 flex items-center justify-center p-2">
                Description
              </th>
              <th className="flex items-center justify-center p-2">Score</th>
              <th className="flex items-center justify-center p-2">
                Rare 1-10%
              </th>
              <th className="flex items-center justify-center p-2">
                Unlikely 10-25%
              </th>
              <th className="flex items-center justify-center p-2">
                Possible 26-50%
              </th>
              <th className="flex items-center justify-center p-2">
                Likely 51-75%
              </th>
              <th className="flex items-center justify-center p-2">
                Almost Certain 75-100%
              </th>
            </tr>
          </thead>
          <tbody className="w-full border border-black ">
            <tr className="grid w-[80vw] grid-cols-9">
              <td className="border-r-[1px] border-r-black px-2 pb-4">
                <strong>Funding Volatility</strong>
              </td>
              <td className="col-span-2 mx-2 pb-4">
                Dependence on donations, grants, and sponsorships can lead to
                financial instability due to economic downturns, changes in
                donor priorities, or scandals.
              </td>
              <Question question="" options={optionsRow1} />
            </tr>
            <tr className="grid w-[80vw] grid-cols-9">
              <td className=" border-r-[1px] border-r-black px-2 pb-4">
                <strong>Regulatory Compliance</strong>
              </td>
              <td className="col-span-2 mx-2 pb-4">
                {`Failure to comply with legal and regulatory requirements in various countries, including charity law, data protection, and financial reporting standards.`}
              </td>
              <Question question="" options={optionsRow2} />
            </tr>
          </tbody>
        </table>
      </div>
      <Button onClick={() => router.push("/thank-you")}>Submit</Button>
    </div>
  );
};

export default Page;
