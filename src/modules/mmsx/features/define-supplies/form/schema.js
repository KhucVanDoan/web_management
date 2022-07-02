import * as Yup from 'yup'

import { TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'

export const validateShema = (t) => {
  return Yup.object().shape({
    code: Yup.string()
      .length(
        TEXTFIELD_REQUIRED_LENGTH.CODE_7.MAX,
        t('general:form.length', {
          length: TEXTFIELD_REQUIRED_LENGTH.CODE_7.MAX,
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
    price: Yup.string().required(t('general:form.required')),
    itemUnitId: Yup.string().required(t('general:form.required')),
    Supplier: Yup.string().required(t('general:form.required')),
    date: Yup.string().required(t('general:form.required')),
  })
}
