import { GLOBAL_CONFIG } from "@/config/globals";

export const createModel = async (body: any) => {
  const data = await fetch(
    `${GLOBAL_CONFIG.API.BASE_URL}/maturity-models`, 
        {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        }
  ).then((response) => response.json()).catch(err => console.log(err));
  return data;
};
