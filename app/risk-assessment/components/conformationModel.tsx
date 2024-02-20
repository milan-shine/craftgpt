"use client";

import { Button } from "@/components/shadcn/ui/button";
import React from "react";
import { useRouter } from "next/navigation";

const ConformationModel = () => {
  const router = useRouter();

  return (
    <div className="flex h-fit w-fit flex-col gap-6 rounded-2xl bg-card px-10 py-5">
      <div className="items-center gap-5">
        <h2 className="font-bold">
          Do you want to do assessment for risk management?
        </h2>
      </div>
      <div className="flex gap-4 self-end ">
        <Button
          type="button"
          onClick={() => router.push("/risk-assessment/inherent-risk")}
        >
          Yes
        </Button>
        <Button
          type="button"
          variant={"ghost"}
          onClick={() => router.push("/thank-you")}
        >
          No
        </Button>
      </div>
    </div>
  );
};

export default ConformationModel;
