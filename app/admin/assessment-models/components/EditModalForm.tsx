"use client";

import React from "react";
import { Formik } from "formik";
("lucide-react");
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { updateModel, getModelById } from "@/api/assessment-models";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { assessmentModelSchema } from "@/lib/form-validation/user";
import ModelForm from "./ModelForm";

export type Question = {
  content: string;
  options: { level: number; content: string }[];
};

export type MaturityModel = {
  name: string;
  description: string;
  type: {
    name: string;
    value: string;
  }[];
  questions: Question[];
  file: File | null;
};

const LEVEL_TITLES = [
  "Initial",
  "Developing",
  "Defined",
  "Managed",
  "Optimized",
];

const EditModalForm = ({ initialValues }: any) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { slug } = useParams<any>();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ id, body }: { id: string; body: any }) =>
      updateModel(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assessments"] });
      toast.success("Updated successfully");
      router.push("/admin/assessment-models");
    },
  });

  const initialModal: MaturityModel = {
    name: initialValues.name,
    description: initialValues.description,
    type: [{ name: initialValues.type.name, value: initialValues.type._id }],
    questions: [],
    file: null,
  };
  return (
    <>
      <div className="w-[60%]">
        <Formik
          initialValues={initialModal}
          validationSchema={assessmentModelSchema}
          onSubmit={({ questions, ...values }, actions): any => {
            const questionsData = questions?.map((question) => ({
              ...question,
              options: question.options?.map((option) => ({
                ...option,
                level_name: LEVEL_TITLES[option.level - 1],
                score: option.level,
              })),
            }));

            let modelData;
            if (values.file) {
              const formData = new FormData();

              for (let key in values) {
                const value = values[key as keyof typeof values];
                if (typeof value === "string" || value instanceof Blob) {
                  formData.append(key, value);
                }
              }

              modelData = { data: formData, file: true };
            } else {
              modelData = {
                data: { ...values, questions: questionsData },
                file: false,
              };
            }

            mutate({
              id: slug,
              body: { ...values, type: values.type[0].value },
            });
          }}
        >
          {({ values, setFieldValue }) => (
            <ModelForm
              setFieldValue={setFieldValue}
              values={values}
              isPending={isPending}
            />
          )}
        </Formik>
      </div>
    </>
  );
};

export default EditModalForm;
