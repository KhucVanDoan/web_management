import * as Yup from 'yup'

export const formSchema = (t) =>
  Yup.object().shape({
    items: Yup.array().of(
      Yup.object().shape({
        itemCode: Yup.object().nullable().required(t('general:form.required')),
        exportedQuantity: Yup.number()
          .nullable()
          .required(t('general:form.required')),
        locator: Yup.object().nullable().required(t('general:form.required')),
      }),
    ),
  })
