import * as Yup from 'yup'

import {
  NUMBER_FIELD_REQUIRED_SIZE,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'

export const WorkCenterSchema = (t) => {
  return Yup.object().shape({
    code: Yup.string().required(t('general:form.required')),
    name: Yup.string()
      .required(t('general:form.required'))
      .max(
        TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
        t('general:form.maxLength', {
          max: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
        }),
      ),
    members: Yup.array().test({
      message: t('general:form.required'),
      test: (arr) => arr.length !== 0,
    }),
    factoryId: Yup.object().nullable().required(t('general:form.required')),
    leaderId: Yup.number().required(t('general:form.required')),
    oeeTarget: Yup.number()
      .required(t('general:form.required'))
      .min(
        NUMBER_FIELD_REQUIRED_SIZE.QUANTITY.MIN,
        t('general:form.minNumber', {
          min: NUMBER_FIELD_REQUIRED_SIZE.QUANTITY.MIN,
        }),
      )
      .max(
        NUMBER_FIELD_REQUIRED_SIZE.PERCENT.MAX,
        t('general:form.maxNumber', {
          max: NUMBER_FIELD_REQUIRED_SIZE.PERCENT.MAX,
        }),
      ),
    workCapacity: Yup.number()
      .required(t('general:form.required'))
      .min(
        NUMBER_FIELD_REQUIRED_SIZE.QUANTITY.MIN,
        t('general:form.minNumber', {
          min: NUMBER_FIELD_REQUIRED_SIZE.QUANTITY.MIN,
        }),
      )
      .max(
        NUMBER_FIELD_REQUIRED_SIZE.PERCENT.MAX,
        t('general:form.maxNumber', {
          max: NUMBER_FIELD_REQUIRED_SIZE.PERCENT.MAX,
        }),
      ),
    producingStepId: Yup.object()
      .nullable()
      .required(t('general:form.required')),
    description: Yup.string().max(
      TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
      t('general:form.maxLength', {
        max: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
      }),
    ),

    shifts: Yup.array().of(
      Yup.object().shape(
        {
          startAt: Yup.string().required(t('general:form.required')),
          endAt: Yup.string().required(t('general:form.required')),
          shiftName: Yup.string().required(t('general:form.required')),
          pricePerHour: Yup.number()
            .max(
              NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_INTEGER.MAX,
              t('general:form.maxNumber', {
                max: NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_INTEGER.MAX,
              }),
            )
            .required(t('general:form.required')),
        },
        ['startAt', 'endAt'],
      ),
    ),

    breakTimes: Yup.array().of(
      Yup.object().shape({
        breakTimeName: Yup.string()
          .required(t('general:form.required'))
          .max(
            TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
            t('general:form.maxLength', {
              max: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
            }),
          ),
        shifts: Yup.array().of(
          Yup.object().shape(
            {
              from: Yup.string().matches(
                /^[0-9:]+$/,
                t('general:form.validTime'),
              ),
              to: Yup.string().matches(
                /^[0-9:]+$/,
                t('general:form.validTime'),
              ),
            },
            ['from', 'to'],
          ),
        ),
      }),
    ),
  })
}
