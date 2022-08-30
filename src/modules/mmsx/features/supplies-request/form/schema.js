import * as Yup from 'yup'

export const validateShema = (t) => {
  return Yup.object().shape({
    jobCode: Yup.object().nullable().required(t('general:form.required')),
    name: Yup.string().nullable().required(t('general:form.required')),
    receiveExpectedDate: Yup.string().required(t('general:form.required')),
    items: Yup.array().of(
      Yup.object().shape({
        materialCode: Yup.string().required(t('general:form.required')),
        requireAmount: Yup.number()
          .nullable()
          .required(t('general:form.required')),
      }),
    ),
  })
}
