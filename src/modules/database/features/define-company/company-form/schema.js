import * as Yup from 'yup'

import { phoneSchema } from '~/common/schemas'

export const defineCompanySchema = (t) =>
  Yup.object().shape({
    code: Yup.string().required(t('general:form.required')),
    name: Yup.string().required(t('general:form.required')),
    description: Yup.string(),
    address: Yup.string().nullable(),
    taxNo: Yup.string().nullable(),
    fax: Yup.string().nullable(),
    phone: phoneSchema(t).nullable(),
    email: Yup.string().nullable().email(t('general:form.validEmail')),
  })
