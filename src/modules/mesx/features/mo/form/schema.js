import * as Yup from 'yup'

import {
  NUMBER_FIELD_REQUIRED_SIZE,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'

export const validationSchema = (t) =>
  Yup.object().shape({
    code: Yup.string()
      .required(t('general:form.required'))
      .max(
        TEXTFIELD_REQUIRED_LENGTH.CODE.MAX,
        t('general:form.maxLength', {
          max: TEXTFIELD_REQUIRED_LENGTH.CODE.MAX,
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
    description: Yup.string().max(
      TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
      t('general:form.maxLength', {
        max: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
      }),
    ),
    masterPlanId: Yup.object().nullable().required(t('general:form.required')),
    itemIds: Yup.array()
      .min(
        NUMBER_FIELD_REQUIRED_SIZE.ITEM_QUANLITY.MIN,
        t('general:form.minItem', {
          min: NUMBER_FIELD_REQUIRED_SIZE.ITEM_QUANLITY.MIN,
        }),
      )
      .required(t('general:form.required')),
    moPlan: Yup.array().required(),
    saleOrderId: Yup.string().nullable().required(t('general:form.required')),
  })
