import * as Yup from 'yup'

export const schema = (t) =>
  Yup.object().shape({
    code: Yup.string().required(t('general:form.required')),
    name: Yup.string().required(t('general:form.required')),
    items: Yup.array().of(
      Yup.object().shape({
        warehouse: Yup.object().nullable().required(t('general:form.required')),
        area: Yup.object().nullable().required(t('general:form.required')),
        shelf: Yup.object().nullable().required(t('general:form.required')),
        floor: Yup.object().nullable().required(t('general:form.required')),
      }),
    ),
  })
