import * as Yup from 'yup'

import { NUMBER_FIELD_REQUIRED_SIZE } from '~/common/constants'

export const formSchema = (t) =>
  Yup.object().shape({
    reason: Yup.object().nullable().required(t('general:form.required')),
    items: Yup.array().of(
      Yup.object().shape({
        returnQuantity: Yup.number()
          .nullable()
          .required(t('general:form.required'))
          .test('', '', (values, context) => {
            if (values < 0) {
              return context.createError({
                message: t('general:form.moreThanNumber', {
                  min: NUMBER_FIELD_REQUIRED_SIZE.WATTAGE.MIN,
                }),
              })
            } else if (values > context?.parent?.payAbleQuantity) {
              return context.createError({
                message: t('general:form.maxNumber', {
                  max: context?.parent?.payAbleQuantity,
                }),
              })
            }
            return true
          }),
      }),
    ),
  })
