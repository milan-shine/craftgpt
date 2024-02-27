import { getModelById } from "@/api/assessment-models";
import EditModalForm from "../components/EditModalForm";

interface PageProps {
  params: { slug: string };
}

export default async function Page({ params: { slug } }: PageProps) {
  const initialData = await getModelById(slug);
  //refactor: unified form
  return (
    <>
      <EditModalForm key={slug} initialValues={initialData} />
    </>
  );
}
