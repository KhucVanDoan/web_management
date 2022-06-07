import * as Yup from 'yup'

import { TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import { phoneSchema } from '~/common/schemas'

const defineCustomerSchema = (t) =>
  Yup.object().shape({
    code: Yup.string().required(t('general:form.required')),
    name: Yup.string().required(t('general:form.required')),
    email: Yup.string()
      .required(t('general:form.required'))
      .email(t('general:form.validEmail')),
    phone: phoneSchema(t).max(
      TEXTFIELD_REQUIRED_LENGTH.PHONE.MAX,
      t('general:form.maxLength', {
        min: TEXTFIELD_REQUIRED_LENGTH.PHONE.MAX,
      }),
    ),
  })

export default defineCustomerSchema
