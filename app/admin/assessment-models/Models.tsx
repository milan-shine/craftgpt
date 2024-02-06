"use client";

import AdminContainer from "@/components/containers/AdminContainer";
import Header from "@/components/headers/Header";
import { Button } from "@/components/shadcn/ui/button";
import { Separator } from "@/components/shadcn/ui/separator";
import ModelList from "./ModelList";
import { useQuery } from "@tanstack/react-query";
import { getModels } from "@/api/assessment-models";
import { useRouter } from "next/navigation";

const Models = ({ inititalModelList }: { inititalModelList: any }) => {
  const router = useRouter();
  const { data } = useQuery({
    queryKey: ["models"],
    queryFn: getModels,
    initialData: { inititalModelList },
  });

  return (
    <div>
      <Header title="Model List" />
      <Separator className="mt-2 w-[95%]" />
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
