import { GLOBAL_CONFIG } from "@/config/globals";

export const createModel = async (body: any) => {
  let data;

  if (body.file) {
    data = await fetch(
      `${GLOBAL_CONFIG.API.BASE_URL}/maturity-models/upload-models`,
      {
        method: "POST",
        body: body.data,
      },
    )
      .then((response) => response.json())
      .catch((err) => console.log(err));
  } else {
    data = await fetch(`${GLOBAL_CONFIG.API.BASE_URL}/maturity-models`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body.data),
    })
      .then((response) => response.json())
      .catch((err) => console.log(err));
  }
  return data;
};

export const getModels = async () => {
  const data = await fetch(`${GLOBAL_CONFIG.API.BASE_URL}/maturity-models`)
    .then((res) => res.json())
    .catch((err) => console.log(err));

  return data?.data || [];
};

export const getModelById = async (id: string) => {
  const data = await fetch(
    `${GLOBAL_CONFIG.API.BASE_URL}/maturity-models/${id}`,
  )
    .then((res) => res.json())
    .catch((err) => console.log(err));

  return data?.data;
};
