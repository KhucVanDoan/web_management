import React, { useEffect, useMemo } from 'react'

import {
  Box,
  createFilterOptions,
  FormControlLabel,
  Grid,
  Hidden,
  Radio,
  Typography,
} from '@mui/material'
import { Formik, Form, FieldArray } from 'formik'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory, useRouteMatch } from 'react-router-dom'

import {
  MODAL_MODE,
  TEXTFIELD_ALLOW,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import { PURCHASED_ORDER_STATUS } from '~/modules/database/constants'
import usePurchasedOrder from '~/modules/database/redux/hooks/usePurchasedOrder'
import useSaleOrder from '~/modules/database/redux/hooks/useSaleOrder'
import {
  LETTER_TYPE,
  RETURN_ORDER_STATUS_OPTIONS,
} from '~/modules/wmsx/constants'
import useDefineWarehouse from '~/modules/wmsx/redux/hooks/useDefineWarehouse'
import usePurchasedOrdersImport from '~/modules/wmsx/redux/hooks/usePurchasedOrdersImport'
import useReturnOrder from '~/modules/wmsx/redux/hooks/useReturnOrder'
import useSOExport from '~/modules/wmsx/redux/hooks/useSOExport'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertFilterParams } from '~/utils'

import ItemSettingTable from './item-setting-table'
import { returnOrderSchema } from './schema'

