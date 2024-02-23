import React, { useEffect, useState } from "react";
import { Field, FieldArray, Form } from "formik";
import AdminFormContainer from "@/components/containers/AdminContainer";
import { Input } from "@/components/shadcn/ui/input";
import { FileSpreadsheet, Trash } from "lucide-react";
import { Button } from "@/components/shadcn/ui/button";
import SearchSelector, {
  SelectorListItem,
} from "@/components/search-selector/SearchSelector";
import { Label } from "@/components/shadcn/ui/label";
import { getModelType } from "@/api/model-type";
import { useMutation, useQuery } from "@tanstack/react-query";

export type Question = {
  content: string;
  options: { level: number; content: string }[];
};

const LEVEL_TITLES = [
  "Initial",
  "Developing",
  "Defined",
  "Managed",
  "Optimized",
];

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

const sampleFileUrls: any = {
  "Risk Inheritance": "/Risk_inheritance.xlsx",
  "Risk Likelihood": "/Risk_likelihood.xlsx",
};

const ModelForm: React.FC<{
  setFieldValue: any;
  values: any;
}> = ({ setFieldValue, values }) => {
  const { data: modelType } = useQuery({
    queryKey: ["model-type"],
    queryFn: getModelType,
  });

  const [modelTypeList, setModelTypeList] = useState<SelectorListItem[]>([]);

  useEffect(() => {
    if (modelType?.length > 0) {
      const list = modelType.map((type: any) => ({
        name: type.name,
        value: type._id,
      }));
      setModelTypeList(list);
    }
  }, [modelType]);

  return (
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
        <div className="flex flex-col gap-2 ">
          <Label>Select Model Type:</Label>
          <SearchSelector
            name="type"
            itemList={modelTypeList}
            selectedModels={values.type}
            setFieldValue={setFieldValue}
          />
        </div>

        <Input
          type="file"
          name="file"
          label="Add File:"
          onChange={(e) => {
            setFieldValue("file", e.target.files![0]);
          }}
        />
        <a
          href={sampleFileUrls[values?.type?.[0]?.name] || "/sample.xlsx"}
          download={sampleFileUrls[values?.type?.[0]?.name]}
          className="flex cursor-pointer items-center gap-2 self-end rounded-lg bg-green-800 p-2 text-white hover:bg-green-700"
        >
          <FileSpreadsheet />
          <span>Download Sample file</span>
        </a>
        <FieldArray name="questions">
          {({ insert, remove, push }) => (
            <div>
              {values.questions.length > 0 &&
                values.questions.map((question: any, index: number) => (
                  <div className="mb-4 rounded-xl bg-card p-6" key={index}>
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
                      {question.options.map(
                        (option: any, optionIndex: number) => (
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
                        ),
                      )}
                    </div>
                  </div>
                ))}

              <Button type="button" onClick={() => push(initialQuestionValues)}>
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
  );
};
export default ModelForm;
