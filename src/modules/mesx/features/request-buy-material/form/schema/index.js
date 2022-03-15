import * as Yup from 'yup'

import { TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import { codeSchema } from '~/common/schemas'
function validationSchema(t) {
  return Yup.object().shape({
    code: codeSchema(t).required(t('general:form.required')),
    name: Yup.string()
      .required(t('general:form.required'))
      .max(
        TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
        t('general:form.maxLength', {
          max: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
        }),
      ),
    deadline: Yup.array()
      .nullable()
      .test('deadline', t('general:form.required'), (deadline) => {
        const isValue = deadline?.some((val) => val) || false
        return isValue
      }),
    description: Yup.string().max(
      TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
      t('general:form.maxLength', {
        max: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
      }),
    ),
  })
}
export default validationSchema
