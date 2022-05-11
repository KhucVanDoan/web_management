import * as Yup from 'yup'

const defineVendorSchema = (t) =>
  Yup.object().shape({
    code: Yup.string().required(t('general:form.required')),
    name: Yup.string().required(t('general:form.required')),
  })

export default defineVendorSchema
