import * as Yup from 'yup'

import { TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import { phoneSchema, codeSchema } from '~/common/schemas'

export const defineCustomerSchema = (t) =>
  Yup.object().shape({
    code: codeSchema(t).max(
      TEXTFIELD_REQUIRED_LENGTH.CODE_10.MAX,
      t('general:form.maxLength', {
        max: TEXTFIELD_REQUIRED_LENGTH.CODE_10.MAX,
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
    description: Yup.string().max(
      TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
      t('general:form.maxLength', {
        max: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
      }),
    ),
    address: Yup.string().max(
      TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
      t('general:form.maxLength', {
        max: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
      }),
    ),
    phone: phoneSchema(t),
    email: Yup.string()
      .email(t('general:form.validEmail'))
      .max(
        TEXTFIELD_REQUIRED_LENGTH.EMAIL.MAX,
        t('general:form.maxLength', {
          max: TEXTFIELD_REQUIRED_LENGTH.EMAIL.MAX,
        }),
      ),
    fax: Yup.string().max(
      TEXTFIELD_REQUIRED_LENGTH.FAX.MAX,
      t('general:form.maxLength', {
        max: TEXTFIELD_REQUIRED_LENGTH.FAX.MAX,
      }),
    ),
  })
