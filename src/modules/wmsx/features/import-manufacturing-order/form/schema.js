import * as Yup from 'yup'

import { NUMBER_FIELD_REQUIRED_SIZE } from '~/common/constants'

export const importManufacturingOrderSchema = (t) =>
  Yup.object().shape({
    code: Yup.string().required(t('general:form.required')),
    name: Yup.string().required(t('general:form.required')),
    type: Yup.string().required(t('general:form.required')),
    planDate: Yup.array()
      .nullable()
      .test('planDate', t('general:form.required'), (planDate) => {
        const isValue = planDate?.some((val) => val) || false
        return isValue
      }),
    description: Yup.string(),
    items: Yup.array().of(
      Yup.object().shape({
        itemId: Yup.string().required(t('general:form.required')),
        lotNumber: Yup.string().required(t('general:form.required')),
        mfg: Yup.string().required(t('general:form.required')),
        quantity: Yup.number()
          .min(
            NUMBER_FIELD_REQUIRED_SIZE.QUANTITY.MIN,
            t('general:form.minNumber', {
              min: NUMBER_FIELD_REQUIRED_SIZE.QUANTITY.MIN,
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
