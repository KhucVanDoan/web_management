import * as Yup from 'yup'

export const formSchema = (t) =>
  Yup.object().shape({
    deliver: Yup.string().nullable().required(t('general:form.required')),
    receiptDate: Yup.date().nullable().required(t('general:form.required')),
    reason: Yup.object().nullable().required(t('general:form.required')),
    items: Yup.array().of(
      Yup.object().shape({
        returnQuantity: Yup.number()
          .nullable()
          .required(t('general:form.required'))
          .test('', '', (value, context) => {
            if (+value > context?.parent?.returnExportedQuantity) {
              return context.createError({
                message: t('general:form.returnQuantity', {
                  returnQuantity: context?.parent?.returnExportedQuantity,
                }),
              })
            }
            return true
          }),
      }),
    ),
  })
