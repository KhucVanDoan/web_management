import * as Yup from 'yup'

import { CHECK_TYPE_OPTIONS } from '~/modules/qmsx/constants'

export const defineCheckListSchema = (t) =>
  Yup.object().shape({
    code: Yup.string().required(t('general:form.required')),
    name: Yup.string().required(t('general:form.required')),
    description: Yup.string(),
    checkListDetails: Yup.array().of(
      Yup.object().shape(
        {
          title: Yup.string()
            .required(t('general:form.required'))
            .when((_, schema, titleContext) => {
              return schema.test({
                message: t('qmsx:form.duplicate'),
                test: () => {
                  const checkListDetails =
                    [...titleContext?.from].pop().value?.checkListDetails || []
                  const title = checkListDetails.find(
                    (e, index) =>
                      e.title?.trim() === titleContext?.value?.trim() &&
                      index !== titleContext?.index,
                  )
                  if (title) {
                    return false
                  }
                  return true
                },
              })
            }),
          descriptionContent: Yup.string().required(t('general:form.required')),
          checkType: Yup.number()
            .nullable()
            .required(t('general:form.required')),
          norm: Yup.number()
            .nullable()
            .min(0, t('general:form.minNumber', { min: 0 }))
            .integer(t('general:form.integer'))
            .when(['checkType'], (_, schema, normContext) => {
              return schema.test({
                message: t('general:form.required'),
                test: () => {
                  if (
                    !normContext.value &&
                    normContext.value !== 0 &&
                    normContext.parent.checkType === CHECK_TYPE_OPTIONS.MEASURE
                  ) {
                    return false
                  } else return true
                },
              })
            }),
          itemUnitId: Yup.number()
            .nullable()
            .when(['checkType'], (_, schema, unitContext) => {
              return schema.test({
                message: t('general:form.required'),
                test: () => {
                  if (
                    !unitContext.value &&
                    unitContext.parent.checkType === CHECK_TYPE_OPTIONS.MEASURE
                  ) {
                    return false
                  } else return true
                },
              })
            }),
          valueBottom: Yup.number()
            .nullable()
            .min(0, t('general:form.minNumber', { min: 0 }))
            .integer(t('general:form.integer'))
            .when(['checkType'], (_, schema, lowerContext) => {
              return schema.test({
                message: t('general:form.required'),
                test: () => {
                  if (
                    !lowerContext.value &&
                    lowerContext.value !== 0 &&
                    lowerContext.parent.checkType === CHECK_TYPE_OPTIONS.MEASURE
                  ) {
                    return false
                  } else return true
                },
              })
            })
            .when(['norm'], (_, schema, lowerContext) => {
              return schema.test({
                message: t('qmsx:form.lowerBound', {
                  limit: lowerContext.parent.norm,
                }),
                test: () => {
                  if (
                    lowerContext.parent.norm &&
                    lowerContext.value > lowerContext.parent.norm
                  ) {
                    return false
                  } else return true
                },
              })
            }),
          valueTop: Yup.number()
            .nullable()
            .min(0, t('general:form.minNumber', { min: 0 }))
            .integer(t('general:form.integer'))
            .when(['checkType'], (_, schema, upperContext) => {
              return schema.test({
                message: t('general:form.required'),
                test: () => {
                  if (
                    !upperContext.value &&
                    upperContext.value !== 0 &&
                    upperContext.parent.checkType === CHECK_TYPE_OPTIONS.MEASURE
                  ) {
                    return false
                  } else return true
                },
              })
            })
            .when(['norm'], (_, schema, upperContext) => {
              return schema.test({
                message: t('qmsx:form.upperBound', {
                  limit: upperContext.parent.norm,
                }),
                test: () => {
                  if (
                    upperContext.parent.norm &&
                    upperContext.value < upperContext.parent.norm
                  ) {
                    return false
                  } else return true
                },
              })
            }),
          errorGroupId: Yup.number()
            .nullable()
            .required(t('general:form.required')),
        },
        ['title', 'checkType', 'norm'],
      ),
    ),
  })
