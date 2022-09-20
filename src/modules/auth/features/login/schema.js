import * as Yup from 'yup'

export const loginSchema = (t) =>
  Yup.object().shape({
    username: Yup.string().required(t('general:form.required')),
    password: Yup.string().required(t('general:form.required')),
  })
