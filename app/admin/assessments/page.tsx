import React from "react";
import AdminContainer from "@/components/containers/AdminContainer";
import Header from "@/components/headers/Header";
import { Button } from "@/components/shadcn/ui/button";
import { Separator } from "@/components/shadcn/ui/separator";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getModels } from "@/api/assessment-models";
import ModelList from "../assessment-models/ModelList";
import BreadcrumbView from "@/components/breadcrumbs/BreadcrumbView";

const Page: React.FC = async () => {
  // const router = useRouter();
  const initialData = await getModels()

  return (
    <div>
      <BreadcrumbView>
      <Header title="Assessment List" />
      <Separator className="mt-2 w-[95%]" />
      <AdminContainer>
        {/* <Button
          className="self-end"
          onClick={() => router.push("assessments/new")}
        >
          Add Assessment
        </Button> */}
        <ModelList initialData={initialData}/>
      </AdminContainer>
      </BreadcrumbView>
    </div>
  );
};

export default Page;
