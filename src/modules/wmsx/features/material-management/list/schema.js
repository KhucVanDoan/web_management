import * as Yup from 'yup'

import { NUMBER_FIELD_REQUIRED_SIZE } from '~/common/constants'

export const validationSchema = (t) =>
  Yup.object().shape({
    items: Yup.array().of(
      Yup.object().shape({
        amount: Yup.number()
          .nullable()
          .required(t('general:form.required'))
          .min(
            1,
            t('general:form.minNumber', {
              min: NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_INTEGER.MIN,
            }),
          )
          .max(
            NUMBER_FIELD_REQUIRED_SIZE.INTEGER_10K.MAX,
            t('general:form.maxNumber', {
              max: NUMBER_FIELD_REQUIRED_SIZE.INTEGER_10K.MAX,
            }),
          ),
        // warehouse:
        //   typeQR === OPTIONS_QR_CODE.qrOld
        //     ? Yup.object().nullable().required(t('general:form.required'))
        //     : null,
      }),
    ),
  })
