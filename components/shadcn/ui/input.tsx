import * as React from "react";

import { cn } from "@/lib/utils";
import { Label } from "./label";
import ErrorMessage from "@/components/errors/ErrorMessage";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  field?: any;
  form?: any;
  label?: any;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, field, label, form, type, ...props }, ref) => {
    const isError = form?.touched[field.name] && form?.errors[field.name];
    return (
      <>
        <Label>
          {label || field?.name.toUpperCase().replace(/_/g, " ")}
          {props.required && <span className="text-red-500">*</span>}
        </Label>
        <input
          {...field}
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            `${isError && "ring-2 ring-red-500"}`,
            className
          )}
          ref={ref}
          {...props}
        />
        <ErrorMessage
          error={form?.touched[field.name] && form?.errors[field.name]}
        />
      </>
    );
  }
);
Input.displayName = "Input";

export { Input };
