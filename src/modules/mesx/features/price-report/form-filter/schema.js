import * as Yup from 'yup'

export const filterSchema = (t) =>
  Yup.object().shape({
    moCode: Yup.number().required(t('general:form.required')),
  })
