import { GLOBAL_CONFIG } from "@/config/globals";
import { Console } from "console";

export const createModel = async (body: any) => {
  const data = await fetch(`${GLOBAL_CONFIG.API.BASE_URL}/maturity-models`, {
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

export const getModels = async () => {
  const data = await fetch(
    `${GLOBAL_CONFIG.API.BASE_URL}/maturity-models`,
  ).then((res) => res.json());

  return data.data;
};

export const getModelById = async (id: string) => {
  const data = await fetch(
    `${GLOBAL_CONFIG.API.BASE_URL}/maturity-models/${id}`,
  ).then((res) => res.json());

  return data.data;
};
