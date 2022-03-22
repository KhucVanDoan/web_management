import * as Yup from 'yup'

import { TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import { REGEX_CODE_ONLY_NUMBER_AND_STRING } from '~/modules/mesx/constants'

export const createEventSchema = (t) =>
  Yup.object().shape({
    code: Yup.string()
      .trim()
      .matches(REGEX_CODE_ONLY_NUMBER_AND_STRING, t('general:form.special'))
      .required(t('general:form.required'))
      .max(
        TEXTFIELD_REQUIRED_LENGTH.CODE_20.MAX,
        t('general:form.maxLength', {
          max: TEXTFIELD_REQUIRED_LENGTH.CODE_20.MAX,
        }),
      ),
    title: Yup.string()
      .trim()
      .required(t('general:form.required'))
      .max(
        TEXTFIELD_REQUIRED_LENGTH.NAME.MAX,
        t('general:form.maxLength', {
          max: TEXTFIELD_REQUIRED_LENGTH.NAME.MAX,
        }),
      ),
    type: Yup.string().required(t('general:form.required')),
    time: Yup.array().required().min(2, t('general:form.required')),
    factoryIds: Yup.array().required().min(1, t('general:form.required')),
    description: Yup.string().max(
      TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
      t('general:form.maxLength', {
        max: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
      }),
    ),
  })
