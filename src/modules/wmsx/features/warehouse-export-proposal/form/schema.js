import * as Yup from 'yup'

export const defineSchema = (t) =>
  Yup.object().shape({
    dear: Yup.string().nullable().required(t('general:form.required')),
    proponent: Yup.string().nullable().required(t('general:form.required')),
    nameAddressOfRecipient: Yup.string()
      .nullable()
      .required(t('general:form.required')),
    construction: Yup.object().nullable().required(t('general:form.required')),
    createdAtPaper: Yup.date().nullable().required(t('general:form.required')),
    reasonUse: Yup.string().nullable().required(t('general:form.required')),
    items: Yup.array().of(
      Yup.object().shape({
        suppliesName: Yup.object()
          .nullable()
          .required(t('general:form.required')),
        quantityRequest: Yup.number()
          .nullable()
          .required(t('general:form.required')),
      }),
    ),
  })
