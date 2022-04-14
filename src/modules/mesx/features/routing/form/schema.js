import * as Yup from 'yup'

export const validationSchema = (t) =>
  Yup.object().shape({
    code: Yup.string().required(t('general:form.required')),
    name: Yup.string().required(t('general:form.required')),
    description: Yup.string(),
    items: Yup.array().of(
      Yup.object().shape({
        itemId: Yup.number().required(t('general:form.required')),
      }),
    ),
  })
