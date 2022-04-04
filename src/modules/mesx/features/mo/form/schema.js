import * as Yup from 'yup'

import { TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'

export const validationSchema = (t) =>
  Yup.object().shape({
    code: Yup.string()
      .required(t('general:form.required'))
      .max(
        TEXTFIELD_REQUIRED_LENGTH.CODE_20.MAX,
        t('general:form.maxLength', {
          max: TEXTFIELD_REQUIRED_LENGTH.CODE_20.MAX,
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
    masterPlanId: Yup.number()
      .typeError(t('general:form.numeric'))
      .required(t('general:form.required')),
    itemIds: Yup.array().required(t('general:form.required')),
    moPlan: Yup.array().required(),
  })
