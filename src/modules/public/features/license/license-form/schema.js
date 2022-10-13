import * as Yup from 'yup'

export const formSchema = (t) =>
  Yup.object().shape({
    license: Yup.string().required(t('general:form.required')),
    numberContract: Yup.string().required(t('general:form.required')),
  })
