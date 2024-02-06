"use client";

import React from "react";
import Header from "@/components/headers/Header";
import { Input } from "@/components/shadcn/ui/input";
import { Formik, Field, FieldArray, Form } from "formik";
import { Button } from "@/components/shadcn/ui/button";
import { FileSpreadsheet, Trash } from "lucide-react";
import { Separator } from "@/components/shadcn/ui/separator";
import AdminFormContainer from "@/components/containers/AdminContainer";

export type Question = {
  content: string;
  options: { level: number; content: string }[];
};

export type MaturityModel = {
  name: string;
  description: string;
  questions: Question[];
};

const initialValues: MaturityModel = {
  name: "",
  description: "",
  questions: [
    {
      content: "",
      options: [
        { level: 1, content: "" },
        { level: 2, content: "" },
        { level: 3, content: "" },
        { level: 4, content: "" },
        { level: 5, content: "" },
      ],
    },
  ],
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
  return (
    <>
      <div>
        <Header title="Add Assessment model" />
        <Separator className="mt-2 w-[95%]" />
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            // Display form field values in alert on form submission

            const questionsData = values.questions?.map((question) => ({
              ...question,
              options: question.options?.map((option) => ({
                ...option,
                level_name: LEVEL_TITLES[option.level - 1],
                score: option.level,
              })),
            }));

            const modelData = { ...values, questions: questionsData };
            console.log(modelData);
          }}
        >
          {({ values }) => (
            <Form>
              <AdminFormContainer>
                <Field
                  name="name"
                  label="Model name:"
                  placeholder="Name"
                  component={Input}
                  required
                />
                <Field
                  name="description"
                  label="Model Description:"
                  placeholder="Description"
                  component={Input}
                  required
                />
                <Button
                  className="flex gap-2 self-end bg-green-800 hover:bg-green-700"
                  onClick={() => console.log("imported")}
                >
                  <FileSpreadsheet />
                  <span>Import Data</span>
                </Button>
                <FieldArray name="questions">
                  {({ insert, remove, push }) => (
                    <div>
                      {values.questions.length > 0 &&
                        values.questions.map((question, index) => (
                          <div
                            className="bg-card mb-4 p-6 rounded-xl"
                            key={index}
                          >
                            <div className="flex gap-4 items-end justify-between">
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
                            <div className="flex flex-col gap-1 pl-6 pt-4 pr-0">
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
