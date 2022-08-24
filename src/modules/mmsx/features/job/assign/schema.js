import * as Yup from 'yup'

export const validateShema = (t) =>
  Yup.object().shape({
    planDay: Yup.array().nullable().required(t('general:form.required')),
    plan: Yup.object().nullable().required(t('general:form.required')),
    responsibleUser: Yup.object()
      .nullable()
      .required(t('general:form.required')),
  })
