import * as Yup from 'yup'

const defineRoleSchema = (t) =>
  Yup.object().shape({
    code: Yup.string().required(t('general:form.required')),
    name: Yup.string().required(t('general:form.required')),
  })

export default defineRoleSchema