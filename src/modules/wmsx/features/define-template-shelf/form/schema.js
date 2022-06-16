/* eslint-disable babel/no-invalid-this */

import * as Yup from 'yup'

import { unitSchema } from '~/common/schemas'

export const defineTemplateShelfSchema = (t, heightTotal, weightTotal) =>
  Yup.object().shape({
    name: Yup.string().required(t('general:form.required')),
    unitStorageSpace: Yup.string()
      .nullable()
      .required(t('general:form.required')),
    long: unitSchema(t).nullable().required(t('general:form.required')),
    width: unitSchema(t).nullable().required(t('general:form.required')),
    height: unitSchema(t).nullable().required(t('general:form.required')),
    unitWeigthLoad: Yup.number()
      .nullable()
      .required(t('general:form.required')),
    weightLoad: unitSchema(t).nullable().required(t('general:form.required')),
    items: Yup.array().of(
      Yup.object()
        .shape({
          name: Yup.string().required(t('general:form.required')),
          height: unitSchema(t)
            .nullable()
            .required(t('general:form.required'))
            .test('height_total', '', function () {
              const items = [...(this?.from || [])].pop()?.value?.items || []
              const height = items.reduce((acc, val) => acc + +val.height, 0)
              if (height !== heightTotal) {
                return this.createError({
                  message: t('defineTemplateShelf.heightNotEqual'),
                  path: `${this.path}`,
                })
              }
              return true
            }),
          weightLoad: unitSchema(t)
            .nullable()
            .required(t('general:form.required'))
            .test('weight_total', '', function () {
              const items = [...(this?.from || [])].pop()?.value?.items || []
              const weight = items.reduce(
                (acc, val) => acc + +val.weightLoad,
                0,
              )
              if (weight !== weightTotal) {
                return this.createError({
                  message: t('defineTemplateShelf.weightNotEqual'),
                  path: `${this.path}`,
                })
              }
              return true
            }),
        })
        .test('name', '', (value, context) => {
          if (
            context?.parent?.some(
              (item) => item?.name === value?.name && item?.id !== value.id,
            )
          ) {
            return context.createError({
              message: t('defineTemplateShelf.shelfFloorNameIsDuplicated'),
              path: `${context.path}.name`,
            })
          }
          return true
        }),
    ),
  })
