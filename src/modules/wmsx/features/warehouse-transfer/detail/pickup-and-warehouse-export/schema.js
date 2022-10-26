import * as Yup from 'yup'

export const formSchema = (t) =>
  Yup.object().shape({
    items: Yup.array().of(
      Yup.object().shape({
        locator: Yup.object().nullable().required(t('general:form.required')),
        itemCode: Yup.object().nullable().required(t('general:form.required')),

        ExportedQuantity: Yup.number()
          .nullable()
          .required(t('general:form.required'))
          .test('', '', (val, context) => {
            if (!val) {
              context.createError(t('general:form.required'))
            }
            return true
          }),
      }),
    ),
  })
