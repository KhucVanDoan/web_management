import * as Yup from 'yup'

import { TEXTFIELD_REQUIRED_LENGTH, MODAL_MODE } from '~/common/constants'
import { phoneSchema, passwordSchema } from '~/common/schemas'

export const validationSchema = (t, mode) =>
  Yup.object().shape({
    code: Yup.string().required(t('general:form.required')),
    fullName: Yup.string().required(t('general:form.required')),
    username: Yup.string().required(t('general:form.required')),
    ...(mode === MODAL_MODE.CREATE
      ? {
          password: passwordSchema(t).required(t('general:form.required')),
        }
      : {}),
    email: Yup.string()
      .required(t('general:form.required'))
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
    companyId: Yup.string().required(t('general:form.required')),
    departmentSettings: Yup.array().test({
      message: t('general:form.required'),
      test: (arr) => arr.length !== 0,
    }),
  })
