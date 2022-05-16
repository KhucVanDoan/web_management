import * as Yup from 'yup'

import { NUMBER_FIELD_REQUIRED_SIZE } from '~/common/constants'

export const warehouseSchema = (t) => {
  return Yup.object().shape({
    code: Yup.string().required(t('general:form.required')),
    name: Yup.string().required(t('general:form.required')),
    warehouseTypeSettings: Yup.array()
      .nullable()
      .required()
      .min(
        NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_INTEGER.MIN,
        t('general:form.required'),
      ),
    companyId: Yup.object().nullable().required(t('general:form.required')),
    factoryId: Yup.string().nullable().required(t('general:form.required')),
    location: Yup.string().required(t('general:form.required')),
    long: Yup.number().nullable().required(t('general:form.required')),
    width: Yup.number().nullable().required(t('general:form.required')),
    height: Yup.number().nullable().required(t('general:form.required')),
  })
}
