import * as Yup from 'yup'

import { phoneSchema } from '~/common/schemas'

export const validationSchema = (t) =>
  Yup.object().shape({
    phone: phoneSchema(t),
    dateOfBirth: Yup.date()
      .nullable()
      .max(new Date(), t('general:date.maxToday')),
  })
