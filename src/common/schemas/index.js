import * as Yup from 'yup'

import { TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'

export const phoneSchema = (t) =>
  Yup.string()
    .matches(/^[0-9]+$/, {
      message: t('general:form.validPhone'),
      excludeEmptyString: true,
    })
    .max(
      TEXTFIELD_REQUIRED_LENGTH.PHONE.MAX,
      t('general:form.maxLength', {
        max: TEXTFIELD_REQUIRED_LENGTH.PHONE.MAX,
      }),
    )
