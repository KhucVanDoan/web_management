import * as Yup from 'yup'

import { NUMBER_FIELD_REQUIRED_SIZE } from '~/common/constants'

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
            if (value <= 0) {
              return context.createError({
                message: t('general:form.moreThanNumber', {
                  min: NUMBER_FIELD_REQUIRED_SIZE.WATTAGE.MIN,
                }),
              })
            } else if (+value > context?.parent?.returnExportedQuantity) {
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
