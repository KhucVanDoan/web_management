import * as Yup from 'yup'

import { TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'

export const defineSchema = (t) =>
  Yup.object().shape({
    code: Yup.string()
      .required(t('general:form.required'))
      .min(
        TEXTFIELD_REQUIRED_LENGTH.CODE_6.MIN,
        t('general:form.minLength', {
          min: TEXTFIELD_REQUIRED_LENGTH.CODE_6.MIN,
        }),
      )
      .max(
        TEXTFIELD_REQUIRED_LENGTH.CODE_8.MAX,
        t('general:form.maxLength', {
          max: TEXTFIELD_REQUIRED_LENGTH.CODE_8.MAX,
        }),
      ),
    name: Yup.string()
      .required(t('general:form.required'))
      .min(
        TEXTFIELD_REQUIRED_LENGTH.CODE_20.MIN,
        t('general:form.minLength', {
          min: TEXTFIELD_REQUIRED_LENGTH.CODE_20.MIN,
        }),
      )
      .max(
        TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
        t('general:form.maxLength', {
          max: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
        }),
      ),
    parentBusiness: Yup.string().required(t('general:form.required')),
    description: Yup.string(),
    items: Yup.array().of(
      Yup.object().shape({
        fieldName: Yup.string()
          .required(t('general:form.required'))
          .min(
            TEXTFIELD_REQUIRED_LENGTH.CODE_20.MIN,
            t('general:form.minLength', {
              min: TEXTFIELD_REQUIRED_LENGTH.CODE_20.MIN,
            }),
          )
          .max(
            TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
            t('general:form.maxLength', {
              max: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
            }),
          ),
      }),
    ),
  })
