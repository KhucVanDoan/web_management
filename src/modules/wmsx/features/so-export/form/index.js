import { useEffect, useMemo } from 'react'

import { Box, Grid, Typography } from '@mui/material'
import { FieldArray, Form, Formik } from 'formik'
import { cloneDeep } from 'lodash'
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
import { searchSaleOrdersApi } from '~/modules/database/redux/sagas/sale-order/search-sale-orders'
import {
  BOOLEAN_ENUM,
  ORDER_STATUS_SO_EXPORT_OPTIONS,
  QC_CHECK,
} from '~/modules/wmsx/constants'
import useCommonManagement from '~/modules/wmsx/redux/hooks/useCommonManagement'
import useDefineWarehouse from '~/modules/wmsx/redux/hooks/useDefineWarehouse'
import useSOExport from '~/modules/wmsx/redux/hooks/useSOExport'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertUtcDateToLocalTz } from '~/utils'

import ItemSettingTable from './item-setting-table'
import { validateShema } from './schema'

function SOExportForm() {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const { id } = useParams()

  const {
    data: { soExportDetails, isLoading },
    actions,
  } = useSOExport()
  const {
    data: { itemQualityPoint },
    actions: commonActions,
  } = useCommonManagement()
  const {
    data: { warehouseList },
    actions: actionWarehouse,
  } = useDefineWarehouse()

  const DEFAULT_ITEM = {
    id: new Date().getTime(),
    itemId: null,
    warehouseId: null,
    quantity: 1,
    qcCheck: false,
    qcCriteriaId: null,
    lotNumber: null,
    packageId: null,
    mfg: null,
  }

  useEffect(() => {
    actionWarehouse.searchWarehouses({ isGetAll: 1 })
    commonActions.getItemQualityPoint()
  }, [])

  const MODE_MAP = {
    [ROUTE.SO_EXPORT.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.SO_EXPORT.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const cloneSOExportWarehouseLots = cloneDeep(
    soExportDetails?.saleOrderExportWarehouseLots,
  )
  const items = cloneSOExportWarehouseLots?.map((detailLot, index) => ({
    id: index,
    itemId: detailLot.itemId,
    warehouseId: detailLot?.warehouseId,
    actualQuantity: detailLot.actualQuantity,
    confirmQuantity: detailLot.confirmQuantity,
    collectedQuantity: detailLot.collectedQuantity,
    quantity: detailLot.quantity,
    qcCheck:
      soExportDetails?.saleOrderExportWarehouseDetails?.find(
        (detail) => detail?.id === detailLot?.saleOrderExportWarehouseDetailId,
      )?.qcCheck === QC_CHECK.TRUE,
    qcCriteriaId: soExportDetails?.saleOrderExportWarehouseDetails?.find(
      (detail) => detail?.id === detailLot?.saleOrderExportWarehouseDetailId,
    )?.qcCriteriaId,
    qcCriteria: itemQualityPoint.find(
      (quality) =>
        quality?.id ===
        soExportDetails?.saleOrderExportWarehouseDetails?.find(
          (detail) =>
            detail?.id === detailLot?.saleOrderExportWarehouseDetailId,
        )?.qcCriteriaId,
    )?.code,
    lotNumber: detailLot.lotNumber,
    mfg: convertUtcDateToLocalTz(detailLot.mfg),
    packageId: detailLot.packageId,
  }))
  const initialValues = useMemo(
    () => ({
      // @TODO: <linh.taquang> waiting BE return company, customer
      code: soExportDetails?.code || '',
      name: soExportDetails?.name || '',
      soCode: soExportDetails?.saleOrder || null,
      warehouse: soExportDetails?.warehouseId || null,
      deliveredAt: soExportDetails?.deliveredAt || null,
      description: soExportDetails?.description || '',
      companyName: soExportDetails?.company?.name,
      customerName: soExportDetails?.customer?.name,
      orderedAt: soExportDetails?.orderedAt,
      items: items || [{ ...DEFAULT_ITEM }],
    }),
    [soExportDetails],
  )
  const backToList = () => {
    history.push(ROUTE.SO_EXPORT.LIST.PATH)
  }

  useEffect(() => {
    actions.getSOExportDetailsById(id)
    return () => actions.resetSOExportState()
  }, [id])

  const handleSubmit = (val) => {
    const params = {
      code: val?.code,
      name: val?.name,
      description: val?.description,
      saleOrderId: val?.soCode?.id,
      companyId: val?.soCode?.company?.id || soExportDetails?.company?.id,
      customerId: val?.soCode?.customer?.id || soExportDetails?.customer?.id,
      orderedAt: val?.soCode?.orderedAt || soExportDetails?.orderedAt,
      deliveredAt: val?.deliveredAt,
      warehouseId: Number(val?.warehouse),
      assignUserIds: [],
      items: val?.items?.map((item) => ({
        id: item.itemId,
        warehouseId: val?.warehouse,
        quantity: +item.quantity,
        qcCheck: item?.qcCheck ? BOOLEAN_ENUM.TRUE : BOOLEAN_ENUM.FALSE,
        qcCriteriaId: item?.qcCriteriaId,
        lotNumber: item?.lotNumber,
        mfg: item?.mfg,
        packageId: item?.packageId,
        palletId: item?.palletId,
        isEven: item?.evenRow ? '1' : '0',
        suggestItemLocationId: item?.location,
      })),
    }
    if (isUpdate) {
      actions.updateSOExport({ id: Number(id), ...params }, backToList)
    } else {
      actions.createSOExport(params, backToList)
    }
  }

  const getBreadcrumb = () => {
    const breadcrumb = [
      {
        route: ROUTE.SO_EXPORT.LIST.PATH,
        title: ROUTE.SO_EXPORT.LIST.TITLE,
      },
    ]

    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.SO_EXPORT.CREATE.PATH,
          title: ROUTE.SO_EXPORT.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.SO_EXPORT.EDIT.PATH,
          title: ROUTE.SO_EXPORT.EDIT.TITLE,
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
        return ROUTE.SO_EXPORT.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.SO_EXPORT.EDIT.TITLE
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
      title={t(`menu.${getTitle()}`)}
      loading={isLoading}
      onBack={backToList}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validateShema(t)}
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
                      <LabelValue
                        label={<Typography>{t('soExport.status')}</Typography>}
                        value={
                          <Status
                            options={ORDER_STATUS_SO_EXPORT_OPTIONS}
                            value={soExportDetails?.status}
                          />
                        }
                      />
                    </Grid>
                  )}
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      label={t('soExport.code')}
                      name="code"
                      placeholder={t('soExport.code')}
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
                      label={t('soExport.name')}
                      name="name"
                      placeholder={t('soExport.name')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.Autocomplete
                      name="soCode"
                      label={t('soExport.soCode')}
                      placeholder={t('soExport.soCode')}
                      asyncRequest={(s) =>
                        searchSaleOrdersApi({
                          keyword: s,
                          limit: ASYNC_SEARCH_LIMIT,
                        })
                      }
                      asyncRequestHelper={(res) => res?.data?.items}
                      getOptionLabel={(opt) => opt?.code}
                      required
                      onChange={(res) => {
                        setFieldValue('companyName', res?.company?.name)
                        setFieldValue('customerName', res?.customer?.name)
                        setFieldValue('orderedAt', res?.orderedAt)
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      label={t('soExport.soName')}
                      name="soCode.name"
                      placeholder={t('soExport.soName')}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.Autocomplete
                      name="warehouse"
                      label={t('soExport.exportWarehouse')}
                      placeholder={t('soExport.exportWarehouse')}
                      options={warehouseList}
                      getOptionValue={(opt) => opt?.id}
                      getOptionLabel={(opt) => opt?.name}
                      getOptionSubLabel={(opt) => opt?.code}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.DatePicker
                      name="deliveredAt"
                      label={t('soExport.deliveryDate')}
                      placeholder={t('soExport.deliveryDate')}
                      required
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
                      {t('soExport.vendor.title')}
                    </Typography>
                    <Box mt={4 / 3}>
                      <Field.TextField
                        label={t('soExport.vendor.companyName')}
                        name="companyName"
                        placeholder={t('soExport.vendor.companyName')}
                        sx={{
                          mt: 4 / 3,
                        }}
                        disabled
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Typography variant="body2" mt={1}>
                      {t('soExport.customer.title')}
                    </Typography>
                    <Box mt={4 / 3}>
                      <Field.TextField
                        label={t('soExport.customer.name')}
                        name="customerName"
                        placeholder={t('soExport.customer.name')}
                        disabled
                      />
                    </Box>
                    <Box mt={4 / 3}>
                      <Field.DatePicker
                        label={t('soExport.orderedAt')}
                        name="orderedAt"
                        placeholder={t('soExport.orderedAt')}
                        disabled
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
                      label={t('soExport.description')}
                      placeholder={t('soExport.description')}
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
                    arrayHelpers={arrayHelpers}
                    mode={mode}
                    items={values?.items || []}
                    soId={values?.soCode?.id || ''}
                    setFieldValue={setFieldValue}
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

export default SOExportForm
