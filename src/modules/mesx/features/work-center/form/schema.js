import * as Yup from 'yup'

import { TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'

export const WorkCenterSchema = (t) => {
  return Yup.object().shape({
    code: Yup.string()
      .required(t('general:form.required'))
      .max(
        TEXTFIELD_REQUIRED_LENGTH.CODE_8.MAX,
        t('general:form.maxLength', {
          max: TEXTFIELD_REQUIRED_LENGTH.CODE_8.MAX,
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
    members: Yup.array().test({
      message: t('general:form.required'),
      test: (arr) => arr.length !== 0,
    }),
    factoryId: Yup.string().required(t('general:form.required')),
    leaderId: Yup.number().required(t('general:form.required')),
    oeeTarget: Yup.number().required(t('general:form.required')),
    workCapacity: Yup.number().required(t('general:form.required')),
    producingStepId: Yup.string().required(t('general:form.required')),
    decription: Yup.string().max(
      TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
      t('general:form.maxLength', {
        max: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
      }),
    ),

    shifts: Yup.array().of(
      Yup.object().shape({
        startAt: Yup.string()
          .required(t('general:form.required'))
          .when('endAt', (endAt, schema, startAt) => {
            return schema.test({
              message: t('general:form.required'),
              test: () => {
                return startAt.value !== endAt
              },
            })
          }),
        endAt: Yup.string().required(t('general:form.required')),
      }),
    ),
  })
}
