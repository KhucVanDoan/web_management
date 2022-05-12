/* eslint-disable babel/no-invalid-this */
import { isEmpty } from 'lodash'
import * as Yup from 'yup'

import {
  TEXTFIELD_REQUIRED_LENGTH,
  NUMBER_FIELD_REQUIRED_SIZE,
} from '~/common/constants'
import { numberSchema } from '~/common/schemas'

export const itemSchema = (t) =>
  Yup.object().shape({
    code: Yup.string()
      .required(t('general:form.required'))
      .length(
        TEXTFIELD_REQUIRED_LENGTH.CODE_7.MAX,
        t('general:form.length', {
          length: TEXTFIELD_REQUIRED_LENGTH.CODE_7.MAX,
        }),
      ),
    name: Yup.string().required(t('general:form.required')),
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
    description: Yup.string(),
    long: Yup.object().shape({
      value: numberSchema(t).required(t('general:form.required')),
      unit: Yup.string().required(t('general:form.required')),
    }),
    width: Yup.object().shape({
      value: numberSchema(t).required(t('general:form.required')),
      unit: Yup.string().required(t('general:form.required')),
    }),
    height: Yup.object().shape({
      value: numberSchema(t).required(t('general:form.required')),
      unit: Yup.string().required(t('general:form.required')),
    }),
    weight: Yup.object().shape({
      value: numberSchema(t).required(t('general:form.required')),
      unit: Yup.string().required(t('general:form.required')),
    }),
    hasItemDetail: Yup.boolean(),
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
        detailId: Yup.object()
          .nullable()
          .test('detail_items', '', function () {
            const hasItemDetail =
              [...(this?.from || [])].pop()?.value?.hasItemDetail || false
            if (hasItemDetail && isEmpty(this.originalValue)) {
              return this.createError({
                message: t('general:form.required'),
                path: `${this.path}`,
              })
            }
            return true
          }),
      }),
    ),
  })
