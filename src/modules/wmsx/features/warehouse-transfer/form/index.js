import React, { useEffect, useMemo, useState } from 'react'

import { Box, Grid, Typography } from '@mui/material'
import { sub } from 'date-fns'
import { FieldArray, Form, Formik } from 'formik'
import { isEmpty, uniq, map, isNil } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'

import {
  ASYNC_SEARCH_LIMIT,
  MODAL_MODE,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import ActionBar from '~/components/ActionBar'
// import Button from '~/components/Button'
import { Field } from '~/components/Formik'
// import Icon from '~/components/Icon'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  ACTIVE_STATUS,
  PARENT_BUSINESS_TYPE,
  TRANSFER_STATUS_OPTIONS,
  WAREHOUSE_TRANSFER_TYPE_OPTIONS,
  WAREHOUSE_TRANSFER_TYPE,
} from '~/modules/wmsx/constants'
import useWarehouseImportReceipt from '~/modules/wmsx/redux/hooks/useWarehouseImportReceipt'
import useWarehouseTransfer from '~/modules/wmsx/redux/hooks/useWarehouseTransfer'
import { searchBusinessTypesApi } from '~/modules/wmsx/redux/sagas/business-type-management/search-business-types'
import { searchWarehouseApi } from '~/modules/wmsx/redux/sagas/define-warehouse/search-warehouse'
import { searchApi } from '~/modules/wmsx/redux/sagas/reason-management/search'
import { searchSourceManagementApi } from '~/modules/wmsx/redux/sagas/source-management/search'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertFilterParams } from '~/utils'

import DisplayFollowBusinessTypeManagement from './display-field'
import ItemSettingTable from './items-setting-table'
import warehouseTranferSchema from './schema'

