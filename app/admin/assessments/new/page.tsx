"use client";

import React from "react";
import { Formik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { createAssessment } from "@/api/assessments";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { assessmentSchema } from "@/lib/form-validation/user";
import AssessmentForm from "../components/AssessmentForm";

export type Assessment = {
  name: string;
  client_code: string;
  submissions_limit: number;
  assessment_model_ids: {
    name: string;
    value: string;
  }[];
};

const tempInitialValues: Assessment = {
  name: "",
  client_code: "",
  submissions_limit: 1,
  assessment_model_ids: [],
};

const Page: React.FC = ({ initialValues = tempInitialValues }: any) => {
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: createAssessment,
  });

  return (
    <div className="w-[60%]">
      <Formik
        initialValues={initialValues}
        validationSchema={assessmentSchema}
        onSubmit={(values, actions) => {
          const assessment = {
            client_code: values.client_code,
            name: values.name,
            submissions_limit: values.submissions_limit,
            assessment_model_ids: values.assessment_model_ids.map(
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
          <AssessmentForm
            values={values}
            setFieldValue={setFieldValue}
            initialValues={initialValues}
            isPending={isPending}
          />
        )}
      </Formik>
    </div>
  );
};

export default Page;
