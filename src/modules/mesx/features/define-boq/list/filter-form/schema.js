import * as Yup from 'yup'

import { TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import { codeSchema } from '~/common/schemas'

export const filterSchema = (t) =>
  Yup.object().shape({
    code: codeSchema(t).max(
      TEXTFIELD_REQUIRED_LENGTH.CODE_4.MAX,
      t('general:form.maxLength', {
        max: TEXTFIELD_REQUIRED_LENGTH.CODE_4.MAX,
      }),
    ),
    name: Yup.string().max(
      TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
      t('general:form.maxLength', {
        max: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
      }),
    ),
  })
