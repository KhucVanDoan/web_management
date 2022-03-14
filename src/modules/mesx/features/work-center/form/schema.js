import * as Yup from 'yup'

import { TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'

export const WorkCenterSchema = (t) => {
  return Yup.object().shape({
    code: Yup.string()
      .required(t('general:form.required'))
      .matches(/^[0-9A-Za-z]+$/, t('general:form.validCode')),
    name: Yup.string()
      .required(t('general:form.required'))
      .max(
        TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
        t('general:form.maxLength', {
          max: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
        }),
      ),
    members: Yup.array().test({
      message: t('general:form.required'),
      test: (arr) => arr.length !== 0,
    }),
    factoryId: Yup.string().required(t('general:form.required')),
    leaderId: Yup.number().required(t('general:form.required')),
    oeeTarget: Yup.number().required(t('general:form.required')),
    workCapacity: Yup.number().required(t('general:form.required')),
    producingStepId: Yup.string().required(t('general:form.required')),
    description: Yup.string().max(
      TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
      t('general:form.maxLength', {
        max: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
      }),
    ),

    shifts: Yup.array().of(
      Yup.object().shape(
        {
          startAt: Yup.string()
            .required(t('general:form.required'))
            .when(['endAt'], (_, schema, startAtContext) => {
              return schema.test({
                message: t('general:form.invalidTimeStart'),
                test: () => {
                  const shifts =
                    [...(startAtContext?.from || [])].pop()?.value?.shifts || []
                  if (startAtContext.index > 0) {
                    const endAtPrevious =
                      shifts[startAtContext.index - 1]?.endAt
                    return startAtContext.value === endAtPrevious
                  }
                  return true
                },
              })
            }),

          endAt: Yup.string()
            .required(t('general:form.required'))
            .when(['startAt'], (startAt, schema, endAt) => {
              return schema.test({
                message: t('general:form.invalidTimeRange'),
                test: () => {
                  return startAt < endAt.value
                },
              })
            }),
          shiftName: Yup.string().required(t('general:form.required')),
          pricePerHour: Yup.number()
            .required(t('general:form.required'))
            .max(
              TEXTFIELD_REQUIRED_LENGTH.CODE_10.MAX,
              t('general:form.maxLength', {
                max: TEXTFIELD_REQUIRED_LENGTH.CODE_10.MAX,
              }),
            ),
        },
        ['startAt', 'endAt'],
      ),
    ),

    breakTimes: Yup.array().of(
      Yup.object().shape({
        shifts: Yup.array().of(
          Yup.object().shape(
            {
              from: Yup.string()
                .required(t('general:form.required'))
                .when(['to'], (_, schema, fromContext) => {
                  return schema.test({
                    message: t('general:form.invalidBreakTime'),
                    test: () => {
                      const shifts =
                        [...(fromContext?.from || [])].pop()?.value?.shifts ||
                        []
                      const shiftByBreakTime = shifts.find(
                        (shift) => shift.id === fromContext.parent.shiftId,
                      )
                      if (fromContext.value && shiftByBreakTime) {
                        return (
                          fromContext.value <= shiftByBreakTime.endAt &&
                          fromContext.value >= shiftByBreakTime.startAt
                        )
                      }
                      return true
                    },
                  })
                }),
              to: Yup.string()
                .required(t('general:form.required'))
                .when(['from'], (from, schema, toContext) => {
                  if (from < toContext.value) {
                    return schema.test({
                      message: t('general:form.invalidBreakTime'),
                      test: () => {
                        const shifts =
                          [...(toContext?.from || [])].pop()?.value?.shifts ||
                          []
                        const shiftByBreakTime = shifts.find(
                          (shift) => shift.id === toContext.parent.shiftId,
                        )
                        if (toContext.value && shiftByBreakTime) {
                          return (
                            toContext.value <= shiftByBreakTime.endAt &&
                            toContext.value >= shiftByBreakTime.startAt
                          )
                        }
                        return true
                      },
                    })
                  }
                  return schema.test({
                    message: t('general:form.invalidTimeRange'),
                    test: () => {
                      return from < toContext.value
                    },
                  })
                }),
            },
            ['from', 'to'],
          ),
        ),
        breakTimeName: Yup.string().required(t('general:form.required')),
      }),
    ),
  })
}
