import * as Yup from 'yup'

import {
  TEXTFIELD_REQUIRED_LENGTH,
  NUMBER_FIELD_REQUIRED_SIZE,
} from '~/common/constants'

export const validationSchema = (t) =>
  Yup.object().shape({
    code: Yup.string().required(t('general:form.required')),
    name: Yup.string().required(t('general:form.required')),
    switchMode: Yup.string(),
    qcQuantityRule: Yup.number()
      .nullable()
      .min(
        NUMBER_FIELD_REQUIRED_SIZE.PERCENT.MIN,
        t('general:form.minNumber', {
          min: NUMBER_FIELD_REQUIRED_SIZE.PERCENT.MIN,
        }),
      )
      .max(
        NUMBER_FIELD_REQUIRED_SIZE.PERCENT.MAX,
        t('general:form.maxNumber', {
          max: NUMBER_FIELD_REQUIRED_SIZE.PERCENT.MAX,
        }),
      )
      .when('switchMode', {
        is: (switchMode) => Boolean(switchMode === '1'),
        then: Yup.number().nullable().required(t('general:form.required')),
      }),
    productionTimePerItem: Yup.number()

      .min(
        NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_INTEGER.MIN,
        t('general:form.minNumber', {
          min: NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_INTEGER.MIN,
        }),
      )
      .max(
        NUMBER_FIELD_REQUIRED_SIZE.INTEGER_100K.MAX,
        t('general:form.maxNumber', {
          max: NUMBER_FIELD_REQUIRED_SIZE.INTEGER_100K.MAX,
        }),
      )
      .required(t('general:form.required')),
    inputQc: Yup.boolean(),
    outputQc: Yup.boolean(),
    qcCriteriaInput: Yup.string()
      .nullable()
      .when('inputQc', {
        is: true,
        then: Yup.string().nullable().required(t('general:form.required')),
      }),
    timeQcInput: Yup.number()
      .nullable()
      .min(
        NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_INTEGER.MIN,
        t('general:form.minNumber', {
          min: NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_INTEGER.MIN,
        }),
      )
      .when('inputQc', {
        is: true,
        then: Yup.number().nullable().required(t('general:form.required')),
      }),
    qcCriteriaOutput: Yup.string()
      .nullable()
      .when('outputQc', {
        is: true,
        then: Yup.string().nullable().required(t('general:form.required')),
      }),
    timeQcOutput: Yup.number()
      .nullable()
      .min(
        NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_INTEGER.MIN,
        t('general:form.minNumber', {
          min: NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_INTEGER.MIN,
        }),
      )
      .when('outputQc', {
        is: true,
        then: Yup.number().nullable().required(t('general:form.required')),
      }),
    description: Yup.string().max(
      TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
      t('general:form.maxLength', {
        max: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
      }),
    ),
  })
