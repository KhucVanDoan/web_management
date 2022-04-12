import * as Yup from 'yup'

import { TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import {
  FOMALITY_QC_OPTION,
  NUMBER_OF_TIMES_QC_OPTION,
  STAGE_OPTION_OTHER,
  STAGE_OPTION,
} from '~/modules/qmsx/constants'

export const defineQualityPointSchema = (t) =>
  Yup.object().shape(
    {
      code: Yup.string()
        .required(t('general:form.required'))
        .max(
          TEXTFIELD_REQUIRED_LENGTH.CODE_50.MAX,
          t('general:form.maxLength', {
            max: TEXTFIELD_REQUIRED_LENGTH.CODE_50.MAX,
          }),
        )
        .matches(/^[0-9A-Za-z]+$/, t('general:form.special')),
      name: Yup.string()
        .required(t('general:form.required'))
        .max(
          TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
          t('general:form.maxLength', {
            max: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
          }),
        ),
      stage: Yup.number().nullable().required(t('general:form.required')),
      productCode: Yup.number()
        .nullable()
        .when(['stage'], (_, schema, productCodeContext) => {
          return schema.test({
            message: t('general:form.required'),
            test: () => {
              if (
                !productCodeContext.value &&
                STAGE_OPTION_OTHER.includes(+productCodeContext.parent.stage)
              ) {
                return false
              }
              return true
            },
          })
        }),
      productType: Yup.object()
        .shape()
        .test({
          name: '',
          message: t('general:form.required'),
          test: (v, context) => {
            if (context.parent.stage === STAGE_OPTION.PRODUCTION_INPUT) {
              return Object.values(v).some((i) => i)
            }
            return true
          },
        }),
      checkListId: Yup.number().nullable().required(t('general:form.required')),
      qualityPointUser1s: Yup.array().min(1, t('general:form.required')),
      quantity: Yup.number()
        .nullable()
        .min(1, t('general:form.minNumber', { min: 1 }))
        .integer(t('general:form.integer'))
        .max(99, t('general:form.maxNumber', { max: 99 }))
        .when(['formality'], (_, schema, quantityContext) => {
          return schema.test({
            message: t('general:form.required'),
            test: () => {
              if (
                !quantityContext.value &&
                quantityContext.parent.formality === FOMALITY_QC_OPTION.RANDOM
              ) {
                return false
              }
              return true
            },
          })
        }),
      errorAcceptanceRate: Yup.number()
        .nullable()
        .min(1, t('general:form.minNumber', { min: 1 }))
        .integer(t('general:form.integer'))
        .max(99, t('general:form.maxNumber', { max: 99 }))
        .when(['formality'], (_, schema, errorAcceptanceRateContext) => {
          return schema.test({
            message: t('general:form.required'),
            test: () => {
              if (
                !errorAcceptanceRateContext.value &&
                errorAcceptanceRateContext.parent.formality ===
                  FOMALITY_QC_OPTION.RANDOM
              ) {
                return false
              }
              return true
            },
          })
        }),
      qualityPointUser2s: Yup.array().when(
        ['numberOfTime'],
        (_, schema, qualityPointUser2sContext) => {
          return schema.test({
            message: t('general:form.required'),
            test: () => {
              if (
                qualityPointUser2sContext.value.length < 1 &&
                qualityPointUser2sContext.parent.numberOfTime ===
                  NUMBER_OF_TIMES_QC_OPTION.TWO_TIMES
              ) {
                return false
              }
              return true
            },
          })
        },
      ),
      description: Yup.string().max(
        TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
        t('general:form.maxLength', {
          max: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
        }),
      ),
    },
    ['code', 'name', 'stage', 'productPrevious', 'material'],
  )
