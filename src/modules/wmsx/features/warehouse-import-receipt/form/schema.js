import { isEmpty } from 'lodash'
import * as Yup from 'yup'

import { NUMBER_FIELD_REQUIRED_SIZE } from '~/common/constants'

export const formSchema = (t, valueReceipt) =>
  Yup.object().shape({
    receiptDate: Yup.date().nullable().required(t('general:form.required')),
    deliver: Yup.string().nullable().required(t('general:form.required')),
    departmentReceiptId: Yup.object()
      .nullable()
      .required(t('general:form.required')),
    businessTypeId: Yup.object()
      .nullable()
      .required(t('general:form.required')),
    warehouse: Yup.object().nullable().required(t('general:form.required')),
    reasonId: Yup.object().nullable().required(t('general:form.required')),
    sourceId: Yup.object().nullable().required(t('general:form.required')),
    // contractNumber: Yup.string()
    //   .nullable()
    //   .required(t('general:form.required')),
    items: Yup.array().of(
      Yup.object().shape({
        itemCode:
          isEmpty(valueReceipt) &&
          Yup.object().nullable().required(t('general:form.required')),
        money:
          isEmpty(valueReceipt) &&
          Yup.number()
            .nullable()
            .required(t('general:form.required'))
            .max(
              NUMBER_FIELD_REQUIRED_SIZE.MONEY.MAX,
              t('general:form.maxNumber', {
                max: NUMBER_FIELD_REQUIRED_SIZE.MONEY.MAX,
              }),
            )
            .test('', '', (values, context) => {
              if (values <= 0) {
                return context.createError({
                  message: t('general:form.moreThanNumber', {
                    min: NUMBER_FIELD_REQUIRED_SIZE.WATTAGE.MIN,
                  }),
                })
              }
              return true
            }),
        importQuantity:
          isEmpty(valueReceipt) &&
          Yup.number()
            .nullable()
            .required(t('general:form.required'))
            .test('', '', (values, context) => {
              if (values <= 0) {
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
