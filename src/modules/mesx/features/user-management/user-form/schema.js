import * as Yup from 'yup'

import { TEXTFIELD_REQUIRED_LENGTH, MODAL_MODE } from '~/common/constants'
import { phoneSchema } from '~/common/schemas'

export const validationSchema = (t, mode) =>
  Yup.object().shape({
    code: Yup.string()
      .required(t('general:form.required'))
      .max(
        TEXTFIELD_REQUIRED_LENGTH.NAME.MAX,
        t('general:form.maxLength', {
          max: TEXTFIELD_REQUIRED_LENGTH.NAME.MAX,
        }),
      ),
    fullName: Yup.string()
      .required(t('general:form.required'))
      .max(
        TEXTFIELD_REQUIRED_LENGTH.NAME.MAX,
        t('general:form.maxLength', {
          max: TEXTFIELD_REQUIRED_LENGTH.NAME.MAX,
        }),
      ),
    username: Yup.string()
      .required(t('general:form.required'))
      .max(
        TEXTFIELD_REQUIRED_LENGTH.NAME.MAX,
        t('general:form.maxLength', {
          max: TEXTFIELD_REQUIRED_LENGTH.NAME.MAX,
        }),
      ),
    ...(mode === MODAL_MODE.CREATE
      ? {
          password: Yup.string()
            .required(t('general:form.required'))
            .min(
              TEXTFIELD_REQUIRED_LENGTH.PASSWORD.MIN,
              t('general:form.minLength', {
                min: TEXTFIELD_REQUIRED_LENGTH.PASSWORD.MIN,
              }),
            )
            .max(
              TEXTFIELD_REQUIRED_LENGTH.PASSWORD.MAX,
              t('general:form.maxLength', {
                max: TEXTFIELD_REQUIRED_LENGTH.PASSWORD.MAX,
              }),
            ),
          // .matches(/^([A-Z]){1}([\w_\.!@#$%^&*()]+)$/, {
          //   message: t('general:form.validatePassword'),
          // }),
        }
      : {}),
    email: Yup.string()
      .required(t('general:form.required'))
      .email(t('general:form.validEmail'))
      .max(
        TEXTFIELD_REQUIRED_LENGTH.EMAIL.MAX,
        t('general:form.maxLength', {
          max: TEXTFIELD_REQUIRED_LENGTH.EMAIL.MAX,
        }),
      )
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
