import * as Yup from 'yup'

export const loginSchema = Yup.object().shape({
    assessment_code: Yup.string().required('Required'),
    username: Yup.string().required('Required'),
    password: Yup.string().min(8).max(14)
    .required('Required')
})

export const registerSchema = Yup.object().shape({
    fullName: Yup.string().min(8).max(25),
    email: Yup.string().email().required('Required'),
    phoneNumber: Yup.string().length(10),
    password: Yup.string().min(8).max(14)
    .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}|:"<>?~])/,
        'Password must contain at least one number, one lowercase letter, one uppercase letter, and one special character'
      ).required('Required')
    })