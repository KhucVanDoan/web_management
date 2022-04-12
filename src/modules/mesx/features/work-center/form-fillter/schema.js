import * as Yup from 'yup'

export const filterSchema = (t) =>
  Yup.object().shape({
    code: Yup.string().matches(/^[0-9A-Za-z]+$/, t('general:form.validCode')),
  })
