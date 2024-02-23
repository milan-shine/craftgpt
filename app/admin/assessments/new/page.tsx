"use client";

import React, { useEffect, useState } from "react";
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
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { assessmentSchema } from "@/lib/form-validation/user";

export type Assessment = {
  name: string;
  client_code: string;
  submissions_limit: number;
  assessment_models: {
    name: string;
    value: string;
  }[];
};

const tempInitialValues: Assessment = {
  name: "",
  client_code: "",
  submissions_limit: 1,
  assessment_models: [],
};
const Page: React.FC = ({initialValues=tempInitialValues}: any) => {
  const router = useRouter();
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
    <div className="w-[60%]">
      <Formik
        initialValues={initialValues}
        validationSchema={assessmentSchema}
        onSubmit={(values, actions) => {
          // Display form field values in alert on form submission

          const assessment = {
            client_code: values.client_code,
            name: values.name,
            submissions_limit: values.submissions_limit,
            assessment_model_ids: values.assessment_models.map(
              (model: any) => model.value,
            ),
          };

          mutate(assessment, {
            onSuccess() {
              actions.resetForm({
                values: initialValues,
              });
              toast.success("Added successfully");
              router.push("/admin/assessments");
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
                name="client_code"
                label="Client Code:"
                placeholder="Client Code"
                component={Input}
                required
              />
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
                  name="assessment_models"
                  itemList={modelList}
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
