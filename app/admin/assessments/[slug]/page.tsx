import { getAssessmentById } from "@/api/assessments";
import EditAssessments from "./EditAssessments";

export default async function Page({ params: { slug } }: any) {
  const initialData = await getAssessmentById(slug);
  const newInitialData = {
    ...initialData,
    assessment_model_ids: initialData.assessment_model_ids.map((item: any) => ({
      name: item.name,
      _id: item._id,
    })),
  };
  return (
    <>
      <EditAssessments key={slug} initialValues={newInitialData} />
    </>
  );
}
