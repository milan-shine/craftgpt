import { getAssessmentById } from "@/api/assessments";
import AssessmentForm from "../components/AssessmentForm"

export default async function Page({ params: { slug }}: any){
  const initialData = await getAssessmentById(slug);
    
    return(
        <>
            <AssessmentForm initialValues={initialData}/>
        </>
    )
}