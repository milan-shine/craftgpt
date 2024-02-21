import { getModelById } from "@/api/assessment-models";
import ModalFormTest from "../components/ModalFormTest";

interface PageProps {
  params: { slug: string };
}

export default async function Page({ params: { slug }}: PageProps){
  const initialData = await getModelById(slug);
  //refactor: unified form
  return(
    <>
      <ModalFormTest key={slug} initialValues={initialData}/>
    </>
  )
}