import * as Yup from 'yup'

export const formSchema = (t) =>
  Yup.object().shape({
    code: Yup.string().required(t('general:form.required')),
    warehouse: Yup.object().nullable().required(t('general:form.required')),
    assembly: Yup.object().nullable().required(t('general:form.required')),
    description: Yup.string(),
  })
