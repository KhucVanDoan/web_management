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
            const stockQuantity = +context?.parent?.locator?.quantity
            if (val === 0) {
              return context.createError({
                message: t('general:form.moreThanNumber', {
                  min: 0,
                }),
              })
            }
            if (val > +stockQuantity) {
              return context.createError({
                message: t('general:form.maxQuantityStock', {
                  max: stockQuantity,
                }),
              })
            }
            return true
          }),
      }),
    ),
  })
