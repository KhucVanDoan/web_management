import * as Yup from 'yup'

import { NUMBER_FIELD_REQUIRED_SIZE } from '~/common/constants'

export const validateShema = (t) =>
  Yup.object().shape({
    items: Yup.array().of(
      Yup.object()
        .shape({
          date: Yup.array().nullable().required(t('general:form.required')),
          status: Yup.string().nullable().required(t('general:form.required')),
          manufacturedDevice: Yup.number()
            .nullable()
            .min(
              NUMBER_FIELD_REQUIRED_SIZE.PO_QUANTITY.MIN,
              t('general:form.minNumber', {
                min: NUMBER_FIELD_REQUIRED_SIZE.PO_QUANTITY.MIN,
              }),
            )
            .max(
              NUMBER_FIELD_REQUIRED_SIZE.PO_QUANTITY.MAX,
              t('general:form.maxNumber', {
                max: NUMBER_FIELD_REQUIRED_SIZE.PO_QUANTITY.MAX,
              }),
            ),
          passedDevice: Yup.number()
            .nullable()
            .min(
              NUMBER_FIELD_REQUIRED_SIZE.PO_QUANTITY.MIN,
              t('general:form.minNumber', {
                min: NUMBER_FIELD_REQUIRED_SIZE.PO_QUANTITY.MIN,
              }),
            ),
        })
        .test('quantity', '', (value, context) => {
          if (value?.manufacturedDevice < value?.passedDevice) {
            return context.createError({
              message: t('deviceStatus.tooltipPassedQuantity'),
              path: `${context.path}.passedDevice`,
            })
          }
        }),
    ),
  })
