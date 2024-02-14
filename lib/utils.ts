import { type ClassValue, clsx } from "clsx"
import { toast } from "sonner"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const catchApiError = (err: any) => {
  // Use Promise.reject to pass the error to the next catch block
  return Promise.reject(err).catch((error: any) => {
    // Display the error message using the toast library
    toast.error(error.message);
    // You can also log the error to the console or perform additional actions if needed
    console.error('API Error:', error);
    // Propagate the error to the next catch block if necessary
    throw error;
  });
};