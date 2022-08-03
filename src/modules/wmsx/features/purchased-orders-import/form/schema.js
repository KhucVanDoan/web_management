import * as Yup from 'yup'

import {
  NUMBER_FIELD_REQUIRED_SIZE,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'

export const schema = (t) =>
  Yup.object().shape({
    code: Yup.string().required(t('general:form.required')),
    name: Yup.string().required(t('general:form.required')),
    warehouseId: Yup.string().required(t('general:form.required')),
    purchasedOrderId: Yup.string().required(t('general:form.required')),
    purchasedAt: Yup.date().nullable().required(t('general:form.required')),
    deliveredAt: Yup.date().nullable().required(t('general:form.required')),
    items: Yup.array().of(
      Yup.object().shape({
        itemId: Yup.object().nullable().required(t('general:form.required')),
        lotNumber: Yup.string()
          .nullable()
          .required(t('general:form.required'))
          .length(
            TEXTFIELD_REQUIRED_LENGTH.CODE_10.MAX,
            t('general:form.length', {
              length: TEXTFIELD_REQUIRED_LENGTH.CODE_10.MAX,
            }),
          ),
        mfg: Yup.string().nullable().required(t('general:form.required')),
        quantity: Yup.number()
          .min(
            NUMBER_FIELD_REQUIRED_SIZE.QUANTITY.MIN,
            t('general:form.minNumber', {
              min: NUMBER_FIELD_REQUIRED_SIZE.QUANTITY.MIN,
            }),
          )
          .max(
            NUMBER_FIELD_REQUIRED_SIZE.PLAN_QUANTITY.MAX,
            t('general:form.maxNumber', {
              max: NUMBER_FIELD_REQUIRED_SIZE.PLAN_QUANTITY.MAX,
            }),
          ),
      }),
    ),
  })
