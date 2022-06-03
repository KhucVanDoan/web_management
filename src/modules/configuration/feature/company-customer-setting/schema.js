import * as Yup from 'yup'

import { TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import { phoneSchema } from '~/common/schemas'

export const validationSchema = (t) =>
  Yup.object().shape({
    name: Yup.string().required(t('general:form.required')),
    address: Yup.string().required(t('general:form.required')),
    logo: Yup.string().required(t('general:form.required')),
    color: Yup.string().required(t('general:form.required')),
    email: Yup.string()
      .required(t('general:form.required'))
      .email(t('general:form.validEmail'))
      .min(
        TEXTFIELD_REQUIRED_LENGTH.EMAIL.MIN,
        t('general:form.minLength', {
          min: TEXTFIELD_REQUIRED_LENGTH.EMAIL.MIN,
        }),
      ),
    phone: phoneSchema(t).required(t('general:form.required')),
  })
