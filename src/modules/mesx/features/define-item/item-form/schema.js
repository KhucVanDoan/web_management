import * as Yup from 'yup'

import {
  TEXTFIELD_REQUIRED_LENGTH,
  NUMBER_FIELD_REQUIRED_SIZE,
} from '~/common/constants'
import { numberSchema } from '~/common/schemas'

export const itemSchema = (t, isDetailed) =>
  Yup.object().shape({
    code: Yup.string()
      .required(t('general:form.required'))
      .length(
        TEXTFIELD_REQUIRED_LENGTH.CODE_7.MAX,
        t('general:form.length', {
          length: TEXTFIELD_REQUIRED_LENGTH.CODE_7.MAX,
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
    itemType: Yup.object().nullable().required(t('general:form.required')),
    itemGroup: Yup.object().nullable().required(t('general:form.required')),
    itemUnit: Yup.object().nullable().required(t('general:form.required')),
    price: Yup.number()
      .min(
        NUMBER_FIELD_REQUIRED_SIZE.PRICE.MIN,
        t('general:form.minNumber', {
          min: NUMBER_FIELD_REQUIRED_SIZE.PRICE.MIN,
        }),
      )
      .max(
        NUMBER_FIELD_REQUIRED_SIZE.PRICE.MAX,
        t('general:form.maxNumber', {
          max: NUMBER_FIELD_REQUIRED_SIZE.PRICE.MAX,
        }),
      ),
    dayExpire: numberSchema(t),
    decription: Yup.string().max(
      TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
      t('general:form.maxLength', {
        max: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
      }),
    ),
    long: Yup.object().shape({
      value: numberSchema(t),
    }),
    width: Yup.object().shape({
      value: numberSchema(t),
    }),
    height: Yup.object().shape({
      value: numberSchema(t),
    }),
    weight: Yup.object().shape({
      value: numberSchema(t),
    }),
    items: Yup.array().of(
      Yup.object().shape({
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
        ...(isDetailed
          ? {
              detailId: Yup.number().required(t('general:form.required')),
            }
          : {}),
      }),
    ),
  })
