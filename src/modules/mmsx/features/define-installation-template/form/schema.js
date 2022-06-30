import * as Yup from 'yup'

export const validateShema = (t) => {
  return Yup.object().shape({
    code: Yup.string().required(t('general:form.required')),
    name: Yup.string().required(t('general:form.required')),
    items: Yup.array().of(
      Yup.object().shape({
        title: Yup.string().required(t('general:form.required')),
        description: Yup.string().required(t('general:form.required')),
      }),
    ),
  })
}
