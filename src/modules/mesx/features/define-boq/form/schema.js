import * as Yup from 'yup'

import { TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import { codeSchema } from '~/common/schemas'

export const validationSchema = (t) =>
  Yup.object().shape({
    code: codeSchema(t).max(
      TEXTFIELD_REQUIRED_LENGTH.CODE_4.MAX,
      t('general:form.maxLength', {
        max: TEXTFIELD_REQUIRED_LENGTH.CODE_4.MAX,
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
    pmId: Yup.number().required(t('general:form.required')),
    apmId: Yup.number().required(t('general:form.required')),
    planList: Yup.array()
      .nullable()
      .test('planList', t('general:form.required'), (planList) => {
        const isValue = planList?.some((val) => val) || false
        return isValue
      }),
    items: Yup.array().of(
      Yup.object().shape({
        itemId: Yup.number().required(t('general:form.required')),
      }),
    ),
  })
