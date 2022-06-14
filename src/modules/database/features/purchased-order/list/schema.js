import * as Yup from 'yup'

export const rejectSchema = (t) =>
  Yup.object().shape({
    reason: Yup.string().required(t('general:form.required')),
  })
