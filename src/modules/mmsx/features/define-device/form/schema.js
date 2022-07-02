import * as Yup from 'yup'

import {
  TEXTFIELD_REQUIRED_LENGTH,
  NUMBER_FIELD_REQUIRED_SIZE,
} from '~/common/constants'

export const deviceSchema = (t) =>
  Yup.object().shape({
    code: Yup.string()
      .required(t('general:form.required'))
      .length(
        TEXTFIELD_REQUIRED_LENGTH.TARGET.MAX,
        t('general:form.length', {
          length: TEXTFIELD_REQUIRED_LENGTH.TARGET.MAX,
        }),
      ),
    name: Yup.string().required(t('general:form.required')),
    deviceCategory: Yup.string().required(t('general:form.required')),
    responsibleUser: Yup.string().required(t('general:form.required')),
    attributeMaintenance: Yup.string().required(t('general:form.required')),
    price: Yup.string().required(t('general:form.required')),
    frequency: Yup.string().required(t('general:form.required')),
    installTemplate: Yup.string().required(t('general:form.required')),
    supplier: Yup.string().required(t('general:form.required')),
    importDate: Yup.string().required(t('general:form.required')),

    description: Yup.string(),
    items: Yup.array().of(
      Yup.object().shape({
        quantity: Yup.number()
          .min(
            NUMBER_FIELD_REQUIRED_SIZE.QUANTITY.MIN,
            t('general:form.minNumber', {
              min: NUMBER_FIELD_REQUIRED_SIZE.QUANTITY.MIN,
            }),
          )
          .max(
            NUMBER_FIELD_REQUIRED_SIZE.QUANTITY.MAX,
            t('general:form.maxNumber', {
              max: NUMBER_FIELD_REQUIRED_SIZE.QUANTITY.MAX,
            }),
          )
          .required(t('general:form.required')),
        supplyId: Yup.string().nullable().required(t('general:form.required')),
        useDate: Yup.string().required(t('general:form.required')),
      }),
    ),
    accessoriesMaintenanceInformation: Yup.array().of(
      Yup.object().shape({
        maintenancePeriod: Yup.number()
          .min(
            NUMBER_FIELD_REQUIRED_SIZE.QUANTITY.MIN,
            t('general:form.minNumber', {
              min: NUMBER_FIELD_REQUIRED_SIZE.QUANTITY.MIN,
            }),
          )
          .max(
            NUMBER_FIELD_REQUIRED_SIZE.QUANTITY.MAX,
            t('general:form.maxNumber', {
              max: NUMBER_FIELD_REQUIRED_SIZE.QUANTITY.MAX,
            }),
          )
          .required(t('general:form.required')),
        mtbfIndex: Yup.number()
          .min(
            NUMBER_FIELD_REQUIRED_SIZE.QUANTITY.MIN,
            t('general:form.minNumber', {
              min: NUMBER_FIELD_REQUIRED_SIZE.QUANTITY.MIN,
            }),
          )
          .max(
            NUMBER_FIELD_REQUIRED_SIZE.QUANTITY.MAX,
            t('general:form.maxNumber', {
              max: NUMBER_FIELD_REQUIRED_SIZE.QUANTITY.MAX,
            }),
          )
          .required(t('general:form.required')),
        mttaIndex: Yup.number()
          .min(
            NUMBER_FIELD_REQUIRED_SIZE.QUANTITY.MIN,
            t('general:form.minNumber', {
              min: NUMBER_FIELD_REQUIRED_SIZE.QUANTITY.MIN,
            }),
          )
          .max(
            NUMBER_FIELD_REQUIRED_SIZE.QUANTITY.MAX,
            t('general:form.maxNumber', {
              max: NUMBER_FIELD_REQUIRED_SIZE.QUANTITY.MAX,
            }),
          )
          .required(t('general:form.required')),
        mttfIndex: Yup.number()
          .min(
            NUMBER_FIELD_REQUIRED_SIZE.QUANTITY.MIN,
            t('general:form.minNumber', {
              min: NUMBER_FIELD_REQUIRED_SIZE.QUANTITY.MIN,
            }),
          )
          .max(
            NUMBER_FIELD_REQUIRED_SIZE.QUANTITY.MAX,
            t('general:form.maxNumber', {
              max: NUMBER_FIELD_REQUIRED_SIZE.QUANTITY.MAX,
            }),
          )
          .required(t('general:form.required')),
        mttrIndex: Yup.number()
          .min(
            NUMBER_FIELD_REQUIRED_SIZE.QUANTITY.MIN,
            t('general:form.minNumber', {
              min: NUMBER_FIELD_REQUIRED_SIZE.QUANTITY.MIN,
            }),
          )
          .max(
            NUMBER_FIELD_REQUIRED_SIZE.QUANTITY.MAX,
            t('general:form.maxNumber', {
              max: NUMBER_FIELD_REQUIRED_SIZE.QUANTITY.MAX,
            }),
          )
          .required(t('general:form.required')),
      }),
    ),
  })
