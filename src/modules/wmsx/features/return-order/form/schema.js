import * as Yup from 'yup'

import { NUMBER_FIELD_REQUIRED_SIZE } from '~/common/constants'

export const returnOrderSchema = (t, itemByOrderList) => {
  return Yup.object().shape({
    code: Yup.string().required(t('general:form.required')),
    name: Yup.string().required(t('general:form.required')),
    deadline: Yup.date().nullable().required(t('general:form.required')),
    letterCode: Yup.object().nullable().required(t('general:form.required')),
    orderCode: Yup.object().nullable().required(t('general:form.required')),
    description: Yup.string(),
    items: Yup.array().of(
      Yup.object()
        .shape({
          itemId: Yup.object().nullable().required(t('general:form.required')),
          lotNumber: Yup.string()
            .nullable()
            .required(t('general:form.required')),
          ...(itemByOrderList?.items?.[0]?.actualQuantity
            ? {
                quantity: Yup.number()
                  .required(t('general:form.required'))
                  .min(
                    NUMBER_FIELD_REQUIRED_SIZE.QUANTITY.MIN,
                    t('general:form.minNumber', {
                      min: NUMBER_FIELD_REQUIRED_SIZE.QUANTITY.MIN,
                    }),
                  )
                  .max(
                    Number(itemByOrderList?.items?.[0]?.actualQuantity),
                    t('general:form.maxNumber', {
                      max: Number(itemByOrderList?.items?.[0]?.actualQuantity),
                    }),
                  ),
              }
            : {}),
        })
        .test('name', '', (value, context) => {
          if (
            (value.packageId === null || value.packageId === undefined) &&
            (value.palletId === null || value.palletId === undefined) &&
            value?.evenRow
          ) {
            return context.createError({
              message: t('returnOrder.requirePackageIdOrPalletId'),
              path: `${context.path}.packageId`,
            })
          }
          return true
        }),
    ),
  })
}
