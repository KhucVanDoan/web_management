import React, { useEffect, useMemo } from 'react'

import { createFilterOptions, Grid } from '@mui/material'
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
  ASYNC_SEARCH_LIMIT,
  ORDER_DIRECTION,
} from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import Tabs from '~/components/Tabs'
import { SALE_ORDER_STATUS_OPTIONS } from '~/modules/database/constants'
import useDefineCompany from '~/modules/database/redux/hooks/useDefineCompany'
import useSaleOrder from '~/modules/database/redux/hooks/useSaleOrder'
import { ROUTE } from '~/modules/database/routes/config'
import { useDefineBOQ } from '~/modules/mesx/redux/hooks/useDefineBOQ'
import { searchCustomersApi } from '~/modules/mesx/redux/sagas/define-customer/search-customers'
import { convertSortParams } from '~/utils'
import qs from '~/utils/qs'

import ItemsSettingTable from './items-setting-table'
import { saleOrderSchema } from './schema'
import TableInfo from './table-info'

function SaleOrderForm() {
  const { t } = useTranslation(['database'])
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const { id } = useParams()
  const location = useLocation()
  const { cloneId } = qs.parse(location.search)
  const {
    data: { boqList },
    actions: defineBoqAction,
  } = useDefineBOQ()
  const {
    data: { saleOrderDetails: saleOrder, isLoading },
    actions: saleOrderAction,
  } = useSaleOrder()
  const {
    data: { companyList },
    actions: defineCompany,
  } = useDefineCompany()
  const DEFAULT_ITEM = {
    id: new Date().getTime(),
    itemId: null,
    quantity: 0,
    price: null,
    item: null,
  }

  const MODE_MAP = {
    [ROUTE.SALE_ORDER.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.SALE_ORDER.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  useEffect(() => {
    refreshData()
    return () => saleOrderAction.resetSaleOrderState()
  }, [mode, cloneId])
  useEffect(() => {
    defineCompany.searchCompanies({ isGetAll: 1 })
  }, [])
  const refreshData = () => {
    const params = {
      isGetAll: 1,
    }
    defineBoqAction.searchBOQ(params)
    if (isUpdate) {
      saleOrderAction.getSaleOrderDetailsById(id)
    }
    if (cloneId) {
      saleOrderAction.getSaleOrderDetailsById(cloneId)
    }
  }

  const backToList = () => {
    history.push(ROUTE.SALE_ORDER.LIST.PATH)
  }

  const handleSubmit = (values) => {
    const convertValues = {
      ...values,
      customerId: values?.customerId?.id,
      boqId: values?.boqId ? values?.boqId : null,
      items: values?.items?.map((item) => ({
        id: item?.itemId || item?.item?.id,
        quantity: Number(item?.quantity),
        price: +item?.price,
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
      code: isUpdate ? saleOrder?.code : '',
      name: saleOrder?.name || '',
      description: saleOrder?.description || '',
      customerId: saleOrder?.customer || null,
      boqId: saleOrder?.boqId || null,
      companyId: saleOrder?.companyId || '',
      orderedAt: saleOrder?.orderedAt || null,
      deadline: saleOrder?.deadline || null,
      items: saleOrder?.saleOrderDetails || [{ ...DEFAULT_ITEM }],
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
        {({ handleReset, values, setFieldValue }) => (
          <Form>
            <Grid container justifyContent="center">
              <Grid item xl={11} xs={12}>
                <Grid
                  container
                  columnSpacing={{ xl: 8, xs: 4 }}
                  rowSpacing={4 / 3}
                >
                  {isUpdate && (
                    <Grid item xs={12}>
                      <LV
                        label={<Typography>{t('saleOrder.status')}</Typography>}
                        value={
                          <Status
                            options={SALE_ORDER_STATUS_OPTIONS}
                            value={saleOrder?.status}
                          />
                        }
                      />
                    </Grid>
                  )}
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
                      {...(cloneId ? { autoFocus: true } : {})}
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
                      getOptionValue={(opt) => opt?.id || ''}
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
                        options={companyList}
                        label={t('saleOrder.vendor.name')}
                        name="companyId"
                        placeholder={t('saleOrder.vendor.name')}
                        getOptionValue={(opt) => opt?.id || ''}
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
                        placeholder={t('saleOrder.customer.name')}
                        asyncRequest={(s) =>
                          searchCustomersApi({
                            keyword: s,
                            limit: ASYNC_SEARCH_LIMIT,
                            sort: convertSortParams({
                              order: ORDER_DIRECTION.ASC,
                              orderBy: 'name',
                            }),
                          })
                        }
                        asyncRequestHelper={(res) => res?.data?.items}
                        getOptionLabel={(opt) => opt?.name}
                        getOptionSubLabel={(opt) => opt?.code}
                        isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                        options={
                          saleOrder?.customer?.id ? [saleOrder?.customer] : []
                        }
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
              <Tabs
                list={[t('saleOrder.itemsDetails'), t('saleOrder.itemsInfo')]}
              >
                <FieldArray
                  name="items"
                  render={(arrayHelpers) => (
                    <ItemsSettingTable
                      items={values?.items || []}
                      mode={mode}
                      arrayHelpers={arrayHelpers}
                      setFieldValue={setFieldValue}
                    />
                  )}
                />
                <TableInfo items={values?.items || []} mode={mode} />
              </Tabs>
            </Box>
            {renderActionBar(handleReset)}
          </Form>
        )}
      </Formik>
    </Page>
  )
}

export default SaleOrderForm
