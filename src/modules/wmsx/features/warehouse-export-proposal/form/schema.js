import * as Yup from 'yup'

import { NUMBER_FIELD_REQUIRED_SIZE } from '~/common/constants'

export const defineSchema = (t) =>
  Yup.object().shape({
    dear: Yup.string().nullable().required(t('general:form.required')),
    proponent: Yup.string().nullable().required(t('general:form.required')),
    nameAddressOfRecipient: Yup.string()
      .nullable()
      .required(t('general:form.required')),
    construction: Yup.object().nullable().required(t('general:form.required')),
    createdAtPaper: Yup.date().nullable().required(t('general:form.required')),
    reasonUse: Yup.string().nullable().required(t('general:form.required')),
    items: Yup.array().of(
      Yup.object().shape({
        suppliesName: Yup.object()
          .nullable()
          .required(t('general:form.required')),
        quantityRequest: Yup.number()
          .nullable()
          .required(t('general:form.required'))
          .test('', '', (value, context) => {
            if (value <= 0) {
              return context.createError({
                message: t('general:form.moreThanNumber', {
                  min: NUMBER_FIELD_REQUIRED_SIZE.WATTAGE.MIN,
                }),
              })
            }
            return true
          }),
        unit: Yup.object().nullable().required(t('general:form.required')),
        importedQuantity: Yup.number()
          .nullable()
          .required(t('general:form.required'))
          .test('', '', (value, context) => {
            if (value <= 0) {
              return context.createError({
                message: t('general:form.moreThanNumber', {
                  min: NUMBER_FIELD_REQUIRED_SIZE.WATTAGE.MIN,
                }),
              })
            }
            return true
          }),
      }),
    ),
  })
