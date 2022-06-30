import * as Yup from 'yup'

export const schema = (t) =>
  Yup.object().shape({
    code: Yup.string().required(t('general:form.required')),
    name: Yup.string().required(t('general:form.required')),
    items: Yup.array().of(
      Yup.object().shape({
        warehouse: Yup.object().nullable().required(t('general:form.required')),
        area: Yup.number().nullable().required(t('general:form.required')),
        shelf: Yup.number().nullable().required(t('general:form.required')),
        floor: Yup.number().nullable().required(t('general:form.required')),
      }),
    ),
  })
