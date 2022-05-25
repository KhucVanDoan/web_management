/* eslint-disable babel/no-invalid-this */

import * as Yup from 'yup'

export const defineTemplateShelfSchema = (t, heightTotal, weightTotal) =>
  Yup.object().shape({
    name: Yup.string().required(t('general:form.required')),
    unitStorageSpace: Yup.number()
      .nullable()
      .required(t('general:form.required')),
    long: Yup.number().nullable().required(t('general:form.required')),
    width: Yup.number().nullable().required(t('general:form.required')),
    height: Yup.number().nullable().required(t('general:form.required')),
    unitWeigthLoad: Yup.number()
      .nullable()
      .required(t('general:form.required')),
    weightLoad: Yup.number().nullable().required(t('general:form.required')),
    items: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required(t('general:form.required')),
        height: Yup.object().shape({
          value: Yup.number()
            .required(t('general:form.required'))
            .test('height_total', '', function () {
              const items = [...(this?.from || [])].pop()?.value?.items || []
              const height = items.reduce(
                (acc, val) => acc + +val.height?.value,
                0,
              )
              if (height !== heightTotal) {
                return this.createError({
                  message: t('defineTemplateShelf.heightNotEqual'),
                  path: `${this.path}`,
                })
              }
              return true
            }),
        }),
        weightLoad: Yup.object().shape({
          value: Yup.number()
            .required(t('general:form.required'))
            .test('weight_total', '', function () {
              const items = [...(this?.from || [])].pop()?.value?.items || []
              const weight = items.reduce(
                (acc, val) => acc + +val.weightLoad?.value,
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
        }),
      }),
    ),
  })
