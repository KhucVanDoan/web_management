import * as Yup from 'yup'

export const formSchema = (t) =>
  Yup.object().shape({
    items: Yup.array().of(
      Yup.object().shape({
        itemCode: Yup.object().nullable().required(t('general:form.required')),
        receivedQuantity: Yup.number()
          .nullable()
          .required(t('general:form.required'))
          .test('', '', (value, context) => {
            const totalReceivedQuantity = context?.from[1]?.value?.items
              .filter(
                (item) =>
                  item.itemCode?.itemId === context?.parent?.itemCode?.itemId &&
                  item?.lotNumber?.lotNumber ===
                    context?.parent?.lotNumber?.lotNumber &&
                  item?.id !== context?.parent?.row?.id,
              )
              .reduce((prev, cur) => prev + Number(cur.receivedQuantity), 0)
            if (
              totalReceivedQuantity &&
              totalReceivedQuantity !== context?.parent?.importQuantity
            ) {
              return context.createError({
                message: t('general:form.equalItem', {
                  quantity: context?.parent?.importQuantity,
                }),
              })
            }
            return true
          }),
        locator: Yup.object().nullable().required(t('general:form.required')),
      }),
    ),
  })
