"use client"

import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Input } from '@/components/shadcn/ui/input';
import LoadingButton from '@/components/buttons/LoadingButton';
import { registerSchema } from '@/lib/form-validation/user';

const Page = () => (
  <div className='flex flex-col items-center justify-center h-screen'>
    <div className='w-1/4 items-center p-5 bg-slate-200 rounded-xl'>
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={registerSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 3000);
      }}
    >
      {({ isSubmitting }) => (
        <Form noValidate className='flex flex-col gap-3'>
          <Field required name="Full name" component={Input} />
          <Field required type="email" name="email" component={Input} />
          <Field required type="number" name="Phone number" component={Input} />
          <Field required type="password" name="password" component={Input} />
          <LoadingButton type="submit" isLoading={isSubmitting} disabled={isSubmitting}>
            Register
          </LoadingButton>
        </Form>
      )}
    </Formik>
    </div>
  </div>
);

export default Page;