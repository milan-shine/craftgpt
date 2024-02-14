import { GLOBAL_CONFIG } from "@/config/globals";

export const createUser = async (body: any) => {
  console.log(body, 'body')
  try {
    const data = await fetch(`${GLOBAL_CONFIG.API.BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
    if(!data.ok){
      throw new Error('Submission limit exceeded, Please contact Admin')
    }
    return await data.json()
  } catch (error) {
    throw error
  }
};
