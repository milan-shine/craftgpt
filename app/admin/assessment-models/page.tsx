import React from "react";
import AdminContainer from "@/components/containers/AdminContainer";
import Header from "@/components/headers/Header";
import { Button } from "@/components/shadcn/ui/button";
import { Separator } from "@/components/shadcn/ui/separator";
import { useRouter } from "next/navigation";
import Models from "./Models";
import { getModels } from "@/api/assessment-models";
import BreadcrumbView from "@/components/breadcrumbs/BreadcrumbView";

const Page: React.FC = async () => {
  const initialData = await getModels();
  return (
      <Models inititalModelList={initialData} />
  );
};

export default Page;
