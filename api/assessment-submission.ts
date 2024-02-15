import { GLOBAL_CONFIG } from "@/config/globals";
import { catchApiError } from "@/lib/utils";
import { toast } from "sonner";

export const submitAssessment = async (body: any) => {
  const data = await fetch(
    `${GLOBAL_CONFIG.API.BASE_URL}/assessment-submission`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  )
    .then((res) => res.json())
    .catch((error) => {
        // catchApiError(error);
        throw error;
    });
  return data;
};
