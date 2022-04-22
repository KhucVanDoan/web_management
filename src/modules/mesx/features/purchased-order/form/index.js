import React, { useState, useEffect, useMemo } from 'react'

import { createFilterOptions, Grid, Hidden } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Formik, Form, FieldArray } from 'formik'
import { useTranslation } from 'react-i18next'
import {
  useHistory,
  useRouteMatch,
  useParams,
  useLocation,
} from 'react-router-dom'

import {
  MODAL_MODE,
  TEXTFIELD_REQUIRED_LENGTH,
  TEXTFIELD_ALLOW,
} from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import Page from '~/components/Page'
import { useAppStore } from '~/modules/auth/redux/hooks/useAppStore'
import { MO_STATUS } from '~/modules/mesx/constants'
import { useCommonManagement } from '~/modules/mesx/redux/hooks/useCommonManagement'
import { useMo } from '~/modules/mesx/redux/hooks/useMo'
import usePurchasedOrder from '~/modules/mesx/redux/hooks/usePurchasedOrder'
// import { getCustomersApi } from '~/modules/mesx/redux/sagas/define-customer/get-customers'
import { ROUTE } from '~/modules/mesx/routes/config'
import qs from '~/utils/qs'

import ItemsSettingTable from './items-setting-table'
import { validationSchema } from './schema'

