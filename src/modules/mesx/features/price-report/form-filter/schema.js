import * as Yup from 'yup'

export const filterSchema = (t) =>
  Yup.object().shape({
    moCode: Yup.object().nullable().required(t('general:form.required')),
  })
