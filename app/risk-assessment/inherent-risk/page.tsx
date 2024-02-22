"use client";

import React from "react";
import { Button } from "@/components/shadcn/ui/button";
import { useRouter } from "next/navigation";
import InherentRiskTable from "./components/InherentRiskTable";

//  Dark Green, Low  Light Green, Moderate Light Orange, High Dark Orange and Critical Red

const Page = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-end gap-4 p-20">
      <h1 className="self-center text-3xl font-bold">Inherent Risk</h1>
      <div className="m-auto mt-6 flex justify-center">
        {/* <InherentRiskTable /> */}
      </div>
      <Button onClick={() => router.push("/risk-assessment/risk-likelihood")}>
        Next
      </Button>
    </div>
  );
};

export default Page;
