import { isNaN, mapValues, isEmpty, isNil } from 'lodash'
import * as Yup from 'yup'

import { TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'

export const productionInputQualityControlPlanSchema = (t) =>
  Yup.object().shape({
    code: Yup.string()
      .required(t('general:form.required'))
      .max(
        TEXTFIELD_REQUIRED_LENGTH.CODE_50.MAX,
        t('general:form.maxLength', {
          max: TEXTFIELD_REQUIRED_LENGTH.CODE_50.MAX,
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
    mo: Yup.number().nullable().required(t('general:form.required')),
    productionPlan: Yup.number()
      .nullable()
      .required(t('general:form.required')),
    formPrevious: Yup.lazy((obj) =>
      Yup.object(
        mapValues(obj, () => {
          return Yup.object().shape({
            userQc1st: Yup.array().test({
              message: t('general:form.required'),
              test: (arr) => {
                if (arr?.length < 1) {
                  return false
                }
                return true
              },
            }),
            userQc2nd: Yup.array().test({
              message: t('general:form.required'),
              test: (arr, context) => {
                if (arr?.length < 1 && context.parent.numberOfTime === 2) {
                  return false
                }
                return true
              },
            }),
            productionQcPlanDate: Yup.array()
              .nullable()
              .test({
                message: t('general:form.required'),
                test: (arr) => {
                  if (!isEmpty(arr)) {
                    const filterNull = arr.filter((x) => x)
                    if (filterNull.length < 2) {
                      return false
                    }
                  }
                  return true
                },
              }),
            planErrorRate: Yup.number()
              .transform((v) => (v === '' || isNaN(v) ? null : v))
              .nullable()
              .min(0, t('general:form.minNumber', { min: 0 }))
              .integer(t('general:form.integer'))
              .required(t('general:form.required')),
            planQcQuantity: Yup.number()
              .transform((v) => (v === '' || isNaN(v) ? null : v))
              .nullable()
              .min(0, t('general:form.minNumber', { min: 0 }))
              .integer(t('general:form.integer'))
              .required(t('general:form.required'))
              .when((_, schema, context) => {
                return schema.test({
                  message: t('qmsx:form.compareTwoField', {
                    limit: Math.ceil(
                      (1 + +context.parent?.planErrorRate / 100) *
                        context.parent?.numberOfTime *
                        context.parent?.formalityRate *
                        context.parent?.planningQuantity,
                    ),
                  }),
                  test: () => {
                    const numberOfTime = context.parent?.numberOfTime
                    const formalityRate = context.parent?.formalityRate
                    const planErrorRate = context.parent?.planErrorRate
                    const planningQuantity = context.parent?.planningQuantity
                    if (
                      !isNil(context?.value) &&
                      !isNil(planErrorRate) &&
                      !isNil(formalityRate) &&
                      !isNil(planningQuantity)
                    ) {
                      const cal =
                        (1 + planErrorRate / 100) *
                        numberOfTime *
                        formalityRate *
                        planningQuantity
                      if (context.value > Math.ceil(cal)) {
                        return false
                      }
                    }
                    return true
                  },
                })
              }),
          })
        }),
      ),
    ),
    formMaterial: Yup.lazy((obj) => {
      return Yup.object(
        mapValues(obj, (v) => {
          return Yup.object(
            mapValues(v, (_, key) => {
              if (key === 'userQc1st') {
                return Yup.array().test({
                  message: t('general:form.required'),
                  test: (arr, context) => {
                    if (
                      arr?.length < 1 &&
                      !isNil(context.parent.materialLength) &&
                      +context.parent.materialLength > 0
                    ) {
                      return false
                    }
                    return true
                  },
                })
              }
              if (key === 'userQc2nd') {
                return Yup.array().test({
                  message: t('general:form.required'),
                  test: (arr, context) => {
                    if (
                      arr?.length < 1 &&
                      !isNil(context.parent.materialLength) &&
                      +context.parent.materialLength > 0 &&
                      context.parent.numberOfTime === 2
                    ) {
                      return false
                    }
                    return true
                  },
                })
              } else if (key !== 'materialLength' && key !== 'numberOfTime') {
                return Yup.object().shape({
                  productionQcPlanDate: Yup.array()
                    .nullable()
                    .test({
                      message: t('general:form.required'),
                      test: (arr) => {
                        if (!isEmpty(arr)) {
                          const filterNull = arr.filter((x) => x)
                          if (filterNull.length < 2) {
                            return false
                          }
                        }
                        return true
                      },
                    }),
                  planErrorRate: Yup.number()
                    .transform((v) => (v === '' || isNaN(v) ? null : v))
                    .nullable()
                    .min(0, t('general:form.minNumber', { min: 0 }))
                    .integer(t('general:form.integer'))
                    .required(t('general:form.required')),
                  planQcQuantity: Yup.number()
                    .transform((v) => (v === '' || isNaN(v) ? null : v))
                    .nullable()
                    .min(0, t('general:form.minNumber', { min: 0 }))
                    .integer(t('general:form.integer'))
                    .required(t('general:form.required'))
                    .when((_, schema, context) => {
                      return schema.test({
                        message: t('qmsx:form.compareTwoField', {
                          limit: Math.ceil(
                            (1 + +context.parent?.planErrorRate / 100) *
                              context.parent?.numberOfTime *
                              context.parent?.formalityRate *
                              context.parent?.planningQuantity,
                          ),
                        }),
                        test: () => {
                          const numberOfTime = context.parent?.numberOfTime
                          const formalityRate = context.parent?.formalityRate
                          const planErrorRate = context.parent?.planErrorRate
                          const planningQuantity =
                            context.parent?.planningQuantity
                          if (
                            !isNil(context?.value) &&
                            !isNil(planErrorRate) &&
                            !isNil(formalityRate) &&
                            !isNil(planningQuantity)
                          ) {
                            const cal =
                              (1 + planErrorRate / 100) *
                              numberOfTime *
                              formalityRate *
                              planningQuantity
                            if (context.value > Math.ceil(cal)) {
                              return false
                            }
                          }
                          return true
                        },
                      })
                    }),
                })
              }
            }),
          )
        }),
      )
    }),
  })
