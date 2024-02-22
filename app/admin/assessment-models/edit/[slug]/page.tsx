"use client";

import React from "react";
import { Formik } from "formik";
("lucide-react");
import { useMutation } from "@tanstack/react-query";
import { createModel } from "@/api/assessment-models";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { assessmentModelSchema } from "@/lib/form-validation/user";
import ModelForm from "../../components/ModelForm";

export type Question = {
  content: string;
  options: { level: number; content: string }[];
};

export type MaturityModel = {
  name: string;
  description: string;
  questions: Question[];
  type: string;
  file: File | null;
};

const initialValues: MaturityModel = {
  name: "",
  description: "",
  questions: [],
  type: "",
  file: null,
};

const LEVEL_TITLES = [
  "Initial",
  "Developing",
  "Defined",
  "Managed",
  "Optimized",
];

const Page: React.FC = () => {
  const router = useRouter();
  const { mutate } = useMutation({ mutationFn: createModel });

  return (
    <>
      <div className="w-[60%]">
        <Formik
          initialValues={initialValues}
          validationSchema={assessmentModelSchema}
          onSubmit={({ questions, ...values }, actions) => {
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

            mutate(modelData, {
              onSuccess() {
                actions.resetForm({
                  values: initialValues,
                });
                toast.success("Added successfully");
                router.push("/admin/assessment-models");
              },
              onError(error) {
                console.log(error);
                toast.error("Something went wrong!");
              },
            });
          }}
        >
          {({ values, setFieldValue }) => (
            <ModelForm setFieldValue={setFieldValue} values={values} />
          )}
        </Formik>
      </div>
    </>
  );
};

export default Page;
