import * as Yup from 'yup'

export const validateSchema = (t) =>
  Yup.object().shape({
    code: Yup.string().required(t('general:form.required')),
    name: Yup.string().required(t('general:form.required')),
    unit: Yup.string().required(t('general:form.required')),
  })
