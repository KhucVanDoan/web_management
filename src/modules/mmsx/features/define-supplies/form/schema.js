import * as Yup from 'yup'

import { TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'

export const validateShema = (t) => {
  return Yup.object().shape({
    code: Yup.string()
      .length(
        TEXTFIELD_REQUIRED_LENGTH.CODE_9.MAX,
        t('general:form.length', {
          length: TEXTFIELD_REQUIRED_LENGTH.CODE_9.MAX,
        }),
      )
      .required(t('general:form.required')),
    name: Yup.string()
      .required(t('general:form.required'))
      .max(
        TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
        t('general:form.maxLength', {
          max: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
        }),
      ),
    groupSupplyId: Yup.string().required(t('general:form.required')),
    price: Yup.number().required(t('general:form.required')),
    itemUnitId: Yup.string().required(t('general:form.required')),
    vendorId: Yup.string().required(t('general:form.required')),
  })
}
