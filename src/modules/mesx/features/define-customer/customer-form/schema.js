import * as Yup from 'yup'

import { phoneSchema } from '~/common/schemas'

export const defineCustomerSchema = (t) =>
  Yup.object().shape({
    code: Yup.string().required(t('general:form.required')),
    name: Yup.string().required(t('general:form.required')),
    description: Yup.string(),
    address: Yup.string(),
    phone: phoneSchema(t),
    email: Yup.string().nullable().email(t('general:form.validEmail')),
    fax: Yup.string(),
  })
