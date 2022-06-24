import React, { useEffect, useMemo, useState } from 'react'

import { Box, Grid, Typography } from '@mui/material'
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
import usePurchasedOrder from '~/modules/database/redux/hooks/usePurchasedOrder'
import {
  CODE_SETTINGS,
  QC_CHECK,
  ORDER_STATUS_OPTIONS,
  ORDER_STATUS,
} from '~/modules/wmsx/constants'
import useCommonManagement from '~/modules/wmsx/redux/hooks/useCommonManagement'
import usePurchasedOrdersImport from '~/modules/wmsx/redux/hooks/usePurchasedOrdersImport'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertFilterParams } from '~/utils'

import ItemSettingTable from '../item-setting-table'
import { schema } from './schema'

const POForm = () => {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const params = useParams()
  const routeMatch = useRouteMatch()

  const {
    data: { poImportDetails, isLoading },
    actions,
  } = usePurchasedOrdersImport()

  const {
    data: { purchasedOrderList },
    actions: actionPO,
  } = usePurchasedOrder()

  const {
    data: { warehouseList, itemQualityPoint },
    actions: commonActions,
  } = useCommonManagement()

  const { actions: actionsPurchasedOrderDetails } = usePurchasedOrder()

  const [itemsFilter, setItemsFilter] = useState([])

  useEffect(() => {
    const params = {
      filter: convertFilterParams({
        status: [ORDER_STATUS.CONFIRMED, ORDER_STATUS.IN_PROGRESS].join(','),
      }),
      isGetAll: 1,
    }
    commonActions.getWarehouses({})
    commonActions.getItems({})
    commonActions.getItemQualityPoint({})
    actionPO.searchPurchasedOrders(params)
  }, [])
  const initCode = (domainName) => {
    const domain = CODE_SETTINGS[domainName]
    let newCode = domain.PREFIX
    while (newCode.length < domain.MAX_LENGTH) {
      newCode += domain.FILLED_CHARACTER
    }
    return newCode
  }

  const DEFAULT_ITEM = {
    id: 0,
    itemId: null,
    warehouseId: null,
    quantity: 1,
    qcCheck: false,
    qcCriteria: null,
    lotNumber: initCode(CODE_SETTINGS.PURCHASED_ORDER_IMPORT.DOMAIN),
    packageId: null,
    mfg: null,
    storedQuantity: 1,
  }

  const initialValues = useMemo(
    () => ({
      code: poImportDetails?.code || '',
      name: poImportDetails?.name || '',
      description: poImportDetails?.description?.trim() || '',
      type: poImportDetails?.type,
      purchasedOrderId: poImportDetails?.purchasedOrder?.id,
      warehouseId: poImportDetails?.warehouseId,
      purchasedAt: poImportDetails.purchasedAt || '',
      deliveredAt: poImportDetails.deliveredAt || '',
      items: poImportDetails?.purchasedOrderImportWarehouseLots
        ? poImportDetails?.purchasedOrderImportWarehouseLots?.map(
            (detailLot, index) => ({
              id: index,
              itemId: detailLot.itemId,
              warehouseId: detailLot.warehouseId,
              qcCheck:
                poImportDetails?.purchasedOrderImportWarehouseDetails.find(
                  (detail) =>
                    detail.id ===
                    detailLot.purchasedOrderImportWarehouseDetailId,
                )?.qcCheck === QC_CHECK.TRUE || false,
              qcCriteriaId:
                poImportDetails?.purchasedOrderImportWarehouseDetails.find(
                  (detail) =>
                    detail.id ===
                    detailLot.purchasedOrderImportWarehouseDetailId,
                )?.qcCriteriaId || null,
              qcCriteria:
                itemQualityPoint?.find(
                  (quality) =>
                    quality?.id ===
                    poImportDetails?.purchasedOrderImportWarehouseDetails.find(
                      (detail) =>
                        detail.id ===
                        detailLot.purchasedOrderImportWarehouseDetailId,
                    )?.qcCriteriaId,
                )?.code || '',
              actualQuantity: detailLot.actualQuantity,
              quantity: detailLot.quantity,
              lotNumber: detailLot?.lotNumber,
              mfg: detailLot?.mfg,
              packageId: detailLot?.packageId,
            }),
          )
        : [{ ...DEFAULT_ITEM }],
    }),
    [poImportDetails, itemQualityPoint],
  )

  const MODE_MAP = {
    [ROUTE.PURCHASED_ORDER_IMPORT.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.PURCHASED_ORDER_IMPORT.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const getBreadcrumb = () => {
    const breadcrumbs = [
      {
        title: 'orderManagement',
      },
      {
        route: ROUTE.PURCHASED_ORDER_IMPORT.LIST.PATH,
        title: ROUTE.PURCHASED_ORDER_IMPORT.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumbs.push({
          route: ROUTE.PURCHASED_ORDER_IMPORT.CREATE.PATH,
          title: ROUTE.PURCHASED_ORDER_IMPORT.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumbs.push({
          route: ROUTE.PURCHASED_ORDER_IMPORT.EDIT.PATH,
          title: ROUTE.PURCHASED_ORDER_IMPORT.EDIT.TITLE,
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
      actions.getPOImportDetailsById(id)
    }
    return () => actions.resetPODetailsState()
  }, [params?.id])

  const getTitle = () => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.PURCHASED_ORDER_IMPORT.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.PURCHASED_ORDER_IMPORT.EDIT.TITLE
      default:
        break
    }
  }

  const backToList = () => {
    history.push(ROUTE.PURCHASED_ORDER_IMPORT.LIST.PATH)
  }

  const onSubmit = (values) => {
    const convertValue = {
      code: values?.code,
      name: values?.name?.trim(),
      description: values?.description?.trim() || '',
      type: poImportDetails?.type,
      purchasedOrderId: values?.purchasedOrderId,
      purchasedAt: values?.purchasedAt,
      deliveredAt: values?.deliveredAt,
      warehouseId: values?.warehouseId,
      items: values?.items?.map((item) => ({
        id: item.itemId,
        warehouseId: values?.warehouseId,
        quantity: +item.quantity,
        lotNumber: item.lotNumber,
        qcCheck: item.qcCheck,
        qcCriteriaId: item.qcCriteriaId,
        mfg: item.mfg,
        packageId: item.packageId,
        storedQuantity: +item?.storedQuantity,
      })),
    }
    if (mode === MODAL_MODE.CREATE) {
      actions.createPOImport(convertValue, backToList)
    } else if (mode === MODAL_MODE.UPDATE) {
      actions.updatePOImport({ ...convertValue, id: +params?.id }, backToList)
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

  const onChangePo = (value, setFieldValue) => {
    actionsPurchasedOrderDetails.getPurchasedOrderDetailsById(value, (data) => {
      const { code, purchasedAt, deadline, purchasedOrderDetails } = data
      setItemsFilter(purchasedOrderDetails)
      setFieldValue('codePO', code)
      setFieldValue('purchasedAt', purchasedAt)
      setFieldValue('deliveredAt', deadline)
      setFieldValue('purchasedOrderId', value)
      setFieldValue(
        'items',

        purchasedOrderDetails?.map((detailLot, index) => ({
          id: index,
          itemId: detailLot.itemId,
          quantity: detailLot.quantity,
          actualQuantity: 0,
          lotNumber: DEFAULT_ITEM.lotNumber,
          mfg: null,
          packageId: detailLot?.packageId,
          qcCheck: false,
          qcCriteriaId: null,
          qcCriteria: null,
          storedQuantity: 0,
        })),
      )
    })
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
        validationSchema={schema(t)}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ handleReset, values, setFieldValue }) => (
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
                          <Typography>
                            {t('purchasedOrderImport.status')}
                          </Typography>
                        }
                        value={
                          <Status
                            options={ORDER_STATUS_OPTIONS}
                            value={poImportDetails?.status}
                          />
                        }
                      />
                    </Grid>
                  )}
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      label={t('purchasedOrderImport.codePOimp')}
                      name="code"
                      placeholder={t('purchasedOrderImport.codePOimp')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE.MAX,
                      }}
                      allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="name"
                      label={t('purchasedOrderImport.namePOimp')}
                      required
                      placeholder={t('purchasedOrderImport.namePOimp')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="purchasedOrderId"
                      label={t('purchasedOrderImport.codePO')}
                      placeholder={t('purchasedOrderImport.codePO')}
                      options={purchasedOrderList}
                      getOptionLabel={(opt) => t(opt.code) || ''}
                      getOptionValue={(opt) => opt?.id || ''}
                      onChange={(id) => onChangePo(id, setFieldValue)}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.DatePicker
                      name="purchasedAt"
                      label={t('purchasedOrder.purchasedAt')}
                      placeholder={t('purchasedOrder.choosePurchasedAt')}
                      required
                      disabled={isUpdate}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="warehouseId"
                      label={t('purchasedOrderImport.importWarehouse')}
                      placeholder={t('purchasedOrderImport.importWarehouse')}
                      options={warehouseList}
                      required
                      getOptionLabel={(opt) => opt?.name || ''}
                      getOptionValue={(opt) => opt?.id || ''}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.DatePicker
                      name="deliveredAt"
                      label={t('purchasedOrder.deadline')}
                      placeholder={t('purchasedOrder.chooseDeadline')}
                      required
                      disabled={values?.requestId}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field.TextField
                      name="description"
                      label={t('purchasedOrderImport.description')}
                      placeholder={t('purchasedOrderImport.descriptionInput')}
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
                    itemsFilter={itemsFilter}
                    mode={mode}
                    arrayHelpers={arrayHelpers}
                    initialLotNumber={initCode(
                      CODE_SETTINGS.PURCHASED_ORDER_IMPORT.DOMAIN,
                    )}
                    type={values?.type}
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

export default POForm