function PurchasedOrderForm() {
  const { t } = useTranslation(['mesx'])
  const history = useHistory()
  const routeMatch = useRouteMatch()

  const { id } = useParams()
  const location = useLocation()
  const { cloneId } = qs.parse(location.search)
  const {
    data: { vendorList },
    actions: commonActions,
  } = useCommonManagement()

  const {
    data: { moList },
    actions: moActions,
  } = useMo()

  const {
    appStore: { companies },
  } = useAppStore()

  const {
    data: { purchasedOrderDetails, isLoading },
    actions,
  } = usePurchasedOrder()

  const DEFAULT_ITEM = {
    id: new Date().getTime(),
    itemId: null,
    quantity: 1,
    price: 0,
    qcCheck: false,
  }

  const MODE_MAP = {
    [ROUTE.PURCHASED_ORDER.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.PURCHASED_ORDER.EDIT.PATH]: MODAL_MODE.UPDATE,
  }

  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  useEffect(() => {
    commonActions.getVendors({ isGetAll: 1 })
  }, [])

  useEffect(() => {
    moActions.searchMO({ isGetAll: 1 })
    if (id) {
      actions.getPurchasedOrderDetailsById(id)
    }
    if (cloneId) {
      actions.getPurchasedOrderDetailsById(cloneId)
    }
    return () => {
      actions.resetPurchasedOrderDetailsState()
    }
  }, [id])

  const backToList = () => {
    history.push(ROUTE.PURCHASED_ORDER.LIST.PATH)
  }

  const initialValues = useMemo(
    () => ({
      code: isUpdate ? purchasedOrderDetails?.code : '',
      name: purchasedOrderDetails?.name || '',
      description: purchasedOrderDetails?.description || '',
      manufacturingOrderId:
        purchasedOrderDetails?.manufacturingOrder?.id || null,
      purchasedAt: purchasedOrderDetails?.purchasedAt || '',
      vendorId: purchasedOrderDetails?.vendorId || null,
      companyId: purchasedOrderDetails?.companyId || null,
      deadline: purchasedOrderDetails?.deadline || null,
      items: purchasedOrderDetails?.purchasedOrderDetails?.map((e) => ({
        id: Number(e?.id),
        itemId: Number(e?.itemId),
        quantity: Number(e?.quantity),
      })) || [{ ...DEFAULT_ITEM }],
    }),
    [purchasedOrderDetails],
  )

  const [manufacturingOrderId, setManufacturingOrderId] = useState(null)

  useEffect(() => {
    setManufacturingOrderId(purchasedOrderDetails.manufacturingOrder?.id)
  }, [purchasedOrderDetails])

  const handleSubmit = (values) => {
    const convertValues = {
      ...values,
      items: values?.items?.map((item) => ({
        id: item?.itemId,
        quantity: Number(item?.quantity),
        price: Number(item?.price),
      })),
    }
    if (mode === MODAL_MODE.CREATE) {
      actions.createPurchasedOrder(convertValues, backToList)
    } else if (mode === MODAL_MODE.UPDATE) {
      actions.updatePurchasedOrder({ ...convertValues, id: +id }, backToList)
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

  const getBreadcrumb = () => {
    const breadcrumb = [
      {
        title: 'database',
      },
      {
        route: ROUTE.PURCHASED_ORDER.LIST.PATH,
        title: ROUTE.PURCHASED_ORDER.LIST.TITLE,
      },
    ]

    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.PURCHASED_ORDER.CREATE.PATH,
          title: ROUTE.PURCHASED_ORDER.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.PURCHASED_ORDER.EDIT.PATH,
          title: ROUTE.PURCHASED_ORDER.EDIT.TITLE,
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
        return ROUTE.PURCHASED_ORDER.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.PURCHASED_ORDER.EDIT.TITLE
      default:
    }
  }

  return (
    <Page
      breadcrumbs={getBreadcrumb()}
      title={t(`menu.${getTitle()}`)}
      loading={isLoading}
      onBack={backToList}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema(t)}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ handleReset, values, setFieldValue }) => (
          <Form>
            <Grid container justifyContent="center">
              <Grid item xl={11} xs={12}>
                <Grid
                  container
                  columnSpacing={{ xl: 8, xs: 4 }}
                  rowSpacing={4 / 3}
                >
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      name="code"
                      label={t('purchasedOrder.code')}
                      placeholder={t('purchasedOrder.code')}
                      disabled={mode === MODAL_MODE.UPDATE}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_20.MAX,
                      }}
                      allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      name="name"
                      label={t('purchasedOrder.name')}
                      placeholder={t('purchasedOrder.name')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.Autocomplete
                      name="manufacturingOrderId"
                      label={t('purchasedOrder.manufacturingOrder')}
                      placeholder={t('purchasedOrder.manufacturingOrder')}
                      options={(moList || []).filter(
                        (mo) => mo.status === MO_STATUS.CONFIRMED,
                      )}
                      getOptionValue={(opt) => opt?.id}
                      getOptionLabel={(opt) => opt?.code || opt?.name}
                      onChange={(val) => {
                        setManufacturingOrderId(val)
                        setFieldValue('items', [{ ...DEFAULT_ITEM }])
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.DatePicker
                      name="purchasedAt"
                      label={t('purchasedOrder.purchasedAt')}
                      placeholder={t('purchasedOrder.purchasedAt')}
                      required
                    />
                  </Grid>
                  <Hidden lgDown>
                    <Grid item lg={6} xs={12}></Grid>
                  </Hidden>
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      name="requestBuyMaterialCode"
                      label={t('purchasedOrder.requestBuyMaterialCode')}
                      disabled
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid
              container
              sx={(theme) => ({
                justifyContent: 'center',
                bgcolor: 'grayF4.main',
                borderRadius: 1,
                my: 2,
                pt: 1,
                pb: 2,

                [theme.breakpoints.down('xl')]: {
                  px: 2,
                },
              })}
            >
              <Grid item xl={11} xs={12}>
                <Grid
                  container
                  columnSpacing={{ xl: 8, xs: 4 }}
                  rowSpacing={4 / 3}
                >
                  <Grid item xs={12} lg={6}>
                    <Typography variant="body2" mt={1}>
                      {t('purchasedOrder.customer.title')}
                    </Typography>
                    <Box mt={4 / 3}>
                      <Field.Autocomplete
                        name="companyId"
                        label={t('purchasedOrder.customer.name')}
                        placeholder={t('purchasedOrder.customer.name')}
                        options={companies}
                        getOptionValue={(opt) => opt?.id}
                        getOptionLabel={(opt) => opt?.name}
                        filterOptions={createFilterOptions({
                          stringify: (opt) => `${opt?.code}|${opt?.name}`,
                        })}
                        required
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Typography variant="body2" mt={1}>
                      {t('purchasedOrder.vendor.title')}
                    </Typography>
                    <Box mt={4 / 3}>
                      <Field.Autocomplete
                        name="vendorId"
                        label={t('purchasedOrder.vendor.name')}
                        placeholder={t('purchasedOrder.vendor.name')}
                        options={vendorList}
                        getOptionValue={(opt) => opt?.id}
                        getOptionLabel={(opt) => opt?.name || opt?.code}
                        filterOptions={createFilterOptions({
                          stringify: (opt) => `${opt?.code}|${opt?.name}`,
                        })}
                        required
                      />
                    </Box>
                    <Box mt={4 / 3}>
                      <Field.DatePicker
                        name="deadline"
                        label={t('purchasedOrder.deadline')}
                        placeholder={t('purchasedOrder.deadline')}
                        required
                        // minDate={startOfToday()}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid container justifyContent="center">
              <Grid item xl={11} xs={12}>
                <Grid
                  container
                  columnSpacing={{ xl: 8, xs: 4 }}
                  rowSpacing={4 / 3}
                >
                  <Grid item xs={12}>
                    <Field.TextField
                      name="description"
                      label={t('purchasedOrder.description')}
                      placeholder={t('purchasedOrder.description')}
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
                  <ItemsSettingTable
                    items={values?.items || []}
                    mode={mode}
                    arrayHelpers={arrayHelpers}
                    manufacturingOrderId={manufacturingOrderId}
                  />
                )}
              />
            </Box>
            {renderActionBar(handleReset)}
          </Form>
        )}
      </Formik>
    </Page>
  )
}

export default PurchasedOrderForm
