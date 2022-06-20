import * as Yup from 'yup'

import {
  NUMBER_FIELD_REQUIRED_SIZE,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'

export const importManufacturingOrderSchema = (t) =>
  Yup.object().shape({
    code: Yup.string().nullable().required(t('general:form.required')),
    name: Yup.string().nullable().required(t('general:form.required')),
    type: Yup.string().nullable().required(t('general:form.required')),
    planDate: Yup.array()
      .nullable()
      .test('planDate', t('general:form.required'), (planDate) => {
        const isValue = planDate?.some((val) => val) || false
        return isValue
      }),
    description: Yup.string(),
    items: Yup.array().of(
      Yup.object().shape({
        itemId: Yup.string().nullable().required(t('general:form.required')),
        lotNumber: Yup.string()
          .nullable()
          .required(t('general:form.required'))
          .length(
            TEXTFIELD_REQUIRED_LENGTH.CODE_10.MAX,
            t('general:form.length', {
              length: TEXTFIELD_REQUIRED_LENGTH.CODE_10.MAX,
            }),
          ),
        warehouseId: Yup.string()
          .nullable()
          .required(t('general:form.required')),
        mfg: Yup.string().nullable().required(t('general:form.required')),
        quantity: Yup.number()
          .nullable()
          .min(
            NUMBER_FIELD_REQUIRED_SIZE.LOT_NUMBER.MIN,
            t('general:form.minNumber', {
              min: NUMBER_FIELD_REQUIRED_SIZE.LOT_NUMBER.MIN,
            }),
          )
          .max(
            NUMBER_FIELD_REQUIRED_SIZE.QUANTITY.MAX,
            t('general:form.maxNumber', {
              max: NUMBER_FIELD_REQUIRED_SIZE.QUANTITY.MAX,
            }),
          ),
      }),
    ),
  })
