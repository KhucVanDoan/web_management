import * as Yup from 'yup'

import { codeSchema } from '~/common/schemas'

export const filterSchema = (t) =>
  Yup.object().shape({
    code: codeSchema(t),
  })
