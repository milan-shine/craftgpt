"use client";

import React from "react";
import AdminContainer from "@/components/containers/AdminContainer";
import Header from "@/components/headers/Header";
import { Button } from "@/components/shadcn/ui/button";
import { Separator } from "@/components/shadcn/ui/separator";
import { useRouter } from "next/navigation";

const Page: React.FC = () => {
  const router = useRouter();

  return (
    <div>
      <Header title="Assessment List" />
      <Separator className="mt-2 w-[95%]" />
      <AdminContainer>
        <Button
          className="self-end"
          onClick={() => router.push("assessments/new")}
        >
          Add Assessment
        </Button>
      </AdminContainer>
    </div>
  );
};

export default Page;
