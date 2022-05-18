import * as Yup from 'yup'

import {
  NUMBER_FIELD_REQUIRED_SIZE,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'

export const saleOrderSchema = (t) => {
  return Yup.object().shape({
    code: Yup.string()
      .required(t('general:form.required'))
      .max(
        TEXTFIELD_REQUIRED_LENGTH.CODE_20.MAX,
        t('general:form.maxLength', {
          max: TEXTFIELD_REQUIRED_LENGTH.CODE_20.MAX,
        }),
      ),
    name: Yup.string()
      .required(t('general:form.required'))
      .max(
        TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
        t('general:form.maxLength', {
          max: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
        }),
      ),
    orderedAt: Yup.date().nullable().required(t('general:form.required')),
    companyId: Yup.string().required(t('general:form.required')),
    customerId: Yup.object().nullable().required(t('general:form.required')),
    deadline: Yup.date()
      .nullable()
      .required(t('general:form.required'))
      .min(new Date(), t('general:date.minToday')),
    items: Yup.array().of(
      Yup.object().shape({
        item: Yup.object().nullable().required(t('general:form.required')),
        price: Yup.string()
          .nullable()
          .required(t('general:form.required'))
          .max(
            NUMBER_FIELD_REQUIRED_SIZE.PRICE_ITEM_SALE_ORDER.MAX,
            t('general:form.maxNumber', {
              max: NUMBER_FIELD_REQUIRED_SIZE.PRICE_ITEM_SALE_ORDER.MAX,
            }),
          )
          .min(
            NUMBER_FIELD_REQUIRED_SIZE.PRICE_ITEM_SALE_ORDER.MIN,
            t('general:form.minNumber', {
              min: NUMBER_FIELD_REQUIRED_SIZE.PRICE_ITEM_SALE_ORDER.MIN,
            }),
          ),
        quantity: Yup.number()
          .required(t('general:form.required'))
          .min(
            NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_INTEGER.MIN,
            t('general:form.minNumber', {
              min: NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_INTEGER.MIN,
            }),
          )
          .max(
            NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_INTEGER.MAX,
            t('general:form.maxNumber', {
              max: NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_INTEGER.MAX,
            }),
          ),
      }),
    ),
  })
}
