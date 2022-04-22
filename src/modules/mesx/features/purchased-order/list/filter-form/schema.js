import * as Yup from 'yup'

export const filterSchema = (t) =>
  Yup.object().shape({
    code: Yup.string(),
    name: Yup.string(),
    reason: Yup.string().required(t('general:form.required')),
  })
