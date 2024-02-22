import { GLOBAL_CONFIG } from "@/config/globals";

export const createModelType = async (body: any) => {
  let data;
  data = await fetch(`${GLOBAL_CONFIG.API.BASE_URL}/model-types`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body.data),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));

  return data;
};

export const getModelType = async () => {
  const data = await fetch(`${GLOBAL_CONFIG.API.BASE_URL}/model-types`)
    .then((res) => res.json())
    .catch((err) => console.log(err));

  return data?.data || [];
};

export const getModelTypeById = async (id: string) => {
  const data = await fetch(`${GLOBAL_CONFIG.API.BASE_URL}/model-types/${id}`)
    .then((res) => res.json())
    .catch((err) => console.log(err));

  return data?.data;
};

export const deleteModelType = async (id: string) => {
  const data = await fetch(`${GLOBAL_CONFIG.API.BASE_URL}/model-types/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));

  return data?.data;
};
