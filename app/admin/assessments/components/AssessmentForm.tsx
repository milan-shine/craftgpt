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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createAssessment, updateAssessment } from "@/api/assessments";
import { getModels } from "@/api/assessment-models";
import { toast } from "sonner";
import { useParams, usePathname, useRouter } from "next/navigation";
import { assessmentSchema } from "@/lib/form-validation/user";

export type Assessment = {
  name: string;
  submissions_limit: number;
  assessment_models: {
    name: string;
    value: string;
  }[];
};

const AssessmentForm = ({ initialValues }: any) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { slug } = useParams<any>();

  const { data: models } = useQuery({
    queryKey: ["models"],
    queryFn: getModels,
    initialData: initialValues,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, body }: { id: string; body: any }) =>
      updateAssessment(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assessments"] });
      toast.success("Updated successfully");
      router.push("/admin/assessments");
    },
  });

  const initialAssessment = {
    name: initialValues.name || "",
    submissions_limit: initialValues.submissions_limit || 1,
    assessment_models: initialValues.assessment_model_ids || [],
  };
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
        initialValues={initialAssessment}
        validationSchema={assessmentSchema}
        onSubmit={(values, actions): any => {
          // Display form field values in alert on form submission
          const assessment = {
            name: values.name,
            submissions_limit: values.submissions_limit,
            assessment_model_ids: values.assessment_models.map(
              (model: any) => model.value,
            ),
          };
          updateMutation.mutate({
            id: slug,
            body: values,
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

export default AssessmentForm;
