"use client";

import React from "react";
import Header from "@/components/headers/Header";
import { Separator } from "@/components/shadcn/ui/separator";
import AdminContainer from "@/components/containers/AdminContainer";
import { Button } from "@/components/shadcn/ui/button";
import { Formik, Field, Form } from "formik";
import { Input } from "@/components/shadcn/ui/input";
import SearchSelector from "@/components/searchSelector/SearchSelector";
import { Label } from "@/components/shadcn/ui/label";

export type Assessment = {
  name: string;
  required_completions: number;
  maturity_models: {
    label: string;
    value: string;
  }[];
};

const initialValues: Assessment = {
  name: "",
  required_completions: 0,
  maturity_models: [],
};

const dummyList = [
  { label: "word1", value: "word1" },
  { label: "word2", value: "word2" },
  { label: "word3", value: "word3" },
  { label: "word4", value: "word4" },
  { label: "word5", value: "word5" },
  { label: "word6", value: "word6" },
  { label: "word7", value: "word7" },
  { label: "word8", value: "word8" },
  { label: "word9", value: "word9" },
  { label: "word10", value: "word10" },
  { label: "word11", value: "word11" },
  { label: "word12", value: "word12" },
  { label: "word13", value: "word13" },
  { label: "word14", value: "word14" },
  { label: "word15", value: "word15" },
  { label: "word16", value: "word16" },
  { label: "word17", value: "word17" },
  { label: "word18", value: "word18" },
  { label: "word19", value: "word19" },
  { label: "word20", value: "word20" },
];

const Page: React.FC = () => {
  return (
    <>
      <div>
        <Header title="Add assessment" />
        <Separator className="mt-2 w-[95%]" />
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            // Display form field values in alert on form submission

            console.log(values);
          }}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <AdminContainer>
                <Field
                  name="name"
                  label="Assessment name:"
                  placeholder="Name"
                  component={Input}
                  required
                />
                <Field
                  name="required_completions"
                  label="Required completions:"
                  placeholder="Required completions"
                  component={Input}
                  type="number"
                  required
                />
                <div className="flex flex-col gap-2">
                  <Label>Select Models:</Label>
                  <SearchSelector
                    itemList={dummyList}
                    selectedModels={values.maturity_models}
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
    </>
  );
};

export default Page;
