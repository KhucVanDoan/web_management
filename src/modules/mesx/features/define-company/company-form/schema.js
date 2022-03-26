import * as Yup from 'yup'

import { TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import { phoneSchema, codeSchema } from '~/common/schemas'

export const defineCompanySchema = (t) =>
  Yup.object().shape({
    code: codeSchema(t)
      .required(t('general:form.required'))
      .max(
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
    address: Yup.string()
      .nullable()
      .max(
        TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
        t('general:form.maxLength', {
          max: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
        }),
      ),
    taxNo: Yup.string()
      .nullable()
      .max(
        TEXTFIELD_REQUIRED_LENGTH.TAX.MAX,
        t('general:form.maxLength', {
          max: TEXTFIELD_REQUIRED_LENGTH.TAX.MAX,
        }),
      ),
    fax: Yup.string()
      .nullable()
      .max(
        TEXTFIELD_REQUIRED_LENGTH.FAX.MAX,
        t('general:form.maxLength', {
          max: TEXTFIELD_REQUIRED_LENGTH.FAX.MAX,
        }),
      ),
    phone: phoneSchema(t).nullable(),
    email: Yup.string()
      .nullable()
      .email(t('general:form.validEmail'))
      .max(
        TEXTFIELD_REQUIRED_LENGTH.EMAIL.MAX,
        t('general:form.maxLength', {
          max: TEXTFIELD_REQUIRED_LENGTH.EMAIL.MAX,
        }),
      ),
  })
