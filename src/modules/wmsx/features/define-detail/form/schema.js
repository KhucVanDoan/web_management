import * as Yup from 'yup'

export const defineDetailSchema = (t) =>
  Yup.object().shape({
    code: Yup.string().required(t('general:form.required')),
    name: Yup.string().required(t('general:form.required')),
    description: Yup.string(),
  })