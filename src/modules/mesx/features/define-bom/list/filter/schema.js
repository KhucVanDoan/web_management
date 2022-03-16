import * as Yup from 'yup'

import { TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'

export const filterSchema = (t) =>
  Yup.object().shape({
    code: Yup.string().max(
      TEXTFIELD_REQUIRED_LENGTH.CODE_8.MAX,
      t('general:form.maxLength', {
        max: TEXTFIELD_REQUIRED_LENGTH.CODE_8.MAX,
      }),
    ),
    name: Yup.string().max(
      TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
      t('general:form.maxLength', {
        max: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
      }),
    ),
  })
