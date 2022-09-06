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
import {
  ORDER_TYPE,
  CODE_SETTINGS,
  TRANSACTION_TYPE_ENUM,
  QC_CHECK,
  BOOLEAN_ENUM,
  ORDER_STATUS_OPTIONS,
} from '~/modules/wmsx/constants'
import useCommonManagement from '~/modules/wmsx/redux/hooks/useCommonManagement'
import useImportManufacturingOrder from '~/modules/wmsx/redux/hooks/useImportManufacturingOrder'
import { ROUTE } from '~/modules/wmsx/routes/config'

import ItemsSettingTable from '../items-setting-table'
import { importManufacturingOrderSchema } from './schema'

const ImportManufacturingOrderForm = () => {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const params = useParams()
  const routeMatch = useRouteMatch()

  const {
    data: { importManufacturingOrderDetails, isLoading },
    actions,
  } = useImportManufacturingOrder()

  const {
    data: { supplyRequestList, itemList, itemQualityPoint },
    actions: commonActions,
  } = useCommonManagement()

  const [itemsFilter, setItemsFilter] = useState([])
  useEffect(() => {
    commonActions.getSupplyRequest({})
    commonActions.getItems({ isGetAll: 1 })
    commonActions.getItemQualityPoint({})
  }, [])

  useEffect(() => {
    if (importManufacturingOrderDetails?.request) {
      setItemsFilter(
        supplyRequestList?.find(
          (supplyRequest) =>
            supplyRequest.id === importManufacturingOrderDetails?.request?.id,
        )?.items,
      )
    }
  }, [importManufacturingOrderDetails, supplyRequestList])

  const initCode = (domainName) => {
    const domain = CODE_SETTINGS[domainName]
    let newCode = domain.PREFIX
    while (newCode.length < domain.MAX_LENGTH) {
      newCode += domain.FILLED_CHARACTER
    }
    return newCode
  }

  const DEFAULT_ITEM = {
    id: new Date().getTime(),
    itemId: '',
    warehouseId: null,
    quantity: 1,
    qcCheck: false,
    qcCriteriaId: null,
    lotNumber: CODE_SETTINGS.IMPORT_MANUFACTURING_ORDER.PREFIX,
    packageId: null,
    mfg: '',
  }

  const importOrderWarehouseDetails = useMemo(
    () => importManufacturingOrderDetails?.importOrderWarehouseDetails || [],
    [importManufacturingOrderDetails],
  )

  const initialValues = useMemo(
    () => ({
      code: importManufacturingOrderDetails?.code || '',
      name: importManufacturingOrderDetails?.name || '',
      requestId: importManufacturingOrderDetails?.request?.id || '',
      requestName: importManufacturingOrderDetails?.request?.name || '',
      type: importManufacturingOrderDetails?.type,
      planDate: importManufacturingOrderDetails.planAt
        ? [
            importManufacturingOrderDetails.planAt,
            importManufacturingOrderDetails.deadline,
          ]
        : '',
      description: importManufacturingOrderDetails?.description || '',
      items: importManufacturingOrderDetails?.importOrderWarehouseLots
        ? importManufacturingOrderDetails?.importOrderWarehouseLots?.map(
            (detailLot, index) => ({
              id: index,
              itemId: detailLot.itemId || '',
              warehouseId: detailLot.warehouseId,
              qcCheck:
                importOrderWarehouseDetails.find(
                  (detailWarehouse) =>
                    detailWarehouse.id ===
                    detailLot.importOrderWarehouseDetailId,
                )?.qcCheck === QC_CHECK.TRUE || false,
              qcCriteriaId:
                importOrderWarehouseDetails.find(
                  (detailWarehouse) =>
                    detailWarehouse.id ===
                    detailLot.importOrderWarehouseDetailId,
                )?.qcCriteriaId || null,
              qcCriteria:
                itemQualityPoint.find(
                  (quality) =>
                    quality?.id ===
                    importOrderWarehouseDetails.find(
                      (detailWarehouse) =>
                        detailWarehouse.id ===
                        detailLot.importOrderWarehouseDetailId,
                    )?.qcCriteriaId,
                )?.code || '',
              actualQuantity: detailLot.actualQuantity,
              quantity: detailLot.quantity,
              lotNumber: detailLot?.lotNumber || '',
              mfg: detailLot?.mfg || '',
              packageId: detailLot?.packageId,
            }),
          )
        : [{ ...DEFAULT_ITEM }],
    }),
    [importManufacturingOrderDetails],
  )

  const MODE_MAP = {
    [ROUTE.IMPORT_MANUFACTURING_ORDER.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.IMPORT_MANUFACTURING_ORDER.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const getBreadcrumb = () => {
    const breadcrumbs = [
      {
        title: 'orderManagement',
      },
      {
        route: ROUTE.IMPORT_MANUFACTURING_ORDER.LIST.PATH,
        title: ROUTE.IMPORT_MANUFACTURING_ORDER.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumbs.push({
          route: ROUTE.IMPORT_MANUFACTURING_ORDER.CREATE.PATH,
          title: ROUTE.IMPORT_MANUFACTURING_ORDER.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumbs.push({
          route: ROUTE.IMPORT_MANUFACTURING_ORDER.EDIT.PATH,
          title: ROUTE.IMPORT_MANUFACTURING_ORDER.EDIT.TITLE,
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
      actions.getImportManufacturingOrderDetailsById(id)
    }
    return () => {
      if (isUpdate) actions.resetImportManufacturingOrder()
    }
  }, [params?.id])

  const getTitle = () => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.IMPORT_MANUFACTURING_ORDER.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.IMPORT_MANUFACTURING_ORDER.EDIT.TITLE
      default:
        break
    }
  }

  const backToList = () => {
    history.push(ROUTE.IMPORT_MANUFACTURING_ORDER.LIST.PATH)
  }

  const onSubmit = (values) => {
    const convertValue = {
      code: values?.code,
      name: values?.name?.trim(),
      type: values?.type,
      deadline: values?.planDate[1],
      planAt: values?.planDate[0],
      items: values?.items?.map((item) => ({
        id: item.itemId,
        warehouseId: +item.warehouseId,
        quantity: +item.quantity,
        lotNumber: item.lotNumber,
        qcCheck: item.qcCheck ? BOOLEAN_ENUM.TRUE : BOOLEAN_ENUM.FALSE,
        qcCriteriaId: item?.qcCriteriaId || null,
        mfg: item.mfg,
        packageId: item.packageId || null,
      })),
      ...(values?.description?.trim()
        ? { description: values?.description?.trim() }
        : {}),
      ...(values?.requestId ? { requestId: values?.requestId } : {}),
    }

    if (mode === MODAL_MODE.CREATE) {
      actions.createImportManufacturingOrder(convertValue, backToList)
    } else if (mode === MODAL_MODE.UPDATE) {
      actions.updateImportManufacturingOrder(
        { ...convertValue, id: +params?.id },
        backToList,
      )
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

  const onChangeRequestCode = (value, setFieldValue) => {
    const requestSelected = supplyRequestList?.find((e) => e.id === value)
    if (requestSelected) {
      const { planFrom, planTo, name, id, type } = requestSelected
      const requestItemList = requestSelected?.items
      const typeTransaction =
        +type === TRANSACTION_TYPE_ENUM.EXPORT
          ? TRANSACTION_TYPE_ENUM.IMPORT
          : TRANSACTION_TYPE_ENUM.EXPORT
      setItemsFilter(requestItemList)
      setFieldValue('requestId', id)
      setFieldValue('requestName', name)
      setFieldValue('type', typeTransaction)
      setFieldValue('planDate', [planFrom, planTo])
      const items = requestItemList?.map((requestItem, index) => ({
        id: index,
        itemId: itemList.find((item) => item.code === requestItem.code)?.id,
        warehouseId: '',
        lotNumber:
          +type === TRANSACTION_TYPE_ENUM.EXPORT ? DEFAULT_ITEM.lotNumber : '',
        quantity: requestItem.planQuantity,
        planQuantity: requestItem.planQuantity,
        qcCheck: false,
        qcCriteriaId: '',
        packageId: '',
        mfg: '',
      }))
      setFieldValue('items', items)
      actions.getLotNumberList({
        itemIds: requestItemList
          .map(
            (requestItem) =>
              itemList.find((item) => item.code === requestItem.code)?.id,
          )
          .join(','),
      })
    } else {
      setFieldValue('requestId', '')
      setFieldValue('requestName', '')
      setFieldValue('type', '')
      setFieldValue('planDate', '')
      setFieldValue('items', [{ ...DEFAULT_ITEM }])
      setItemsFilter([])
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
        validationSchema={importManufacturingOrderSchema(t)}
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
                            {t('importManufacturingOrder.status')}
                          </Typography>
                        }
                        value={
                          <Status
                            options={ORDER_STATUS_OPTIONS}
                            value={importManufacturingOrderDetails?.status}
                          />
                        }
                      />
                    </Grid>
                  )}
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      label={t('importManufacturingOrder.code')}
                      name="code"
                      placeholder={t('importManufacturingOrder.code')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE.MAX,
                      }}
                      allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
                      disabled={isUpdate}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="name"
                      label={t('importManufacturingOrder.name')}
                      placeholder={t('importManufacturingOrder.name')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="requestId"
                      label={t('importManufacturingOrder.requestCode')}
                      placeholder={t('importManufacturingOrder.requestCode')}
                      options={supplyRequestList}
                      getOptionLabel={(opt) => opt?.code || ''}
                      getOptionValue={(opt) => opt?.id || ''}
                      onChange={(id) => onChangeRequestCode(id, setFieldValue)}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="requestName"
                      label={t('importManufacturingOrder.requestName')}
                      placeholder={t('importManufacturingOrder.requestName')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      disabled
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="type"
                      label={t('importManufacturingOrder.type')}
                      placeholder={t('importManufacturingOrder.type')}
                      options={ORDER_TYPE}
                      getOptionLabel={(opt) => t(opt?.name)}
                      getOptionValue={(opt) => opt?.id}
                      required
                      disabled={values?.requestId}
                      onChange={() => {
                        setFieldValue('items', [{ ...DEFAULT_ITEM }])
                      }}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.DateRangePicker
                      name="planDate"
                      label={t('importManufacturingOrder.planDate')}
                      placeholder={t('importManufacturingOrder.planDate')}
                      required
                      disabled={values?.requestId}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field.TextField
                      name="description"
                      label={t('importManufacturingOrder.description')}
                      placeholder={t('importManufacturingOrder.description')}
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
                    itemsFilter={itemsFilter}
                    mode={mode}
                    arrayHelpers={arrayHelpers}
                    initialLotNumber={initCode(
                      CODE_SETTINGS.IMPORT_MANUFACTURING_ORDER.DOMAIN,
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

export default ImportManufacturingOrderForm
