import * as Yup from 'yup'

import { phoneSchema } from '~/common/schemas'

export const filterSchema = (t) =>
  Yup.object().shape({
    username: Yup.string(),
    fullName: Yup.string(),
    phone: phoneSchema(t),
  })
