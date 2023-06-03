import * as Yup from 'yup'

export const formSchema = (t) =>
  Yup.object().shape({
    receiptDate: Yup.date().nullable().required(t('general:form.required')),
    vehicleNumber: Yup.string().nullable().required(t('general:form.required')),
    vehicleType: Yup.string().nullable().required(t('general:form.required')),
    km: Yup.number().nullable().required(t('general:form.required')),
    money: Yup.number().nullable().required(t('general:form.required')),
    otherRoute: Yup.string().nullable().required(t('general:form.required')),
    employeeId: Yup.object().nullable().required(t('general:form.required')),
  })
