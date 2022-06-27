/* eslint-disable babel/no-invalid-this */
import * as Yup from 'yup'

import { NUMBER_FIELD_REQUIRED_SIZE } from '~/common/constants'

export const inventoryCalendarSchema = (t, itemByOrderList) => {
  return Yup.object().shape({
    code: Yup.string().required(t('general:form.required')),
    name: Yup.string().required(t('general:form.required')),
    deadline: Yup.date().nullable().required(t('general:form.required')),
    description: Yup.string(),
    items: Yup.array().of(
      Yup.object().shape({
        quantity: Yup.number()
          .required(t('general:form.required'))
          .min(
            NUMBER_FIELD_REQUIRED_SIZE.QUANTITY.MIN,
            t('general:form.minNumber', {
              min: NUMBER_FIELD_REQUIRED_SIZE.QUANTITY.MIN,
            }),
          )
          .max(
            Number(itemByOrderList?.items?.[0]?.actualQuantity),
            t('general:form.maxNumber', {
              max: Number(itemByOrderList?.items?.[0]?.actualQuantity),
            }),
          ),
        // .test('quantity', '', function () {
        //   console.log(this)
        //   const items = [...(this?.from || [])].pop()?.value?.items || []
        //   const index = this.path.match(/\d+/)[0]
        //   const quantity = Number(items[+index].quantity)
        //   console.log(
        //     quantity > Number(itemByOrderList?.items[+index]?.actualQuantity),
        //   )
        //   if (
        //     quantity !==
        //     Number(itemByOrderList?.items[+index]?.actualQuantity)
        //   ) {
        //     return this.createError({
        //       message: t('general:form.maxNumber'),
        //       path: `${this.path}`,
        //     })
        //   }
        //   return true
        // }),
      }),
    ),
  })
}
