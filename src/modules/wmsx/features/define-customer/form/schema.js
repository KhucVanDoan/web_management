import * as Yup from 'yup'

const defineCustomerSchema = (t) =>
  Yup.object().shape({
    code: Yup.string().required(t('general:form.required')),
    name: Yup.string().required(t('general:form.required')),
    email: Yup.string().nullable().email(t('general:form.validEmail')),
  })

export default defineCustomerSchema
