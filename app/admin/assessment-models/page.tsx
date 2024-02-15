import React from "react";
import Models from "./Models";
import { getModels } from "@/api/assessment-models";

const Page: React.FC = async () => {
  const initialData = await getModels();
  return <Models inititalModelList={initialData} />;
};

export default Page;
