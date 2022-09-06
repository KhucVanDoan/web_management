import * as Yup from 'yup'

import { TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'

export const defineSchema = (t) =>
  Yup.object().shape({
    code: Yup.string()
      .required(t('general:form.required'))
      // .min(
      //   TEXTFIELD_REQUIRED_LENGTH.CODE_6.MIN,
      //   t('general:form.minLength', {
      //     min: TEXTFIELD_REQUIRED_LENGTH.CODE_6.MIN,
      //   }),
      // )
      .max(
        TEXTFIELD_REQUIRED_LENGTH.CODE_8.MAX,
        t('general:form.maxLength', {
          max: TEXTFIELD_REQUIRED_LENGTH.CODE_8.MAX,
        }),
      ),
    name: Yup.string()
      .required(t('general:form.required'))
      // .min(
      //   TEXTFIELD_REQUIRED_LENGTH.CODE_20.MAX,
      //   t('general:form.minLength', {
      //     min: TEXTFIELD_REQUIRED_LENGTH.CODE_20.MAX,
      //   }),
      // )
      .max(
        TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
        t('general:form.maxLength', {
          max: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
        }),
      ),
    parentBusiness: Yup.string().required(t('general:form.required')),
    description: Yup.string(),
    itemOption: Yup.array().of(
      Yup.object().shape({
        required: Yup.boolean(),
        fieldName: Yup.string().when('required', {
          is: true,
          then: Yup.string()
            .required(t('general:form.required'))
            .max(
              TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
              t('general:form.maxLength', {
                max: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
              }),
            ),
        }),
        labelEBS: Yup.string()
          .nullable()
          .when('required', {
            is: true,
            then: Yup.string().nullable().required(t('general:form.required')),
          }),
        type: Yup.object()
          .nullable()
          .when('required', {
            is: true,
            then: Yup.object().nullable().required(t('general:form.required')),
          }),
      }),
    ),
  })