const ReturnOrderForm = () => {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const params = useParams()
  const routeMatch = useRouteMatch()

  const DEFAULT_ITEM = {
    id: new Date().getTime(),
    itemId: '',
    warehouseId: null,
    quantity: 1,
    evenRow: false,
    warehouseName: '',
    lotNumber: '',
  }

  const {
    data: { isLoading, returnOrderDetails, itemByOrderList },
    actions,
  } = useReturnOrder()

  const {
    data: { warehouseList },
    actions: warehouseActs,
  } = useDefineWarehouse()

  const {
    data: { purchasedOrderList },
    actions: poActions,
  } = usePurchasedOrder()

  const {
    data: { saleOrderList },
    actions: soActions,
  } = useSaleOrder()

  const {
    data: { poImportList },
    actions: poImpActions,
  } = usePurchasedOrdersImport()

  const {
    data: { soExportList },
    actions: soExpActions,
  } = useSOExport()

  useEffect(() => {
    poActions.searchPurchasedOrders({
      filter: convertFilterParams({
        status: [
          PURCHASED_ORDER_STATUS.IN_PROGRESS,
          PURCHASED_ORDER_STATUS.COMPLETED,
        ],
      }),
    })
    soActions.searchSaleOrders({
      filter: convertFilterParams({
        status: [
          PURCHASED_ORDER_STATUS.IN_PROGRESS,
          PURCHASED_ORDER_STATUS.COMPLETED,
        ],
      }),
    })
  }, [])

  useEffect(() => {
    poImpActions.searchPOImports({ isGetAll: 1 })
    soExpActions.searchSOExport({ isGetAll: 1 })
    warehouseActs.searchWarehouses({ isGetAll: 1 })
  }, [])

  const handleGetOrderList = (val, values) => {
    if (Number(values.switchMode) === LETTER_TYPE.PAY_SUPPLIER) {
      poImpActions.searchPOImports({
        filter: convertFilterParams({
          purchasedOrderId: val?.id,
          status: PURCHASED_ORDER_STATUS.COMPLETED,
        }),
      })
    } else {
      soExpActions.searchSOExport({
        filter: convertFilterParams({
          saleOrderId: val?.id,
          // status: PURCHASED_ORDER_STATUS.COMPLETED,
        }),
      })
    }
  }

  const initialValues = useMemo(
    () => ({
      code: returnOrderDetails?.code || '',
      name: returnOrderDetails?.name || '',
      switchMode: returnOrderDetails?.returnType?.toString() || '0',
      warehouseId:
        returnOrderDetails?.returnOrderWarehouseDetails?.[0]?.warehouseId ||
        null,
      deadline: returnOrderDetails?.deadline || null,
      letterCode: returnOrderDetails?.order || null,
      orderCode: returnOrderDetails?.orderDetail || null,
      description: returnOrderDetails?.description || '',
      items: returnOrderDetails?.returnOrderWarehouseLots?.map((ro) => ({
        ...ro,
        itemId: { ...ro.item, id: ro.itemId },
        package: ro.package,
        lotNumber: ro.lotNumber,
        mfg: ro.mfg,
        quantity: ro.quantity,
        unitType: ro.item.itemUnit,
      })) || [{ ...DEFAULT_ITEM }],
    }),
    [returnOrderDetails],
  )

  const MODE_MAP = {
    [ROUTE.RETURN_ORDER.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.RETURN_ORDER.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const getBreadcrumb = () => {
    const breadcrumbs = [
      {
        title: 'orderManagement',
      },
      {
        route: ROUTE.RETURN_ORDER.LIST.PATH,
        title: ROUTE.RETURN_ORDER.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumbs.push({
          route: ROUTE.RETURN_ORDER.CREATE.PATH,
          title: ROUTE.RETURN_ORDER.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumbs.push({
          route: ROUTE.RETURN_ORDER.EDIT.PATH,
          title: ROUTE.RETURN_ORDER.EDIT.TITLE,
        })
        break
      default:
        break
    }
    return breadcrumbs
  }

  useEffect(() => {
    if (mode === MODAL_MODE.UPDATE) {
      const id = params?.id
      actions.getReturnOrderDetailsById(id)
    }
    return () => {
      if (isUpdate) actions.resetReturnOrder()
    }
  }, [params?.id])

  const getTitle = () => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.RETURN_ORDER.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.RETURN_ORDER.EDIT.TITLE
      default:
        break
    }
  }

  const backToList = () => {
    history.push(ROUTE.RETURN_ORDER.LIST.PATH)
  }

  const onSubmit = (values) => {
    const id = Number(params?.id)
    const convertValues = {
      ...values,
      id,
      orderId: values?.orderCode?.id,
      warehouseId: values?.orderCode?.warehouseId || values?.warehouseId,
      returnType: Number(values?.switchMode),
      deadline: values?.deadline,
      items: values?.items?.map((item, index) => ({
        // ...item,
        id: item.itemId?.id,
        quantity: Number(item.quantity),
        lotNumber: item.lotNumber,
        mfg: itemByOrderList?.items?.[index]?.mfg,
        packageId: item.packageId?.id,
        warehouseId: values?.orderCode?.warehouseId || values?.warehouseId,
      })),
    }

    if (mode === MODAL_MODE.CREATE) {
      actions.createReturnOrder(convertValues, backToList)
    } else if (mode === MODAL_MODE.UPDATE) {
      actions.updateReturnOrder(convertValues, backToList)
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
      <Formik
        initialValues={initialValues}
        validationSchema={returnOrderSchema(t, itemByOrderList)}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ handleReset, setFieldValue, values }) => {
          const type = Number(values?.switchMode)
          const letterOptions =
            type === LETTER_TYPE.PAY_SUPPLIER
              ? purchasedOrderList
              : saleOrderList

          const orderOptions =
            type === LETTER_TYPE.PAY_SUPPLIER ? poImportList : soExportList

          return (
            <Form>
              <Grid container justifyContent="center">
                <Grid item xl={11} xs={12}>
                  <Grid
                    container
                    rowSpacing={4 / 3}
                    columnSpacing={{ xl: 8, xs: 4 }}
                  >
                    {isUpdate && (
                      <Grid item xs={12}>
                        <LV
                          label={
                            <Typography>{t('returnOrder.status')}</Typography>
                          }
                          value={
                            <Status
                              options={RETURN_ORDER_STATUS_OPTIONS}
                              value={returnOrderDetails?.status}
                            />
                          }
                        />
                      </Grid>
                    )}
                    <Grid item lg={6} xs={12}>
                      <Field.TextField
                        label={t('returnOrder.code')}
                        name="code"
                        placeholder={t('returnOrder.code')}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_12.MAX,
                        }}
                        allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
                        disabled={isUpdate}
                        required
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.TextField
                        name="name"
                        label={t('returnOrder.name')}
                        placeholder={t('returnOrder.name')}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                        }}
                        required
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <LV
                        label={
                          <Typography sx={{ mt: '9px' }} required>
                            {t('returnOrder.letterType')}
                          </Typography>
                        }
                        required
                      >
                        <Field.RadioGroup
                          name="switchMode"
                          onChange={() => {
                            setFieldValue('letterCode', '')
                            setFieldValue('orderCode', '')
                            setFieldValue('items', [{ ...DEFAULT_ITEM }])
                          }}
                        >
                          <FormControlLabel
                            value="0"
                            control={<Radio />}
                            label={t('returnOrder.paySupplier')}
                          />
                          <FormControlLabel
                            value="1"
                            control={<Radio />}
                            label={t('returnOrder.payCustomer')}
                          />
                        </Field.RadioGroup>
                      </LV>
                    </Grid>
                    <Hidden lgDown>
                      <Grid item lg={6} xs={12}></Grid>
                    </Hidden>
                    <Grid item xs={12} lg={6}>
                      <Field.Autocomplete
                        name="letterCode"
                        label={t('returnOrder.letterCode')}
                        placeholder={t('returnOrder.letterCode')}
                        options={letterOptions}
                        getOptionLabel={(opt) => `${opt?.code} - ${opt?.name}`}
                        filterOptions={createFilterOptions({
                          stringify: (opt) => `${opt?.code}|${opt?.name}`,
                        })}
                        isOptionEqualToValue={(opt, val) =>
                          opt?.code === val?.code
                        }
                        onChange={(val) => {
                          handleGetOrderList(val, values)
                          setFieldValue('orderCode', '')
                          setFieldValue('items', [{ ...DEFAULT_ITEM }])
                        }}
                        required
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.TextField
                        label={t('returnOrder.letterName')}
                        name="letterCode.name"
                        required
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.Autocomplete
                        name="orderCode"
                        label={t('returnOrder.orderCode')}
                        placeholder={t('returnOrder.orderCode')}
                        options={values?.letterCode ? orderOptions : []}
                        getOptionLabel={(opt) => `${opt?.code} - ${opt?.name}`}
                        filterOptions={createFilterOptions({
                          stringify: (opt) => `${opt?.code}|${opt?.name}`,
                        })}
                        isOptionEqualToValue={(opt, val) =>
                          opt?.code === val?.code
                        }
                        onChange={(val) => {
                          const params = {
                            orderId: val?.id,
                            returnType: Number(values?.switchMode),
                          }
                          actions.getItemsByOrderReturnOrder(params)
                        }}
                        required
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.TextField
                        label={t('returnOrder.orderName')}
                        name="orderCode.name"
                        required
                        disabled
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.TextField
                        name="warehouse"
                        label={t('returnOrder.warehouse')}
                        value={
                          values?.orderCode
                            ? warehouseList?.find(
                                (i) => i.id === values?.orderCode?.warehouseId,
                              )?.name
                            : ''
                        }
                        disabled
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.DatePicker
                        name="deadline"
                        label={t('returnOrder.planDate')}
                        placeholder={t('returnOrder.planDateInput')}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field.TextField
                        name="description"
                        label={t('returnOrder.description')}
                        placeholder={t('returnOrder.descriptionInput')}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                        }}
                        multiline
                        rows={3}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Box sx={{ mt: 3 }}>
                <FieldArray
                  name="items"
                  render={(arrayHelpers) => (
                    <ItemSettingTable
                      items={values?.items || []}
                      mode={mode}
                      arrayHelpers={arrayHelpers}
                      setFieldValue={setFieldValue}
                      values={values}
                      // itemByOrderList={itemByOrderList}
                    />
                  )}
                />
              </Box>
              {renderActionBar(handleReset)}
            </Form>
          )
        }}
      </Formik>
    </Page>
  )
}

export default ReturnOrderForm
