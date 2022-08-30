import * as Yup from 'yup'

export const validateShema = (t) =>
  Yup.object().shape({
    code: Yup.string().required(t('general:form.required')),
    name: Yup.string().required(t('general:form.required')),
    companyId: Yup.string().nullable().required(t('general:form.required')),
    description: Yup.string().required(t('general:form.required')),
    accountant: Yup.string().required(t('general:form.required')),
  })
