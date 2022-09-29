import * as Yup from 'yup'

export const formSchema = (t) =>
  Yup.object().shape({
    warehouse: Yup.object().nullable().required(t('general:form.required')),
    assembly: Yup.object().nullable().required(t('general:form.required')),
    description: Yup.string(),
  })
