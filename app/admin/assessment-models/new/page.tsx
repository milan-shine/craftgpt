"use client";

import React from "react";
import { Input } from "@/components/shadcn/ui/input";
import { Formik, Field, FieldArray, Form } from "formik";
import { Button } from "@/components/shadcn/ui/button";
import { FileSpreadsheet, Trash } from "lucide-react";
import AdminFormContainer from "@/components/containers/AdminContainer";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createModel } from "@/api/assessment-models";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { assessmentModelSchema } from "@/lib/form-validation/user";

export type Question = {
  content: string;
  options: { level: number; content: string }[];
};

export type MaturityModel = {
  name: string;
  description: string;
  questions: Question[];
  file: File | null;
};

const initialValues: MaturityModel = {
  name: "",
  description: "",
  questions: [],
  file: null,
};

const initialQuestionValues: Question = {
  content: "",
  options: [
    { level: 1, content: "" },
    { level: 2, content: "" },
    { level: 3, content: "" },
    { level: 4, content: "" },
    { level: 5, content: "" },
  ],
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
            <Form>
              <AdminFormContainer>
                <Field
                  name="name"
                  label="Model name:"
                  placeholder="Name"
                  component={Input}
                />
                <Field
                  name="description"
                  label="Model Description:"
                  placeholder="Description"
                  component={Input}
                />
                <Input
                  type="file"
                  name="file"
                  label="Add File:"
                  onChange={(e) => {
                    setFieldValue("file", e.target.files![0]);
                  }}
                />
                <a
                  href="/sample.xlsx"
                  download="sample"
                  className="flex cursor-pointer items-center gap-2 self-end rounded-lg bg-green-800 p-2 text-white hover:bg-green-700"
                  onClick={() => console.log("imported")}
                >
                  <FileSpreadsheet />
                  <span>Download Sample file</span>
                </a>
                <FieldArray name="questions">
                  {({ insert, remove, push }) => (
                    <div>
                      {values.questions.length > 0 &&
                        values.questions.map((question, index) => (
                          <div
                            className="mb-4 rounded-xl bg-card p-6"
                            key={index}
                          >
                            <div className="flex items-end justify-between gap-4">
                              <div className="w-full">
                                <Field
                                  name={`questions.${index}.content`}
                                  label={`Question ${index + 1}:`}
                                  placeholder="Question"
                                  component={Input}
                                  required
                                />
                              </div>
                              <Button onClick={() => remove(index)}>
                                <Trash />
                              </Button>
                            </div>
                            <div className="flex flex-col gap-1 pl-6 pr-0 pt-4">
                              {question.options.map((option, optionIndex) => (
                                <Field
                                  name={`questions.${index}.options.${optionIndex}.content`}
                                  label={`Level ${optionIndex + 1}: ${
                                    LEVEL_TITLES[optionIndex]
                                  }`}
                                  placeholder={`Option ${optionIndex + 1}`}
                                  key={optionIndex}
                                  component={Input}
                                  required
                                />
                              ))}
                            </div>
                          </div>
                        ))}

                      <Button
                        type="button"
                        onClick={() => push(initialQuestionValues)}
                      >
                        Add Question
                      </Button>
                    </div>
                  )}
                </FieldArray>

                <Button type="submit" className="self-end">
                  Submit
                </Button>
              </AdminFormContainer>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Page;
