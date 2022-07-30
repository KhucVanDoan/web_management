import * as Yup from 'yup'

import { TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'

export const validateShema = (t) => {
  return Yup.object().shape({
    code: Yup.string()
      .length(
        TEXTFIELD_REQUIRED_LENGTH.CODE_8.MAX,
        t('general:form.length', {
          length: TEXTFIELD_REQUIRED_LENGTH.CODE_8.MAX,
        }),
      )
      .required(t('general:form.required')),
    planName: Yup.string()
      .required(t('general:form.required'))
      .max(
        TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
        t('general:form.maxLength', {
          max: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
        }),
      ),
    time: Yup.array().nullable().required(t('general:form.required')),
    factoryId: Yup.object().nullable().required(t('general:form.required')),
  })
}
