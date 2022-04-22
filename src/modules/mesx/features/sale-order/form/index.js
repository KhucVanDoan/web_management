import React, { useState, useEffect, useMemo } from 'react'

import { createFilterOptions, Grid } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Formik, Form, FieldArray } from 'formik'
import { useTranslation } from 'react-i18next'
import { useHistory, useRouteMatch, useParams } from 'react-router-dom'

import {
  MODAL_MODE,
  TEXTFIELD_REQUIRED_LENGTH,
  TEXTFIELD_ALLOW,
  ASYNC_SEARCH_LIMIT,
} from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import Page from '~/components/Page'
import { useAppStore } from '~/modules/auth/redux/hooks/useAppStore'
import { ROUTE } from '~/modules/database/routes/config'
import { useDefineBOQ } from '~/modules/mesx/redux/hooks/useDefineBOQ'
import useSaleOrder from '~/modules/mesx/redux/hooks/useSaleOrder'
import { getCustomersApi } from '~/modules/mesx/redux/sagas/define-customer/get-customers'

import ItemsSettingTable from './items-setting-table'
import { saleOrderSchema } from './schema'

function SaleOrderForm() {
  const { t } = useTranslation(['mesx'])
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const { id } = useParams()
  const {
    data: { boqList },
    actions: defineBoqAction,
  } = useDefineBOQ()
  const {
    data: { saleOrderDetails: saleOrder, isLoading },
    actions: saleOrderAction,
  } = useSaleOrder()
  const {
    appStore: { companies },
  } = useAppStore()

  const DEFAULT_ITEM = {
    id: new Date().getTime(),
    itemId: null,
    quantity: 1,
  }

  const [mode, setMode] = useState(MODAL_MODE.CREATE)

  const MODE_MAP = {
    [ROUTE.SALE_ORDER.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.SALE_ORDER.EDIT.PATH]: MODAL_MODE.UPDATE,
  }

  useEffect(() => {
    setMode(MODE_MAP[routeMatch.path])
    refreshData()
    return () => saleOrderAction.resetSaleOrderState()
  }, [mode])

  const refreshData = () => {
    const params = {
      isGetAll: 1,
    }
    defineBoqAction.searchBOQ(params)
    // actionCommon.getCustomers()
    if (mode === MODAL_MODE.UPDATE) {
      saleOrderAction.getSaleOrderDetailsById(id)
    }
  }

  const backToList = () => {
    history.push(ROUTE.SALE_ORDER.LIST.PATH)
  }

  const handleSubmit = (values) => {
    const convertValues = {
      ...values,
      customerId: values?.customerId?.id,
      items: values?.items?.map((item) => ({
        id: item?.itemId,
        quantity: Number(item?.quantity),
        price: +item?.itemPrice,
      })),
    }
    if (mode === MODAL_MODE.CREATE) {
      saleOrderAction.createSaleOrder(convertValues, backToList)
    } else {
      saleOrderAction.updateSaleOrder({ ...convertValues, id: +id }, backToList)
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
        route: ROUTE.SALE_ORDER.LIST.PATH,
        title: ROUTE.SALE_ORDER.LIST.TITLE,
      },
    ]

    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.SALE_ORDER.CREATE.PATH,
          title: ROUTE.SALE_ORDER.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.SALE_ORDER.EDIT.PATH,
          title: ROUTE.SALE_ORDER.EDIT.TITLE,
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
        return ROUTE.SALE_ORDER.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.SALE_ORDER.EDIT.TITLE
      default:
    }
  }

  const initialValues = useMemo(
    () => ({
      code: saleOrder?.code || '',
      name: saleOrder?.name || '',
      description: saleOrder?.description || '',
      customerId: saleOrder?.customer || null,
      boqId: saleOrder?.boqId || null,
      companyId: saleOrder?.companyId || '',
      orderedAt: saleOrder?.orderedAt || null,
      deadline: saleOrder?.deadline || null,
      items: saleOrder?.saleOrderDetails?.map((e) => ({
        id: e?.id,
        itemId: e?.itemId,
        quantity: e?.quantity,
        itemPrice: e?.price,
      })) || [{ ...DEFAULT_ITEM }],
    }),
    [saleOrder],
  )

  return (
    <Page
      breadcrumbs={getBreadcrumb()}
      title={t(`menu.${getTitle()}`)}
      loading={isLoading}
      onBack={backToList}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={saleOrderSchema(t)}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ handleReset, values }) => (
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
                      label={t('saleOrder.code')}
                      name="code"
                      placeholder={t('saleOrder.code')}
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
                      label={t('saleOrder.name')}
                      name="name"
                      placeholder={t('saleOrder.name')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.DatePicker
                      name="orderedAt"
                      label={t('saleOrder.orderedAt')}
                      placeholder={t('saleOrder.orderedAt')}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.Autocomplete
                      options={boqList}
                      label={t('saleOrder.boqCode')}
                      name="boqId"
                      getOptionValue={(opt) => opt?.id}
                      getOptionLabel={(opt) => opt?.code || opt?.name}
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
                      {t('saleOrder.vendor.title')}
                    </Typography>
                    <Box mt={4 / 3}>
                      <Field.Autocomplete
                        options={companies}
                        label={t('saleOrder.vendor.name')}
                        name="companyId"
                        getOptionValue={(opt) => opt?.id}
                        getOptionLabel={(opt) => opt?.name || opt?.code}
                        filterOptions={createFilterOptions({
                          stringify: (opt) => `${opt?.code}|${opt?.name}`,
                        })}
                        required
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Typography variant="body2" mt={1}>
                      {t('saleOrder.customer.title')}
                    </Typography>
                    <Box mt={4 / 3}>
                      <Field.Autocomplete
                        name="customerId"
                        label={t('saleOrder.customer.name')}
                        asyncRequest={(s) =>
                          getCustomersApi({
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
                      <Field.DatePicker
                        name="deadline"
                        label={t('saleOrder.deadline')}
                        placeholder={t('saleOrder.deadline')}
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
                      label={t('saleOrder.description')}
                      placeholder={t('saleOrder.description')}
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

export default SaleOrderForm
