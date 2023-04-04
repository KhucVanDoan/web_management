import * as Yup from 'yup'

export const filterSchema = (t) =>
  Yup.object().shape({
    department: Yup.object().nullable().required(t('general:form.required')),
    userRole: Yup.object().nullable().required(t('general:form.required')),
  })
