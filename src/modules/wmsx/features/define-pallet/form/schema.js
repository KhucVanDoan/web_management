import * as Yup from 'yup'

import { NUMBER_FIELD_REQUIRED_SIZE } from '~/common/constants'
import { unitSchema } from '~/common/schemas'
import { PALLET_ITEM_STORAGE_TYPE } from '~/modules/wmsx/constants'

export const definePalletSchema = (t, palletType) =>
  Yup.object().shape({
    code: Yup.string().required(t('general:form.required')),
    // .length(
    //   TEXTFIELD_REQUIRED_LENGTH.CODE_12.MAX,
    //   t('general:form.length', {
    //     length: TEXTFIELD_REQUIRED_LENGTH.CODE_12.MAX,
    //   }),
    // ),
    name: Yup.string().required(t('general:form.required')),
    description: Yup.string(),
    long: Yup.object().shape({
      value: unitSchema(t).nullable().required(t('general:form.required')),
      unit: Yup.string().required(t('general:form.required')),
    }),
    width: Yup.object().shape({
      value: unitSchema(t).nullable().required(t('general:form.required')),
      unit: Yup.string().required(t('general:form.required')),
    }),
    height: Yup.object().shape({
      value: unitSchema(t).nullable().required(t('general:form.required')),
      unit: Yup.string().required(t('general:form.required')),
    }),
    weightLoad: Yup.object().shape({
      value: unitSchema(t).nullable().required(t('general:form.required')),
      unit: Yup.string().required(t('general:form.required')),
    }),
    type: Yup.string(),
    ...(Number(palletType) === PALLET_ITEM_STORAGE_TYPE.GROUP
      ? {
          packages: Yup.array().of(
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
              packageId: Yup.string()
                .nullable()
                .required(t('general:form.required')),
            }),
          ),
        }
      : {
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
              itemId: Yup.object()
                .nullable()
                .required(t('general:form.required')),
            }),
          ),
        }),
  })