const DEFAULT_ITEM = {
  ids: new Date().getTime(),
  itemName: '',
  itemType: '',
  lotNumber: '',
  transferQuantity: '',
  mfg: '',
  packageId: '',
  planExportedQuantity: '',
  unitType: '',
}
const WarehouseTransferForm = () => {
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const { id } = useParams()
  const { t } = useTranslation(['wmsx'])
  const [type, setType] = useState('')
  const MODE_MAP = {
    [ROUTE.WAREHOUSE_TRANSFER.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.WAREHOUSE_TRANSFER.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE
  const {
    data: { warehouseTransferDetails, isLoading },
    actions,
  } = useWarehouseTransfer()
  const {
    data: { attributesBusinessTypeDetails },
    actions: warehouseImportRecipt,
  } = useWarehouseImportReceipt()
  useEffect(() => {
    if (mode === MODAL_MODE.UPDATE) {
      actions.getWarehouseTransferDetailsById(id, (data) => {
        const attributes = data?.attributes?.filter(
          (e) => e?.tableName && e?.value,
        )
        const params = {
          filter: JSON.stringify(
            uniq(map(attributes, 'tableName'))?.map((item) => ({
              tableName: item,
              id: attributes
                ?.filter((e) => e?.tableName === item)
                ?.map((d) => d?.value)
                .toString(),
            })),
          ),
        }
        warehouseImportRecipt.getAttribuiteBusinessTypeDetailsById(params)
      })
    }
    return () => actions.resetWarehouseTransfer()
  }, [mode])
  const initialValues = useMemo(
    () => ({
      code: warehouseTransferDetails?.code || '',
      name: warehouseTransferDetails?.name || '',
      businessTypeId: warehouseTransferDetails?.bussinessType
        ? {
            ...warehouseTransferDetails?.bussinessType,
            bussinessTypeAttributes: warehouseTransferDetails?.attributes,
          }
        : '',
      type: warehouseTransferDetails?.type || '',
      reasonId: warehouseTransferDetails?.reason || '',
      sourceId: warehouseTransferDetails?.source || '',
      destinationWarehouseId:
        warehouseTransferDetails?.destinationWarehouse || '',
      sourceWarehouseId: warehouseTransferDetails?.sourceWarehouse || '',
      receiptDate: warehouseTransferDetails?.receiptDate
        ? new Date(warehouseTransferDetails?.receiptDate)
        : new Date(),
      deliver: warehouseTransferDetails?.receiver || '',
      explanation: warehouseTransferDetails?.explanation || '',
      items: warehouseTransferDetails?.warehouseTransferDetailLots?.map(
        (item) => ({
          itemCode: {
            locations: warehouseTransferDetails?.items?.find(
              (e) => e?.id === item?.itemId,
            )?.locations,
            itemId: item?.itemId,
            id: item?.itemId,
            ...item?.item,
          },
          storageDates: warehouseTransferDetails?.items?.find(
            (e) => e?.id === item?.itemId,
          )?.storageDates,
          warehouseImportDate: item?.storageDate,
          planExportedQuantity: item?.exportableQuantity,
          lotNumber: item?.lotNumber,
          itemName: item?.item?.name,
          locator: { ...item?.locator, locatorId: item?.locatorId },
          itemType: item?.item?.itemType?.name,
          transferQuantity: +item?.planQuantity,
          itemCodeWarehouseImp: Boolean(item?.isExistInDestinationWarehouse),
          debitAcc: item?.debitAccount,
          creditAcc:
            item?.item?.itemWarehouseSources?.find(
              (item) =>
                item?.warehouseId ===
                warehouseTransferDetails?.sourceWarehouse?.id,
            )?.accounting || item?.creditAccount,
        }),
      ) || [{ ...DEFAULT_ITEM }],
    }),
    [warehouseTransferDetails, attributesBusinessTypeDetails],
  )
  warehouseTransferDetails?.attributes?.forEach((item) => {
    if (item.tableName) {
      initialValues[`${item.id}`] =
        attributesBusinessTypeDetails[item.tableName]?.find(
          (itemDetail) => `${itemDetail.id}` === item.value,
        ) || ''
    } else {
      initialValues[`${item.id}`] = item.value || ''
    }
  })
  const onSubmit = (values) => {
    const params = {
      // code: values?.code,
      destinationWarehouseId: +values?.destinationWarehouseId?.id,
      name: values?.name,
      bussinessTypeId: values?.businessTypeId?.id,
      sourceWarehouseId: +values?.sourceWarehouseId?.id,
      receiptDate: values?.receiptDate.toISOString(),
      sourceId: !isEmpty(values?.sourceId) ? values?.sourceId?.id : null,
      reasonId: values?.reasonId?.id,
      type: +values?.type,
      receiver: values?.deliver,
      explanation: values?.explanation,
      items: JSON.stringify(
        values?.items?.map((item) => ({
          itemId: item?.itemCode?.id,
          locatorId: +item?.locator?.locatorId || null,
          quantity: +item.transferQuantity,
          lotNumber: item?.lotNumber || null,
          storageDate: item?.warehouseImportDate,
          isExistInDestinationWarehouse: item?.itemCodeWarehouseImp ? 1 : 0,
          debitAccount: '1519',
          creditAccount: item?.creditAcc,
        })),
      ),
    }
    values?.businessTypeId?.bussinessTypeAttributes?.forEach((att, index) => {
      // if (values[att.tableName]) {
      //   params[`attributes[${index}].id`] = att.id
      //   params[`attributes[${index}].value`] = values[att.tableName]?.id
      // }
      if (values[att.id]) {
        params[`attributes[${index}].id`] = att.id
        params[`attributes[${index}].value`] =
          values[att.id]?.id || values[att.id]
      }
    })
    if (isUpdate) {
      Object.keys(params).forEach((key) => {
        if (params[key] === null) {
          delete params[key]
        }
      })
      actions.updateWarehouseTransfer({ ...params, id: id }, backToList)
    } else {
      Object.keys(params).forEach((key) => {
        if (params[key] === null) {
          delete params[key]
        }
      })
      actions.createWarehouseTransfer(params, backToList)
    }
  }

  const getBreadcrumb = () => {
    const breadcrumbs = [
      {
        title: 'orderManagement',
      },
      {
        route: ROUTE.WAREHOUSE_TRANSFER.LIST.PATH,
        title: ROUTE.WAREHOUSE_TRANSFER.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumbs.push({
          route: ROUTE.WAREHOUSE_TRANSFER.CREATE.PATH,
          title: ROUTE.WAREHOUSE_TRANSFER.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumbs.push({
          route: ROUTE.WAREHOUSE_TRANSFER.EDIT.PATH,
          title: ROUTE.WAREHOUSE_TRANSFER.EDIT.TITLE,
        })
        break
      default:
        break
    }
    return breadcrumbs
  }

  const renderActionBar = (handleReset) => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return (
          <ActionBar
            onBack={backToList}
            onCancel={handleReset}
            mode={MODAL_MODE.CREATE}
            // elBefore={
            //   <Button sx={{ mr: 'auto' }}>
            //     <Icon name="print" mr={1} />
            //     {t(`warehouseTransfer.view`)}
            //   </Button>
            // }
          />
        )
      case MODAL_MODE.UPDATE:
        return (
          <ActionBar
            onBack={backToList}
            onCancel={handleReset}
            mode={MODAL_MODE.UPDATE}
            // elBefore={
            //   <Button sx={{ mr: 'auto' }}>
            //     <Icon name="print" mr={1} />
            //     {t(`warehouseTransfer.view`)}
            //   </Button>
            // }
          />
        )
      default:
    }
  }
  const getTitle = () => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.WAREHOUSE_TRANSFER.CREATE.TITLE

      case MODAL_MODE.UPDATE:
        return ROUTE.WAREHOUSE_TRANSFER.EDIT.TITLE
      default:
    }
  }
  const backToList = () => {
    history.push(ROUTE.WAREHOUSE_TRANSFER.LIST.PATH)
  }

  const handleChangeWarehouse = (val, setFieldValue) => {
    setFieldValue('items', [{ ...DEFAULT_ITEM }])
    setFieldValue('destinationWarehouseId', '')
    // if (val) {
    //   actions.getListItemWarehouseStock({
    //     warehouseId: val?.id,
    //     isGetAll: 1,
    //   })
    // }
  }
  const handleChangeBusinessType = (val, setFieldValue) => {
    if (!isEmpty(val)) {
      if (!isEmpty(val)) {
        val?.bussinessTypeAttributes?.forEach((item) => {
          if (!isNil(item?.id)) {
            setFieldValue(item?.id, '')
          }
        })
      }
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
        validationSchema={warehouseTranferSchema(t, type)}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ handleReset, setFieldValue, values }) => {
          return (
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
                          label={
                            <Typography>
                              {t('warehouseTransfer.status')}
                            </Typography>
                          }
                          value={
                            <Status
                              options={TRANSFER_STATUS_OPTIONS}
                              value={warehouseTransferDetails?.status}
                            />
                          }
                        />
                      </Grid>
                    )}

                    <Grid item lg={6} xs={12}>
                      <Field.DatePicker
                        name="receiptDate"
                        label={t('warehouseTransfer.createdAt')}
                        placeholder={t('warehouseTransfer.createdAt')}
                        maxDate={new Date()}
                        minDate={
                          new Date(
                            sub(new Date(), {
                              years: 0,
                              months: 3,
                              weeks: 0,
                              days: 0,
                              hours: 0,
                              minutes: 0,
                              seconds: 0,
                            }),
                          )
                        }
                        required
                      />
                    </Grid>
                    {isUpdate && (
                      <Grid item xs={12} lg={6}>
                        <Field.TextField
                          label={t('warehouseTransfer.code')}
                          name="code"
                          placeholder={t('warehouseTransfer.code')}
                          disabled
                          required
                        />
                      </Grid>
                    )}
                    <Grid item xs={12} lg={6}>
                      <Field.TextField
                        label={t('warehouseTransfer.name')}
                        name="name"
                        placeholder={t('warehouseTransfer.name')}
                        required
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.Autocomplete
                        name="businessTypeId"
                        label={t('warehouseTransfer.businessType')}
                        placeholder={t('warehouseTransfer.businessType')}
                        asyncRequest={(s) =>
                          searchBusinessTypesApi({
                            keyword: s,
                            limit: ASYNC_SEARCH_LIMIT,
                            filter: convertFilterParams({
                              status: ACTIVE_STATUS.ACTIVE,
                              parentBusiness: PARENT_BUSINESS_TYPE.TRANSFER,
                            }),
                          })
                        }
                        onChange={(val) =>
                          handleChangeBusinessType(val, setFieldValue)
                        }
                        asyncRequestHelper={(res) => res?.data?.items}
                        getOptionLabel={(opt) => opt?.code}
                        getOptionSubLabel={(opt) => opt?.name}
                        isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                        required
                      />
                    </Grid>

                    <Grid item xs={12} lg={6}>
                      <Field.Autocomplete
                        label={t('warehouseTransfer.type')}
                        name="type"
                        placeholder={t('warehouseTransfer.type')}
                        options={WAREHOUSE_TRANSFER_TYPE_OPTIONS}
                        getOptionLabel={(opt) => t(`${opt?.text}`)}
                        getOptionValue={(opt) => opt?.id || ''}
                        onChange={(val) => {
                          setType(val)
                          if (
                            val ===
                            WAREHOUSE_TRANSFER_TYPE.WAREHOUSE_TRANSFER_LONG
                          ) {
                            setFieldValue('sourceWarehouseId', '')
                          }
                        }}
                        required
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.Autocomplete
                        name="sourceId"
                        label={t('warehouseTransfer.source')}
                        placeholder={t('warehouseTransfer.source')}
                        asyncRequest={(s) =>
                          searchSourceManagementApi({
                            keyword: s,
                            limit: ASYNC_SEARCH_LIMIT,
                            filter: convertFilterParams({
                              status: ACTIVE_STATUS.ACTIVE,
                            }),
                          })
                        }
                        asyncRequestHelper={(res) => res?.data?.items}
                        getOptionLabel={(opt) => opt?.code}
                        getOptionSubLabel={(opt) => opt?.name}
                        isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.Autocomplete
                        name="reasonId"
                        label={t('warehouseTransfer.reason')}
                        placeholder={t('warehouseTransfer.reason')}
                        asyncRequest={(s) =>
                          searchApi({
                            keyword: s,
                            limit: ASYNC_SEARCH_LIMIT,
                            filter: convertFilterParams({
                              status: ACTIVE_STATUS.ACTIVE,
                            }),
                          })
                        }
                        asyncRequestHelper={(res) => res?.data?.items}
                        getOptionLabel={(opt) => opt?.code}
                        getOptionSubLabel={(opt) => opt?.name}
                        isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                        required
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.Autocomplete
                        name="sourceWarehouseId"
                        label={t('warehouseTransfer.warehouseExport')}
                        placeholder={t('warehouseTransfer.warehouseExport')}
                        asyncRequest={(s) =>
                          searchWarehouseApi({
                            keyword: s,
                            limit: ASYNC_SEARCH_LIMIT,
                            filter: convertFilterParams({
                              status: ACTIVE_STATUS.ACTIVE,
                              expiredInventoryTime:
                                values.type ===
                                WAREHOUSE_TRANSFER_TYPE.WAREHOUSE_TRANSFER_LONG
                                  ? '1'
                                  : '0',
                            }),
                          })
                        }
                        asyncRequestDeps={
                          values.type ===
                          WAREHOUSE_TRANSFER_TYPE.WAREHOUSE_TRANSFER_LONG
                        }
                        asyncRequestHelper={(res) => res?.data?.items}
                        getOptionLabel={(opt) => opt?.code}
                        getOptionSubLabel={(opt) => opt?.name}
                        isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                        onChange={(val) =>
                          handleChangeWarehouse(val, setFieldValue)
                        }
                        required
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.Autocomplete
                        name="destinationWarehouseId"
                        label={t('warehouseTransfer.warehouseImport')}
                        placeholder={t('warehouseTransfer.warehouseImport')}
                        asyncRequest={(s) =>
                          searchWarehouseApi({
                            keyword: s,
                            limit: ASYNC_SEARCH_LIMIT,
                            filter: convertFilterParams({
                              status: ACTIVE_STATUS.ACTIVE,
                              manageByLot:
                                values?.sourceWarehouseId?.manageByLot,
                            }),
                          })
                        }
                        asyncRequestHelper={(res) => res?.data?.items}
                        asyncRequestDeps={values?.sourceWarehouseId}
                        getOptionLabel={(opt) => opt?.code}
                        getOptionSubLabel={(opt) => opt?.name}
                        isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                        onChange={() =>
                          setFieldValue('items', [{ ...DEFAULT_ITEM }])
                        }
                        required
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.TextField
                        name="deliver"
                        label={t('warehouseTransfer.deliver')}
                        placeholder={t('warehouseTransfer.deliver')}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_50.MAX,
                        }}
                      />
                    </Grid>
                    {DisplayFollowBusinessTypeManagement(
                      values?.businessTypeId?.bussinessTypeAttributes,
                      t,
                      values,
                      setFieldValue,
                    )}
                    <Grid item xs={12}>
                      <Field.TextField
                        name="explanation"
                        label={t('warehouseTransfer.explaination')}
                        placeholder={t('warehouseTransfer.explaination')}
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
                      items={values?.items}
                      mode={mode}
                      arrayHelpers={arrayHelpers}
                      setFieldValue={setFieldValue}
                      values={values}
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

export default WarehouseTransferForm
