import * as Yup from 'yup'

import { NUMBER_FIELD_REQUIRED_SIZE } from '~/common/constants'
const warehouseAreaSchema = (t) => {
  return Yup.object().shape({
    code: Yup.string().required(t('general:form.required')),
    name: Yup.string().required(t('general:form.required')),
    warehouseId: Yup.number().nullable().required(t('general:form.required')),
    long: Yup.number()
      .nullable()
      .required(t('general:form.required'))
      .min(
        NUMBER_FIELD_REQUIRED_SIZE.WATTAGE.MIN,
        t('general:form.minNumber', {
          min: NUMBER_FIELD_REQUIRED_SIZE.WATTAGE.MIN,
        }),
      ),
    width: Yup.number()
      .nullable()
      .required(t('general:form.required'))
      .min(
        NUMBER_FIELD_REQUIRED_SIZE.WATTAGE.MIN,
        t('general:form.minNumber', {
          min: NUMBER_FIELD_REQUIRED_SIZE.WATTAGE.MIN,
        }),
      ),
    height: Yup.number()
      .nullable()
      .required(t('general:form.required'))
      .min(
        NUMBER_FIELD_REQUIRED_SIZE.WATTAGE.MIN,
        t('general:form.minNumber', {
          min: NUMBER_FIELD_REQUIRED_SIZE.WATTAGE.MIN,
        }),
      ),
    front: Yup.number()
      .nullable()
      .required(t('general:form.required'))
      .min(
        NUMBER_FIELD_REQUIRED_SIZE.WATTAGE.MIN,
        t('general:form.minNumber', {
          min: NUMBER_FIELD_REQUIRED_SIZE.WATTAGE.MIN,
        }),
      ),
    behind: Yup.number()
      .nullable()
      .required(t('general:form.required'))
      .min(
        NUMBER_FIELD_REQUIRED_SIZE.WATTAGE.MIN,
        t('general:form.minNumber', {
          min: NUMBER_FIELD_REQUIRED_SIZE.WATTAGE.MIN,
        }),
      ),
    left: Yup.number()
      .nullable()
      .required(t('general:form.required'))
      .min(
        NUMBER_FIELD_REQUIRED_SIZE.WATTAGE.MIN,
        t('general:form.minNumber', {
          min: NUMBER_FIELD_REQUIRED_SIZE.WATTAGE.MIN,
        }),
      ),
    right: Yup.number()
      .nullable()
      .required(t('general:form.required'))
      .min(
        NUMBER_FIELD_REQUIRED_SIZE.WATTAGE.MIN,
        t('general:form.minNumber', {
          min: NUMBER_FIELD_REQUIRED_SIZE.WATTAGE.MIN,
        }),
      ),
    top: Yup.number()
      .nullable()
      .required(t('general:form.required'))
      .min(
        NUMBER_FIELD_REQUIRED_SIZE.WATTAGE.MIN,
        t('general:form.minNumber', {
          min: NUMBER_FIELD_REQUIRED_SIZE.WATTAGE.MIN,
        }),
      ),
    bottom: Yup.number()
      .nullable()
      .required(t('general:form.required'))
      .min(
        NUMBER_FIELD_REQUIRED_SIZE.WATTAGE.MIN,
        t('general:form.minNumber', {
          min: NUMBER_FIELD_REQUIRED_SIZE.WATTAGE.MIN,
        }),
      ),
  })
}

export default warehouseAreaSchema
