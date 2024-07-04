// EditAssessments.jsx
"use client";
import React from "react";
import { Formik } from "formik";
import SearchSelector, {
  SelectorListItem,
} from "@/components/search-selector/SearchSelector";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { updateAssessment } from "@/api/assessments";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { assessmentSchema } from "@/lib/form-validation/user";
import AssessmentForm from "../components/AssessmentForm";

export type Assessment = {
  name: string;
  client_code: string;
  submissions_limit: number;
  assessment_models: string[];
};

export default function EditAssessments({ initialValues }: any) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { slug } = useParams<any>();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ id, body }: { id: string; body: any }) =>
      updateAssessment(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assessments"] });
      toast.success("Updated successfully");
      router.push("/admin/assessments");
    },
    onError: (err: any) => {
      toast.error(err.message);
    },
  });

  return (
    <>
      <div className="w-[60%]">
        <Formik
          initialValues={initialValues}
          validationSchema={assessmentSchema}
          onSubmit={(values): any => {
            const assessment = {
              name: values.name,
              client_code: values.client_code,
              submissions_limit: values.submissions_limit,
              assessment_model_ids: values.assessment_model_ids.map(
                (model: any) => model.value || model._id,
              ),
            };
            mutate({
              id: slug,
              body: assessment,
            });
          }}          
        >
          {({ values, setFieldValue,...rest }) => {
            console.log(rest,"restkar");

            return (
            <AssessmentForm
              values={values}
              setFieldValue={setFieldValue}
              initialValues={initialValues}
              isPending={isPending}
            />
          )}}
        </Formik>
      </div>
    </>
  );
}
