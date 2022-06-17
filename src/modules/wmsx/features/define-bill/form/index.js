import { useEffect, useMemo } from 'react'

import { Box, Grid, Typography } from '@mui/material'
import FormControlLabel from '@mui/material/FormControlLabel'
import { FieldArray, Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import { useRouteMatch, useParams, useHistory } from 'react-router-dom'

import {
  ASYNC_SEARCH_LIMIT,
  MODAL_MODE,
  TEXTFIELD_ALLOW,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import LabelValue from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import { searchCompaniesApi } from '~/modules/database/redux/sagas/define-company/search-companies'
import { searchCustomersApi } from '~/modules/mesx/redux/sagas/define-customer/search-customers'
import { DEFINE_BILL_STATUS_OPTIONS } from '~/modules/wmsx/constants'
import useBill from '~/modules/wmsx/redux/hooks/useBill'
import useDefineCurrencyUnit from '~/modules/wmsx/redux/hooks/useDefineCurrencyUnit'
import { searchPaymentTypesApi } from '~/modules/wmsx/redux/sagas/define-payment-type/search-payment-type'
import { searchInvoiceTypesApi } from '~/modules/wmsx/redux/sagas/invoice-type/search-invoice-type'
import { ROUTE } from '~/modules/wmsx/routes/config'

import ItemSettingTable from './item-setting-table'
import validateShema from './schema'
function DefineBillForm() {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const { id } = useParams()

  const {
    data: { billDetails },
    actions,
  } = useBill()

  const DEFAULT_ITEM = {
    id: new Date().getTime(),
    serviceId: null,
    rentDuration: null,
    discount: 0.5,
    price: 0,
    quantity: 1,
    vat: 10,
    voucher: null,
  }

  const MODE_MAP = {
    [ROUTE.DEFINE_BILL.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.DEFINE_BILL.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const {
    data: { currencyUnitList, isLoading },
    actions: actionUnit,
  } = useDefineCurrencyUnit()

  useEffect(() => {
    actionUnit.searchCurrencyUnits({ isGetAll: 1 })
  }, [])

  useEffect(() => {
    if (isUpdate) {
      actions.getBillDetailsById(id)
    }
    return () => actions.resetBillState()
  }, [id])

  const backToList = () => {
    history.push(ROUTE.DEFINE_BILL.LIST.PATH)
  }

  const initialValues = useMemo(
    () => ({
      code: billDetails?.code || '',
      name: billDetails?.name || '',
      invoiceTypeId: billDetails?.invoiceType || null,
      currencyUnitId: billDetails?.currencyUnit?.id || '',
      isQr: billDetails?.isQr || false,
      checkVAT: Boolean(billDetails?.percentageTax) || false,
      vendor: billDetails?.vendor || null,
      customerId: billDetails?.customer || null,
      customerTaxCode: '',
      paymentMethod: billDetails?.paymentType || null,
      items: billDetails?.billDetails?.map((i) => ({
        serviceId: i?.serviceId,
        price: {
          value: i?.unitPrice?.value,
          type: i?.unitPrice?.unit,
        },
        rentDuration: [i?.rentDurationFrom, i?.rentDurationTo],
        discount: i?.fee,
        quantity: i?.quantity,
        vat: Number(billDetails?.percentageTax),
        // @TODO: <linh.taquang> waiting BE return percentage
        voucher: { ...billDetails?.voucher, percentage: 10 },
      })) || [{ ...DEFAULT_ITEM }],
    }),
    [billDetails],
  )

  const caculatePrice = ({
    items = [],
    customerId,
    paymentMethod,
    checkVAT,
  }) => {
    const { sumPrice, totalPriceDiscount } = items.reduce(
      (prev, curr) => ({
        sumPrice:
          prev.sumPrice +
          Number(curr?.price?.value || 0) * Number(curr?.quantity),
        totalPriceDiscount:
          prev.totalPriceDiscount +
          Number(curr?.price?.value || 0) * (Number(curr?.discount) / 100),
      }),
      {
        sumPrice: 0,
        totalPriceDiscount: 0,
      },
    )

    const customerLevel = customerId?.customerLevel?.level
      ? (Number(customerId?.customerLevel?.level) / 100) * sumPrice
      : 0

    const discountPayMethod = paymentMethod?.discount
      ? (Number(paymentMethod?.discount) / 100) * sumPrice
      : 0

    const vatTaxCost = checkVAT ? sumPrice * (items[0]?.vat / 100) : 0

    const voucherPrice = items[0]?.voucher
      ? sumPrice * (Number(items[0]?.voucher.percentage) / 100)
      : 0

    const totalCostEnd =
      sumPrice -
      totalPriceDiscount -
      customerLevel -
      discountPayMethod +
      vatTaxCost -
      voucherPrice

    return {
      sumPrice,
      totalPriceDiscount,
      customerLevel,
      discountPayMethod,
      vatTaxCost,
      voucherPrice,
      totalCostEnd,
    }
  }

  const handleSubmit = (val) => {
    const { totalCostEnd } = caculatePrice(val)
    const params = {
      name: val?.name,
      code: val?.code,
      invoiceTypeId: val?.invoiceTypeId?.id,
      currencyUnitId: val?.currencyUnitId,
      isQr: val?.isQr,
      vendorId: val?.vendor?.id,
      customerId: val?.customerId?.id,
      paymentTypeId: val?.paymentMethod?.id,
      node: '',
      taxNo: val?.customerTaxCode,
      voucherId: val?.items[0]?.voucher?.id,
      totalPrice: totalCostEnd.toFixed(2),
      percentageTax: val?.items[0]?.vat,
      billDetails: val?.items.map((service) => ({
        serviceId: service?.serviceId,
        unitPrice: {
          value: service?.price?.value,
          unit: service?.price?.type,
        },
        fee: service?.discount,
        quantity: service?.quantity,
        rentDurationFrom: service?.rentDuration[0],
        rentDurationTo: service?.rentDuration[1],
        price:
          (Number(service?.price?.value) *
            service?.quantity *
            service?.discount) /
          100,
      })),
    }
    if (isUpdate) {
      actions.updateBill({ ...params, id: Number(id) }, backToList)
    } else {
      actions.createBill(params, backToList)
    }
  }

  const getBreadcrumb = () => {
    const breadcrumb = [
      {
        title: ROUTE.RENT_WAREHOUSE_COST_MANAGEMENT.TITLE,
      },
      {
        route: ROUTE.DEFINE_BILL.LIST.PATH,
        title: ROUTE.DEFINE_BILL.LIST.TITLE,
      },
    ]

    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.DEFINE_BILL.CREATE.PATH,
          title: ROUTE.DEFINE_BILL.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.DEFINE_BILL.EDIT.PATH,
          title: ROUTE.DEFINE_BILL.EDIT.TITLE,
        })
        break
      default:
        break
    }
    return breadcrumb
  }

  const getTitle = () => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.DEFINE_BILL.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.DEFINE_BILL.EDIT.TITLE
      default:
    }
  }

  const renderActionBar = (handleReset) => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return (
          <ActionBar
            onBack={backToList}
            onCancel={handleReset}
            mode={MODAL_MODE.CREATE}
          />
        )
      case MODAL_MODE.UPDATE:
        return (
          <ActionBar
            onBack={backToList}
            onCancel={handleReset}
            mode={MODAL_MODE.UPDATE}
          />
        )
      default:
        break
    }
  }

  return (
    <Page
      breadcrumbs={getBreadcrumb()}
      title={t('menu.' + getTitle())}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Formik
            initialValues={initialValues}
            validationSchema={validateShema(t)}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ handleReset, values }) => (
              <Form>
                <Grid container justifyContent="center">
                  <Grid
                    container
                    columnSpacing={{ xl: 8, xs: 4 }}
                    rowSpacing={4 / 3}
                  >
                    {isUpdate && (
                      <Grid item xs={12}>
                        <LabelValue
                          label={
                            <Typography>{t('defineBill.status')}</Typography>
                          }
                          value={
                            <Status
                              options={DEFINE_BILL_STATUS_OPTIONS}
                              value={billDetails?.status}
                            />
                          }
                        />
                      </Grid>
                    )}
                    <Grid item xs={12} lg={6}>
                      <Field.TextField
                        label={t('defineBill.code')}
                        name="code"
                        placeholder={t('defineBill.code')}
                        disabled={mode === MODAL_MODE.UPDATE}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE.MAX,
                        }}
                        allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.TextField
                        label={t('defineBill.name')}
                        name="name"
                        placeholder={t('defineBill.name')}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                        }}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.Autocomplete
                        label={t('defineBill.type')}
                        name="invoiceTypeId"
                        placeholder={t('defineBill.type')}
                        asyncRequest={(s) =>
                          searchInvoiceTypesApi({
                            keyword: s,
                            limit: ASYNC_SEARCH_LIMIT,
                          })
                        }
                        asyncRequestHelper={(res) => res?.data?.items}
                        getOptionLabel={(opt) => opt?.name}
                        getOptionSubLabel={(opt) => opt?.code}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.Autocomplete
                        label={t('defineBill.currencyUnit')}
                        name="currencyUnitId"
                        placeholder={t('defineBill.currencyUnit')}
                        options={currencyUnitList}
                        getOptionLabel={(opt) => opt?.name}
                        getOptionValue={(opt) => opt?.id}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <FormControlLabel
                        label={t('defineBill.vatTax')}
                        control={<Field.Checkbox name="taxNo" />}
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <FormControlLabel
                        label={t('defineBill.createQRCode')}
                        control={<Field.Checkbox name="isQr" />}
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Typography component="span">
                        {t('defineBill.vendor.title')}
                      </Typography>
                      <Box mt={4 / 3}>
                        <Field.Autocomplete
                          label={t('defineBill.vendor.name')}
                          name="vendor"
                          placeholder={t('defineBill.vendor.name')}
                          asyncRequest={(s) =>
                            searchCompaniesApi({
                              keyword: s,
                              limit: ASYNC_SEARCH_LIMIT,
                            })
                          }
                          asyncRequestHelper={(res) => res?.data?.items}
                          getOptionLabel={(opt) => opt?.name}
                          getOptionSubLabel={(opt) => opt?.code}
                          required
                        />
                      </Box>
                      <Box mt={4 / 3}>
                        <Field.TextField
                          label={t('defineBill.vendor.code')}
                          name="vendor.code"
                          placeholder={t('defineBill.vendor.code')}
                          disabled
                        />
                      </Box>
                      <Box mt={4 / 3}>
                        <Field.TextField
                          label={t('defineBill.vendor.taxCode')}
                          name="vendor.taxNo"
                          placeholder={t('defineBill.vendor.taxCode')}
                          disabled
                        />
                      </Box>
                      <Box mt={4 / 3}>
                        <Field.TextField
                          label={t('defineBill.vendor.address')}
                          name="vendor.address"
                          placeholder={t('defineBill.vendor.address')}
                          disabled
                        />
                      </Box>
                      <Box mt={4 / 3}>
                        <Field.TextField
                          label={t('defineBill.vendor.phone')}
                          name="vendor.phone"
                          placeholder={t('defineBill.vendor.phone')}
                          disabled
                        />
                      </Box>
                      <Box mt={4 / 3}>
                        <Field.TextField
                          label={t('defineBill.vendor.bankAccountNumber')}
                          name="vendor.bankAccount"
                          placeholder={t('defineBill.vendor.bankAccountNumber')}
                          disabled
                        />
                      </Box>
                      <Box mt={4 / 3}>
                        <Field.TextField
                          label={t('defineBill.vendor.bankName')}
                          name="vendor.bankAccountOwner"
                          placeholder={t('defineBill.vendor.bankName')}
                          disabled
                        />
                      </Box>
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Typography component="span">
                        {t('defineBill.customer.title')}
                      </Typography>
                      <Box mt={4 / 3}>
                        <Field.Autocomplete
                          label={t('defineBill.customer.name')}
                          name="customerId"
                          placeholder={t('defineBill.customer.name')}
                          asyncRequest={(s) =>
                            searchCustomersApi({
                              keyword: s,
                              limit: ASYNC_SEARCH_LIMIT,
                            })
                          }
                          asyncRequestHelper={(res) => res?.data?.items}
                          getOptionLabel={(opt) => opt?.name}
                          getOptionSubLabel={(opt) => opt?.code}
                          required
                        />
                      </Box>
                      <Box mt={4 / 3}>
                        <Field.TextField
                          label={t('defineBill.customer.taxCode')}
                          name="customerTaxCode"
                          placeholder={t('defineBill.customer.taxCode')}
                        />
                      </Box>
                      <Box mt={4 / 3}>
                        <Field.TextField
                          label={t('defineBill.customer.address')}
                          name="customerId.address"
                          placeholder={t('defineBill.customer.address')}
                          disabled
                        />
                      </Box>
                      <Box mt={4 / 3}>
                        <Field.TextField
                          label={t('defineBill.customer.phone')}
                          name="customerId.phone"
                          placeholder={t('defineBill.customer.phone')}
                          disabled
                        />
                      </Box>
                      <Box mt={4 / 3}>
                        <Field.Autocomplete
                          label={t('defineBill.customer.paymentMethod')}
                          name="paymentMethod"
                          placeholder={t('defineBill.customer.paymentMethod')}
                          asyncRequest={(s) =>
                            searchPaymentTypesApi({
                              keyword: s,
                              limit: ASYNC_SEARCH_LIMIT,
                            })
                          }
                          asyncRequestHelper={(res) => res?.data?.items}
                          getOptionLabel={(opt) => opt?.name}
                          getOptionSubLabel={(opt) => opt?.code}
                          required
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
                <Box sx={{ mt: 3 }}>
                  <FieldArray
                    name="items"
                    render={(arrayHelpers) => (
                      <ItemSettingTable
                        items={values?.items || []}
                        caculatePrice={caculatePrice}
                        customerId={values?.customerId || {}}
                        paymentMethod={values?.paymentMethod || {}}
                        currencyUnitId={values?.currencyUnitId}
                        taxNo={values?.taxNo || false}
                        mode={mode}
                        arrayHelpers={arrayHelpers}
                      />
                    )}
                  />
                </Box>
                {renderActionBar(handleReset)}
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </Page>
  )
}

export default DefineBillForm
