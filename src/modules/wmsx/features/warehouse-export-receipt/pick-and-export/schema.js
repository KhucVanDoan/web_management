import * as Yup from 'yup'

export const formSchema = (t) =>
  Yup.object().shape({
    items: Yup.array().of(
      Yup.object().shape({
        itemCode: Yup.object().nullable().required(t('general:form.required')),
        exportedQuantity: Yup.number()
          .nullable()
          .required(t('general:form.required'))
          .test('', '', (value, context) => {
            if (+value > +context?.parent?.planQuantity) {
              return context.createError({
                message: t('general:form.maxNumber', {
                  max: context?.parent?.planQuantity,
                }),
              })
            }
            if (+value > +context?.parent?.quantity) {
              return context.createError({
                message: t('general:form.maxNumber', {
                  max: context?.parent?.quantity,
                }),
              })
            }
          }),
        locator: Yup.object().nullable().required(t('general:form.required')),
      }),
    ),
  })
