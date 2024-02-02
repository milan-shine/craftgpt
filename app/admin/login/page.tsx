"use client";

import React from "react";
import { Formik, Form, Field } from "formik";
import { Input } from "@/components/shadcn/ui/input";
import LoadingButton from "@/components/buttons/LoadingButton";
import { loginSchema } from "@/lib/form-validation/user";
import { useRouter } from "next/navigation";

const Page: React.FC = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <header className="mb-5 pb-5">
        <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">
          Welcome to Business Assessment Admin Portal
        </h1>
      </header>
      <div className="w-1/4 items-center p-5 bg-card rounded-xl">
        <Formik
          initialValues={{ username: "", password: "" }}
          // validationSchema={loginSchema}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              setSubmitting(false);
              router.push("/admin/maturity-models");
            }, 2000);
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
    </div>
  );
};

export default Page;
