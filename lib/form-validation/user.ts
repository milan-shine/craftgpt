import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  access_code: Yup.string().required("Required"),
  name: Yup.string().required("Required"),
  email: Yup.string().email().required("Required"),
});

export const registerSchema = Yup.object().shape({
  fullName: Yup.string().min(8).max(25),
  email: Yup.string().email().required("Required"),
  phoneNumber: Yup.string().length(10),
  password: Yup.string()
    .min(8)
    .max(14)
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}|:"<>?~])/,
      "Password must contain at least one number, one lowercase letter, one uppercase letter, and one special character",
    )
    .required("Required"),
});

export const assessmentModelSchema = Yup.object().shape({
  name: Yup.string().min(4).max(25).required("Required"),
  description: Yup.string().required("Required"),
  // file: Yup.mixed().required("Required"),
  file: Yup.mixed().notRequired() //temporary change to test edit feature
});

export const assessmentSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  submissions_limit: Yup.number().required("Required"),
  assessment_model_ids: Yup.array().of(Yup.string().required("Required")),
});
