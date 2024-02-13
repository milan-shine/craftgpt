"use client";

import React, { Suspense } from "react";
import { Formik, Form, Field } from "formik";
import { Input } from "@/components/shadcn/ui/input";
import LoadingButton from "@/components/buttons/LoadingButton";
import { loginSchema } from "@/lib/form-validation/user";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { createUser } from "@/api/users";

const Login: React.FC = () => {
  const { mutate } = useMutation({
    mutationFn: createUser,
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const access_code = searchParams.get("access-code");

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <header className="mb-5 pb-5">
        <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">
          Welcome to Business Assessment
        </h1>
      </header>
      <div className="w-1/4 items-center rounded-xl bg-card p-5">
        <Formik
          initialValues={{
            access_code: access_code,
            name: "",
            email: "",
          }}
          validationSchema={loginSchema}
          onSubmit={(values, { setSubmitting }) => {
            mutate(values, {
              onSuccess(data) {
                setTimeout(() => {
                  localStorage.setItem("user", JSON.stringify(data.data));
                  setSubmitting(false);
                  router.push(`/assessment?access-code=${access_code}`);
                }, 1000);
              },
            });
          }}
        >
          {({ isSubmitting }) => (
            <Form noValidate className="flex flex-col gap-3">
              <Field
                label="ASSESSMENT CODE"
                name="access_code"
                component={Input}
                value={access_code}
                className="pointer-events-none"
                disabled
              />
              <Field required name="name" component={Input} />
              <Field required type="email" name="email" component={Input} />
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

const Page = () => {
  return (
    <Suspense>
      <Login />
    </Suspense>
  );
};

export default Page;
