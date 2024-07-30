"use client";

import React from "react";
import { Formik, Form, Field } from "formik";
import { Input } from "@/components/shadcn/ui/input";

import LoadingButton from "@/components/buttons/LoadingButton";
import { loginSchema } from "@/lib/form-validation/user";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Tablet } from "lucide-react";

const Page: React.FC = () => {
  const router = useRouter();

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <header className="mb-5 pb-5">
        <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">
          Welcome to Business Assessment Admin Portal
        </h1>
      </header>
      <div className="w-1/4 items-center rounded-xl bg-card p-5">
        <Formik
          initialValues={{ username: "", password: "" }}
          // validationSchema={loginSchema}
          onSubmit={(values, { setSubmitting }) => {
            // setTimeout(() => {
            //   setSubmitting(false);
            //   router.push("/admin/assessments");
            // }, 2000);
            // Check if the provided username and password are "admin"
            if (values.username === "admin" && values.password === "admin") {
              setTimeout(() => {
                setSubmitting(false);
                router.push("/admin/assessments");
              }, 2000);
            } else {
              // Handle incorrect credentials (e.g., display an error message)
              console.error("Invalid username or password");
              // You can also set an error state and display it in your UI.
              toast.error("Invalid credentials");
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form noValidate className="flex flex-col gap-3">
              <Field required name="username" component={Input} />
              <Field
                required
                type="password"
                name="password"
                component={Input}
              />
              <LoadingButton
                type="submit"
                isLoading={isSubmitting}
                disabled={isSubmitting}
              >
                Login
              </LoadingButton>
            </Form>
          )}
        </Formik>
      </div>
      <div className="flex items-center gap-1 mt-2" style={{marginRight: '65px'}}>
        <Tablet
          className="opacity-50"
          size={16}
          style={{ transform: "rotate(-0.25turn)" }}
        />
        <span className="text-xs opacity-75">
          Best in landscape for a phone or tablet
        </span>
      </div>
    </div>
  );
};

export default Page;
