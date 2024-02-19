"use client";

import AdminContainer from "@/components/containers/AdminContainer";
import { Button } from "@/components/shadcn/ui/button";
import ModelList from "./components/ModelList";
import { useRouter } from "next/navigation";

interface IModel {
  _id: string;
  name: string;
  description: string;
}

const Models = ({ inititalModelList }: { inititalModelList: IModel }) => {
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
