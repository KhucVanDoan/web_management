import { isNil } from 'lodash'
import * as Yup from 'yup'

import { MODAL_MODE } from '~/common/constants'
import { INPUT_QC_PLAN_STATUS_OPTIONS } from '~/modules/qmsx/constants'

export const InputQualityControlPlanSchema = (t, mode, status) =>
  Yup.object().shape({
    code: Yup.string().required(t('general:form.required')),
    name: Yup.string().required(t('general:form.required')),
    description: Yup.string(),
    stageQc: Yup.number().nullable().required(t('general:form.required')),
    order: Yup.number().nullable().required(t('general:form.required')),
    qualityPlanIOqcs: Yup.array().of(
      Yup.object().shape({
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
            if (
              context?.parent?.qualityPoint?.numberOfTime === 2 &&
              arr?.length < 1
            ) {
              return false
            }
            return true
          },
        }),
        qcPlanDate: Yup.array()
          .nullable()
          .test({
            message: t('general:form.required'),
            test: (arr) => {
              const filterNull = arr?.filter((x) => x)
              if (filterNull < 2) {
                return false
              }
              return true
            },
          }),
        planErrorRate: Yup.number()
          .nullable()
          .min(0, t('general:form.minNumber', { min: 0 }))
          .integer(t('general:form.integer'))
          .required(t('general:form.required')),
        qcPlanQuantity: Yup.number()
          .nullable()
          .min(0, t('general:form.minNumber', { min: 0 }))
          .integer(t('general:form.integer'))
          .required(t('general:form.required'))
          .when((_, schema, context) => {
            return schema.test({
              message: t('qmsx:form.compareTwoField', {
                limit: Math.ceil(
                  (context.parent?.qualityPoint?.numberOfTime +
                    context.parent?.planErrorRate / 100) *
                    context.parent?.qualityPoint?.formalityRate *
                    context.parent?.planQuantity,
                ),
              }),
              test: () => {
                const numberOfTime = context.parent?.qualityPoint?.numberOfTime
                const formalityRate =
                  context.parent?.qualityPoint?.formalityRate
                const planErrorRate = context.parent?.planErrorRate
                const planQuantity = context.parent?.planQuantity
                if (
                  context.value &&
                  planErrorRate &&
                  formalityRate &&
                  planQuantity
                ) {
                  const cal =
                    (numberOfTime + planErrorRate / 100) *
                    formalityRate *
                    planQuantity
                  if (context.value > Math.ceil(cal)) {
                    return false
                  }
                  return true
                }
                return true
              },
            })
          }),
        qcDoneQuantity: Yup.number()
          .nullable()
          .when((_, schema, context) => {
            return schema.test({
              message: t('general:form.minNumber', { min: 0 }),
              test: () => {
                if (
                  mode === MODAL_MODE.UPDATE &&
                  (status === INPUT_QC_PLAN_STATUS_OPTIONS.CONFIRMED ||
                    status === INPUT_QC_PLAN_STATUS_OPTIONS.INPROGRESS) &&
                  context.value < 0
                ) {
                  return false
                }
                return true
              },
            })
          })
          .when((_, schema, context) => {
            return schema.test({
              message: t('general:form.required'),
              test: () => {
                if (
                  mode === MODAL_MODE.UPDATE &&
                  (status === INPUT_QC_PLAN_STATUS_OPTIONS.CONFIRMED ||
                    status === INPUT_QC_PLAN_STATUS_OPTIONS.INPROGRESS) &&
                  isNil(context?.value)
                ) {
                  return false
                }
                return true
              },
            })
          }),
        qcPassQuantity: Yup.number()
          .nullable()
          .when((_, schema, context) => {
            return schema.test({
              message: t('general:form.minNumber', { min: 0 }),
              test: () => {
                if (
                  mode === MODAL_MODE.UPDATE &&
                  (status === INPUT_QC_PLAN_STATUS_OPTIONS.CONFIRMED ||
                    status === INPUT_QC_PLAN_STATUS_OPTIONS.INPROGRESS) &&
                  context.value < 0
                ) {
                  return false
                }
                return true
              },
            })
          })
          .when((_, schema, context) => {
            return schema.test({
              message: t('general:form.required'),
              test: () => {
                if (
                  mode === MODAL_MODE.UPDATE &&
                  (status === INPUT_QC_PLAN_STATUS_OPTIONS.CONFIRMED ||
                    status === INPUT_QC_PLAN_STATUS_OPTIONS.INPROGRESS) &&
                  isNil(context?.value)
                ) {
                  return false
                }
                return true
              },
            })
          })
          .when((_, schema, context) => {
            return schema.test({
              message: t('qmsx:form.compareTwoField', {
                limit: context?.parent?.qcDoneQuantity,
              }),
              test: () => {
                if (
                  mode === MODAL_MODE.UPDATE &&
                  (status === INPUT_QC_PLAN_STATUS_OPTIONS.CONFIRMED ||
                    status === INPUT_QC_PLAN_STATUS_OPTIONS.INPROGRESS) &&
                  context.value > context?.parent?.qcDoneQuantity
                ) {
                  return false
                }
                return true
              },
            })
          }),
      }),
    ),
  })
