import { GLOBAL_CONFIG } from "@/config/globals";

export const createAssessment = async (body: any) => {
  const data = await fetch(`${GLOBAL_CONFIG.API.BASE_URL}/assessments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
  return data;
};

export const getAssessments = async () => {
  const data = await fetch(`${GLOBAL_CONFIG.API.BASE_URL}/assessments`)
    .then((res) => res.json())
    .catch((err) => console.log(err));
  return data?.data || [];
};

export const getAssessmentByAccessCode = async (accessCode: string) => {
  const data = await fetch(
    `${GLOBAL_CONFIG.API.BASE_URL}/assessments?access-code=${accessCode}`,
  )
    .then((res) => res.json())
    .catch((err) => console.log(err));
  return data?.data[0] || {};
};

export const deleteAssessment = async (id: string) => {
  const data = await fetch(`${GLOBAL_CONFIG.API.BASE_URL}/assessments/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));

  return data?.data;
};

export const getAssessmentById = async (id: string) => {
  const data = await fetch(`${GLOBAL_CONFIG.API.BASE_URL}/assessments/${id}`, {cache: 'no-store'})
    .then((res) => res.json())
    .catch((err) => console.log(err));
  return data?.data || [];
};

export const getAssessmentSubmissionById = async (id: string) => {
  const data = await fetch(`${GLOBAL_CONFIG.API.BASE_URL}/assessments/assessment-submission/${id}`, {cache: 'no-store'})
    .then((res) => res.json())
    .catch((err) => console.log(err));
  return data?.data || [];
};

export const getUserAssessmentSubmission = async (assessment_id: string, user_id: string) => {
  const data = await fetch(`${GLOBAL_CONFIG.API.BASE_URL}/assessment-submission?assessment_id=${assessment_id}&user_id=${user_id}`, {cache: 'no-store', method: "GET"})
    .then((res) => res.json())
    .catch((err) => console.log(err));
  return data;
};

export const updateAssessment = async (id: string, body: any) => {
  const data = await fetch(`${GLOBAL_CONFIG.API.BASE_URL}/assessments/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body)
  })
    .then(res => res.json())
    .catch(err => console.log(err))

    return data
}

export const exportExcel = async (assessment_id: string, user_id: string, fileName: string) => {
  const response = await fetch(`${GLOBAL_CONFIG.API.BASE_URL}/assessment-submission/export-excel?assessment_id=${assessment_id}&user_id=${user_id}`, {cache: 'no-store', method: "GET"});
  const data = await response.blob();
  const url = window.URL.createObjectURL(data);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};