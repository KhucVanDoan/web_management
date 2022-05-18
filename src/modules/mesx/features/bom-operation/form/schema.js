/* eslint-disable babel/no-invalid-this */
import * as Yup from 'yup'

import {
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'

export const validationSchema = (t) =>
  Yup.object().shape({
    product: Yup.object()
      .shape({
        item: Yup.object().shape({
          code: Yup.string().required(t('general:form.required')),
        }),
      })
      .nullable()
      .required(t('general:form.required')),
    description: Yup.string().max(
      TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
      t('general:form.maxLength', {
        max: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
      }),
    ),
    items: Yup.array().of(
      Yup.object().shape({
        producingStepData: Yup.array().of(
          Yup.object().shape({
            quantity: Yup.number()
              .min(
                0, // hotfix
                t('general:form.minNumber', {
                  min: 0, // hotfix
                }),
              )
              .test('quantity_total', '', function () {
                const items = [...(this?.from || [])].pop()?.value?.items || []
                const index = this.path.match(/\d+/)[0]
                const quantityTotal = items[+index]?.bomDetail?.quantity
                const producingStep = items[+index]?.producingStepData || []
                const quantity = producingStep.reduce(
                  (acc, val) => acc + +val.quantity,
                  0,
                )
                if (quantity !== quantityTotal) {
                  return this.createError({
                    message: t('bomProducingStep.quantityNotEqual'),
                    path: `${this.path}`,
                  })
                }
                return true
              }),
          }),
        ),
      }),
    ),
  })
