import * as Yup from 'yup'

import { NUMBER_FIELD_REQUIRED_SIZE } from '~/common/constants'

export const warehouseSchema = (t) => {
  return Yup.object().shape({
    code: Yup.string().required(t('general:form.required')),
    name: Yup.string().required(t('general:form.required')),
    warehouseTypeSettings: Yup.array()
      .nullable()
      .required()
      .min(
        NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_INTEGER.MIN,
        t('general:form.required'),
      ),
    companyId: Yup.object().nullable().required(t('general:form.required')),
    factoryId: Yup.string().nullable().required(t('general:form.required')),
    location: Yup.string().required(t('general:form.required')),
    long: Yup.number()
      .nullable()
      .required(t('general:form.required'))
      .min(
        NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_DECIMAL.MIN,
        t('general:form.minNumber', {
          min: NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_DECIMAL.MIN,
        }),
      )
      .max(
        NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_DECIMAL.MAX,
        t('general:form.maxNumber', {
          max: NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_DECIMAL.MAX,
        }),
      ),
    width: Yup.number()
      .nullable()
      .required(t('general:form.required'))
      .min(
        NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_DECIMAL.MIN,
        t('general:form.minNumber', {
          min: NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_DECIMAL.MIN,
        }),
      )
      .max(
        NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_DECIMAL.MAX,
        t('general:form.maxNumber', {
          max: NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_DECIMAL.MAX,
        }),
      ),
    height: Yup.number()
      .nullable()
      .required(t('general:form.required'))
      .min(
        NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_DECIMAL.MIN,
        t('general:form.minNumber', {
          min: NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_DECIMAL.MIN,
        }),
      )
      .max(
        NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_DECIMAL.MAX,
        t('general:form.maxNumber', {
          max: NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_DECIMAL.MAX,
        }),
      ),
  })
}
