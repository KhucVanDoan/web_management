import * as Yup from 'yup'

import { TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'

export const defineSchema = (t) =>
  Yup.object().shape({
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
    parentBusiness: Yup.string()
      .nullable()
      .required(t('general:form.required')),
    itemOption: Yup.array().of(
      Yup.object().shape({
        fieldName: Yup.string()
          .required(t('general:form.required'))
          .max(
            TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
            t('general:form.maxLength', {
              max: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
            }),
          ),
        labelEBS: Yup.string().nullable().required(t('general:form.required')),
        type: Yup.object().nullable().required(t('general:form.required')),
      }),
    ),
  })
