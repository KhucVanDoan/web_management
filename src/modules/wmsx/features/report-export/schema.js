import * as Yup from 'yup'

export const formSchema = (t) =>
  Yup.object().shape({
    type: Yup.string().required(t('general:form.required')),
    company: Yup.object().nullable().required(t('general:form.required')),
    fromDate: Yup.string().required(t('general:form.required')),
    fileFormat: Yup.string().required(t('general:form.required')),
  })
