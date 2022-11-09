import * as Yup from 'yup'

import { TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import { phoneSchema } from '~/common/schemas'

export const validationSchema = (t) =>
  Yup.object().shape({
    code: Yup.string().required(t('general:form.required')),
    fullName: Yup.string().required(t('general:form.required')),
    username: Yup.string().required(t('general:form.required')),
    email: Yup.string()
      // .required(t('general:form.required'))
      .email(t('general:form.validEmail'))
      .min(
        TEXTFIELD_REQUIRED_LENGTH.EMAIL.MIN,
        t('general:form.minLength', {
          min: TEXTFIELD_REQUIRED_LENGTH.EMAIL.MIN,
        }),
      ),
    phone: phoneSchema(t),
    dateOfBirth: Yup.date()
      .nullable()
      .max(new Date(), t('general:date.maxToday')),
    // companyId: Yup.string().required(t('general:form.required')),
    departmentSettings: Yup.object()
      .nullable()
      .required(t('general:form.required')),
  })
