import * as Yup from 'yup'

import { TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'

export const filterSchema = (t) =>
  Yup.object().shape({
    code: Yup.string().max(
      TEXTFIELD_REQUIRED_LENGTH.CODE_4.MAX,
      t('general:form.maxLength', {
        max: TEXTFIELD_REQUIRED_LENGTH.CODE_4.MAX,
      }),
    ),
    name: Yup.string().max(
      TEXTFIELD_REQUIRED_LENGTH.NAME.MAX,
      t('general:form.maxLength', {
        max: TEXTFIELD_REQUIRED_LENGTH.NAME.MAX,
      }),
    ),
    pmName: Yup.string().max(
      TEXTFIELD_REQUIRED_LENGTH.NAME.MAX,
      t('general:form.maxLength', {
        max: TEXTFIELD_REQUIRED_LENGTH.NAME.MAX,
      }),
    ),
  })
