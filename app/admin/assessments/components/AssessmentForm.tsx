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
import LoadingButton from "@/components/buttons/LoadingButton";

const AssessmentForm = ({
  values,
  setFieldValue,
  initialValues,
  isPending,
}: any) => {
  const [modelList, setModelList] = useState<SelectorListItem[]>([]);

  const { data } = useQuery({
    queryKey: ["models"],
    queryFn: getModels,
    initialData: initialValues,
  });

  useEffect(() => {
    if (data?.length > 0) {
      const list = data.map((model: any) => ({
        name: model.name,
        value: model._id,
      }));

      setModelList(list);
    }
  }, [data]);
  return (
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
            name="assessment_model_ids"
            itemList={modelList}
            selectedModels={values.assessment_model_ids}
            setFieldValue={setFieldValue}
          />
        </div>
        <LoadingButton
          isLoading={isPending}
          type="submit"
          onClick={() => console.log("clicked submit")}
          className="self-end"
        >
          Submit
        </LoadingButton>
      </AdminContainer>
    </Form>
  );
};

export default AssessmentForm;
