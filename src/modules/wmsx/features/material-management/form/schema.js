import * as Yup from 'yup'

import { TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'

export const formSchema = (t) =>
  Yup.object().shape({
    code: Yup.string()
      .required(t('general:form.required'))
      .length(
        TEXTFIELD_REQUIRED_LENGTH.CODE_16.MAX,
        t('general:form.length', {
          length: TEXTFIELD_REQUIRED_LENGTH.CODE_16.MAX,
        }),
      ),
    normalizedCode: Yup.string()
      .required(t('general:form.required'))
      .length(
        TEXTFIELD_REQUIRED_LENGTH.CODE_11.MAX,
        t('general:form.length', {
          length: TEXTFIELD_REQUIRED_LENGTH.CODE_11.MAX,
        }),
      ),
    name: Yup.string()
      .required(t('general:form.required'))
      .min(
        TEXTFIELD_REQUIRED_LENGTH.CODE_20.MAX,
        t('general:form.minLength', {
          min: TEXTFIELD_REQUIRED_LENGTH.CODE_20.MAX,
        }),
      )
      .max(
        TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
        t('general:form.maxLength', {
          max: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
        }),
      ),
    country: Yup.object().nullable().required(t('general:form.required')),
    objectCategory: Yup.object()
      .nullable()
      .required(t('general:form.required')),
    materialCategory: Yup.object()
      .nullable()
      .required(t('general:form.required')),
    materialQuality: Yup.object()
      .nullable()
      .required(t('general:form.required')),
    description: Yup.string().max(
      TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
      t('general:form.maxLength', {
        max: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
      }),
    ),
  })
