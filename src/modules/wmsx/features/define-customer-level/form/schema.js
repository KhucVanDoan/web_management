import * as Yup from 'yup'

import { NUMBER_FIELD_REQUIRED_SIZE } from '~/common/constants'

export const defineCustomerLevelSchema = (t, minDays, minAmount) =>
  Yup.object().shape({
    code: Yup.string().required(t('general:form.required')),
    name: Yup.string().required(t('general:form.required')),
    minJoinedDays: Yup.number()
      .nullable()
      .required(t('general:form.required'))
      .min(
        NUMBER_FIELD_REQUIRED_SIZE.JOINED_DAY.MIN,
        t('general:form.minNumber', {
          min: NUMBER_FIELD_REQUIRED_SIZE.JOINED_DAY.MIN,
        }),
      )
      .max(
        NUMBER_FIELD_REQUIRED_SIZE.JOINED_DAY.MAX,
        t('general:form.maxNumber', {
          max: NUMBER_FIELD_REQUIRED_SIZE.JOINED_DAY.MAX,
        }),
      ),
    maxJoinedDays: Yup.number()
      .nullable()
      .required(t('general:form.required'))
      .min(
        minDays,
        t('general:form.minNumber', {
          min: minDays,
        }),
      )
      .max(
        NUMBER_FIELD_REQUIRED_SIZE.JOINED_DAY.MAX,
        t('general:form.maxNumber', {
          max: NUMBER_FIELD_REQUIRED_SIZE.JOINED_DAY.MAX,
        }),
      ),
    currencyUnitId: Yup.number()
      .nullable()
      .required(t('general:form.required')),
    amountFrom: Yup.number()
      .nullable()
      .required(t('general:form.required'))
      .min(
        NUMBER_FIELD_REQUIRED_SIZE.PRICE.MIN,
        t('general:form.minNumber', {
          min: NUMBER_FIELD_REQUIRED_SIZE.PRICE.MIN,
        }),
      ),
    amountTo: Yup.number()
      .nullable()
      .required(t('general:form.required'))
      .min(
        minAmount,
        t('general:form.minNumber', {
          min: minAmount,
        }),
      ),
    discount: Yup.number()
      .required(t('general:form.required'))
      .min(
        NUMBER_FIELD_REQUIRED_SIZE.DISCOUNT.MIN,
        t('general:form.minNumber', {
          min: NUMBER_FIELD_REQUIRED_SIZE.DISCOUNT.MIN,
        }),
      )
      .max(
        NUMBER_FIELD_REQUIRED_SIZE.DISCOUNT.MAX,
        t('general:form.maxNumber', {
          max: NUMBER_FIELD_REQUIRED_SIZE.DISCOUNT.MAX,
        }),
      ),
    description: Yup.string(),
  })
