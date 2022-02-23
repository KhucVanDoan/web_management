import * as Yup from 'yup'

import { TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'

export const filterSchema = (t) =>
  Yup.object().shape({
    code: Yup.string()
      .max(
        TEXTFIELD_REQUIRED_LENGTH.CODE_2.MAX,
        t('general:form.maxLength', {
          max: TEXTFIELD_REQUIRED_LENGTH.CODE_2.MAX,
        }),
      )
      .matches(/^[0-9A-Za-z]+$/, t('general:form.validCode')),
    name: Yup.string().max(
      TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
      t('general:form.maxLength', {
        max: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
      }),
    ),
  })
