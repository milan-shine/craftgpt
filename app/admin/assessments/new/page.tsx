"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/headers/Header";
import { Separator } from "@/components/shadcn/ui/separator";
import AdminContainer from "@/components/containers/AdminContainer";
import { Button } from "@/components/shadcn/ui/button";
import { Formik, Field, Form } from "formik";
import { Input } from "@/components/shadcn/ui/input";
import SearchSelector, {
  SelectorListItem,
} from "@/components/search-selector/SearchSelector";
import { Label } from "@/components/shadcn/ui/label";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createAssessment } from "@/api/assessments";
import { getModels } from "@/api/assessment-models";
import { ScrollArea } from "@/components/shadcn/ui/scroll-area";
import { toast } from "sonner";

export type Assessment = {
  name: string;
  submissions_limit: number;
  assessment_models: {
    name: string;
    value: string;
  }[];
};

const initialValues: Assessment = {
  name: "",
  submissions_limit: 1,
  assessment_models: [],
};

const dummyList = [
  { name: "word1", value: "word1" },
  { name: "word2", value: "word2" },
  { name: "word3", value: "word3" },
  { name: "word4", value: "word4" },
  { name: "word5", value: "word5" },
  { name: "word6", value: "word6" },
  { name: "word7", value: "word7" },
  { name: "word8", value: "word8" },
  { name: "word9", value: "word9" },
  { name: "word10", value: "word10" },
  { name: "word11", value: "word11" },
  { name: "word12", value: "word12" },
  { name: "word13", value: "word13" },
  { name: "word14", value: "word14" },
  { name: "word15", value: "word15" },
  { name: "word16", value: "word16" },
  { name: "word17", value: "word17" },
  { name: "word18", value: "word18" },
  { name: "word19", value: "word19" },
  { name: "word20", value: "word20" },
];

const Page: React.FC = () => {
  const { mutate } = useMutation({ mutationFn: createAssessment });
  const { data: models } = useQuery({
    queryKey: ["models"],
    queryFn: getModels,
  });

  const [modelList, setModelList] = useState<SelectorListItem[]>([]);

  useEffect(() => {
    if (models?.length > 0) {
      const list = models.map((model: any) => ({
        name: model.name,
        value: model._id,
      }));

      setModelList(list);
    }
  }, [models]);

  return (
    <div>
      <Header title="Add assessment" />
      <Separator className="mt-2 w-[95%]" />
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          // Display form field values in alert on form submission

          const assessment = {
            name: values.name,
            submissions_limit: values.submissions_limit,
            assessment_model_ids: values.assessment_models.map(
              (model) => model.value,
            ),
          };

          mutate(assessment, {
            onSuccess(data) {
              console.log(data);
              actions.resetForm({
                values: initialValues,
              });
              toast.success("Added successfully");
            },
            onError(error) {
              console.log(error);
              toast.error("There was some error");
            },
          });
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className="mb-96">
            <AdminContainer>
              <Field
                name="name"
                label="Assessment name:"
                placeholder="Name"
                component={Input}
                required
              />
              <Field
                name="submissions_limit"
                label="Submissions Limit:"
                placeholder="set the limit"
                component={Input}
                type="number"
                required
              />
              <div className="flex flex-col gap-2 ">
                <Label>Select Models:</Label>
                <SearchSelector
                  itemList={modelList}
                  // itemList={dummyList}
                  selectedModels={values.assessment_models}
                  setFieldValue={setFieldValue}
                />
              </div>
              <Button type="submit" className="self-end">
                Submit
              </Button>
            </AdminContainer>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Page;
