import * as Yup from 'yup'

export const formSchema = (t) =>
  Yup.object().shape({
    formType: Yup.object().nullable().required(t('general:form.required')),
    items: Yup.array().of(
      Yup.object().shape({
        role: Yup.object().nullable().required(t('general:form.required')),
        signerName: Yup.string().required(t('general:form.required')),
      }),
    ),
  })