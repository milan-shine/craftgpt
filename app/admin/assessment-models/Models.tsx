"use client";

import AdminContainer from "@/components/containers/AdminContainer";
import Header from "@/components/headers/Header";
import { Button } from "@/components/shadcn/ui/button";
import { Separator } from "@/components/shadcn/ui/separator";
import ModelList from "./ModelList";
import { useRouter } from "next/navigation";

const Models = ({ inititalModelList }: { inititalModelList: any }) => {
  const router = useRouter();

  return (
    <div>
      <AdminContainer>
        <Button
          className="self-end"
          onClick={() => router.push("assessment-models/new")}
        >
          Add Model
        </Button>
        <ModelList initialData={inititalModelList} />
      </AdminContainer>
    </div>
  );
};

export default Models;
