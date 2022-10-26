import * as Yup from 'yup'

export const formSchema = (t) =>
  Yup.object().shape({
    items: Yup.array().of(
      Yup.object().shape({
        locator: Yup.object().nullable().required(t('general:form.required')),
        itemCode: Yup.object().nullable().required(t('general:form.required')),
        inputedQuantity: Yup.number()
          .nullable()
          .required(t('general:form.required')),
        // .test('', '', (val, context) => {
        //   const items = context?.from[1]?.value?.items
        //   const stockQuantity = +context?.parent?.locator?.quantity
        //   if (val > stockQuantity) {
        //     context.createError(
        //       t('general:form.minNumber', {
        //         min: stockQuantity,
        //       }),
        //     )
        //   }
        //   if (!val) {
        //     context.createError(t('general:form.required'))
        //   }
        //   return true
        // }),
      }),
    ),
  })
