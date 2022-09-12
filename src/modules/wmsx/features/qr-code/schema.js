import * as Yup from 'yup'

export const formSchema = (t) =>
  Yup.object().shape({
    dataValue: Yup.string().required(t('general:form.required')),
    value1: Yup.string().required(t('general:form.required')),
    value2: Yup.string().required(t('general:form.required')),
    value3: Yup.string().required(t('general:form.required')),
    idenValue: Yup.string().required(t('general:form.required')),
  })
