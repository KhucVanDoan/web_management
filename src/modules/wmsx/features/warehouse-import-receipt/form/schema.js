import * as Yup from 'yup'

export const formSchema = (t) =>
  Yup.object().shape({
    receiptDate: Yup.date().required(t('general:form.required')),
    deliver: Yup.string().required(t('general:form.required')),
    departmentReceiptId: Yup.object().required(t('general:form.required')),
    businessTypeId: Yup.object()
      .nullable()
      .required(t('general:form.required')),
    warehouseId: Yup.object().required(t('general:form.required')),
    reasonId: Yup.object().required(t('general:form.required')),
    sourceId: Yup.object().required(t('general:form.required')),
    // explaination: Yup.object().required(t('general:form.required')),
    items: Yup.array().of(
      Yup.object().shape({
        itemCode: Yup.object().nullable().required(t('general:form.required')),
        // importQuantity: Yup.string()
        //   .nullable()
        //   .required(t('general:form.required')),
        money: Yup.string().nullable().required(t('general:form.required')),
      }),
    ),
  })
