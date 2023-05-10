import React, { useEffect, useMemo } from 'react'

import { Box, FormControlLabel, Grid } from '@mui/material'
import { FieldArray, Form, Formik } from 'formik'
import {
  uniq,
  map,
  groupBy,
  isEmpty,
  first,
  keyBy,
  omitBy,
  orderBy,
  isNil,
} from 'lodash'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import {
  ASYNC_SEARCH_LIMIT,
  MODAL_MODE,
  NOTIFICATION_TYPE,
} from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  MOVEMENT_TYPE,
  DATA_TYPE,
  TABLE_NAME_ENUM,
  WAREHOUSE_IMPORT_RECEIPT_OPTIONS,
  ACTIVE_STATUS,
} from '~/modules/wmsx/constants'
import useLocationManagement from '~/modules/wmsx/redux/hooks/useLocationManagement'
import useWarehouseImportReceipt from '~/modules/wmsx/redux/hooks/useWarehouseImportReceipt'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { api } from '~/services/api'
import {
  convertFilterParams,
  convertUtcDateToLocalTz,
  getLocalItem,
} from '~/utils'
import { downloadFile } from '~/utils/file'
import addNotification from '~/utils/toast'

import ItemsSettingTable from './items-setting-table'
import { formSchema } from './schema'

function WarehouseImportStorage() {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const { id } = useParams()
  const breadcrumbs = [
    {
      title: 'receiptCommandManagement',
    },
    {
      route: ROUTE.WAREHOUSE_IMPORT_RECEIPT.LIST.PATH,
      title: ROUTE.WAREHOUSE_IMPORT_RECEIPT.LIST.TITLE,
    },
    {
      route: ROUTE.WAREHOUSE_IMPORT_RECEIPT.DETAIL.PATH.replace(':id', id),
      title: ROUTE.WAREHOUSE_IMPORT_RECEIPT.DETAIL.TITLE,
    },
    {
      route: ROUTE.WAREHOUSE_IMPORT_RECEIPT.STORAGE.PATH,
      title: ROUTE.WAREHOUSE_IMPORT_RECEIPT.STORAGE.TITLE,
    },
  ]
  const {
    data: {
      warehouseImportReceiptDetails,
      isLoading,
      attributesBusinessTypeDetails,
    },
    actions,
  } = useWarehouseImportReceipt()

  const {
    actions: getLocation,
    data: { itemByLocationIdList, locationList },
  } = useLocationManagement()
  useEffect(() => {
    getLocation.getItemByLocationId({
      warehouseId: warehouseImportReceiptDetails?.warehouse?.id,
      itemIds: warehouseImportReceiptDetails?.purchasedOrderImportWarehouseLots
        ?.map((item) => item?.itemId)
        ?.join(','),
    })
    getLocation.searchLocations({
      limit: ASYNC_SEARCH_LIMIT,
      filter: convertFilterParams({
        warehouseId: warehouseImportReceiptDetails?.warehouse?.id,
        status: ACTIVE_STATUS.ACTIVE,
        type: [0, 1],
      }),
    })
  }, [warehouseImportReceiptDetails])
  useEffect(() => {
    actions.getWarehouseImportReceiptDetailsById(id, (data) => {
      const attributes = data?.attributes?.filter((e) => e?.tableName)
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
      actions.getAttribuiteBusinessTypeDetailsById(params)
    })
    return () => {
      actions.resetWarehouseImportReceiptState()
    }
  }, [id])

  const backToDetail = () => {
    history.push(ROUTE.WAREHOUSE_IMPORT_RECEIPT.LIST.PATH)
  }
  const dowAttachment = async (params) => {
    const uri = `/v1/files/${params?.id}`
    const res = await api.get(
      uri,
      {},
      {
        responseType: 'blob',
        getHeaders: true,
      },
    )
    if (res.status === 500) {
      addNotification(res?.statusText, NOTIFICATION_TYPE.ERROR)
    } else {
      downloadFile(
        res?.data,
        warehouseImportReceiptDetails.attachment?.fileName?.split('.').shift(),
        `${res?.data?.type}`,
        [`${params?.fileName?.split('.').pop()}`],
      )
    }
  }

  const renderActionBar = (handleReset) => {
    return (
      <ActionBar
        onBack={backToDetail}
        onCancel={handleReset}
        mode={MODAL_MODE.UPDATE}
      />
    )
  }

  const onSubmit = (values) => {
    try {
      const itemByIds = groupBy(
        values.items?.map((item) => {
          return {
            ...item,
            itemId: item.itemCode?.itemId,
          }
        }),
        (e) =>
          `${e.itemId}_${
            e?.lotNumber || e?.lotNumber?.lotNumber || e?.lotNumberOld || ''
          }`,
      )
      if (
        Object.keys(itemByIds)?.length <
        warehouseImportReceiptDetails?.purchasedOrderImportWarehouseLots?.length
      ) {
        addNotification(
          t('warehouseImportReceipt.importedItemIsNotEnough'),
          NOTIFICATION_TYPE.ERROR,
        )
        return
      }

      const itemsRequest = Object.keys(itemByIds)?.map((itemId) => {
        return {
          id: Number(itemId.split('_').shift()),
          lotNumber: first(
            itemByIds[itemId]?.map((lotNumber) => lotNumber?.lotNumber),
          ),
          locations: itemByIds[itemId]?.map((locator) => ({
            locatorId: locator.locator?.locatorId,
            quantity: locator.receivedQuantity,
          })),
        }
      })

      const userInfo = getLocalItem('userInfo')
      const payload = {
        userId: userInfo.id,
        movementType: MOVEMENT_TYPE.PO_IMPORT,
        orderId: Number(id),
        warehouseId: warehouseImportReceiptDetails?.warehouse?.id,
        items: itemsRequest,
      }
      actions.storedWarehouse(payload, backToDetail)
    } catch (error) {
      addNotification(error.message, NOTIFICATION_TYPE.ERROR)
    }
  }
  const initialValues = useMemo(() => {
    const itemByLocationIdListMap = keyBy(itemByLocationIdList, 'id')
    return {
      storedNoLocatin: false,
      items:
        warehouseImportReceiptDetails?.purchasedOrderImportWarehouseLots?.map(
          (item, index) => {
            return {
              id: `${item?.itemId}-${index}`,
              itemCode:
                {
                  itemId: item?.itemId,
                  id: item?.itemId,
                  quantity: item?.quantity,
                  ...item?.item,
                } || null,
              lotNumber: item?.lotNumber || null,
              lotNumberOld: item?.lotNumberOld,
              importQuantity: item?.quantity,
              receivedQuantity: item?.quantity,
              locator: !isEmpty(
                omitBy(
                  first(
                    orderBy(
                      itemByLocationIdListMap[item?.itemId]?.locations,
                      'quantity',
                      'desc',
                    ),
                  )?.locator,
                  isNil,
                ),
              )
                ? first(
                    orderBy(
                      itemByLocationIdListMap[item?.itemId]?.locations,
                      'quantity',
                      'desc',
                    ),
                  )?.locator
                : locationList[0],
            }
          },
        ),
    }
  }, [warehouseImportReceiptDetails, itemByLocationIdList, locationList])
  const receiptRequired = warehouseImportReceiptDetails?.attributes?.find(
    (item) => item?.tableName === TABLE_NAME_ENUM.RECEIPT,
  )
  const handleChecked = (val, setFieldValue) => {
    const items =
      warehouseImportReceiptDetails?.purchasedOrderImportWarehouseLots?.map(
        (item, index) => ({
          id: `${item?.itemId}-${index}`,
          itemCode:
            {
              itemId: item?.itemId,
              id: item?.itemId,
              quantity: item?.quantity,
              ...item?.item,
            } || null,
          importQuantity: item?.quantity,
          receivedQuantity: item?.quantity,
          locator: val
            ? locationList?.find(
                (e) =>
                  e?.code === warehouseImportReceiptDetails?.warehouse?.code,
              )
            : itemByLocationIdList
                ?.find((e) => e?.id === item?.itemId)
                ?.locations?.sort((a, b) => b.quantity - a.quantity)[0]
                ?.locator || locationList[0],
        }),
      )
    if (val) {
      setFieldValue('items', items)
    } else {
      setFieldValue(
        'items',
        warehouseImportReceiptDetails?.purchasedOrderImportWarehouseLots?.map(
          (item, index) => {
            const itemByLocationIdListMap = keyBy(itemByLocationIdList, 'id')
            return {
              id: `${item?.itemId}-${index}`,
              itemCode:
                {
                  itemId: item?.itemId,
                  id: item?.itemId,
                  quantity: item?.quantity,
                  ...item?.item,
                } || null,
              importQuantity: item?.quantity,
              receivedQuantity: item?.quantity,
              locator: !isEmpty(
                omitBy(
                  first(
                    orderBy(
                      itemByLocationIdListMap[item?.itemId]?.locations,
                      'quantity',
                      'desc',
                    ),
                  )?.locator,
                  isNil,
                ),
              )
                ? first(
                    orderBy(
                      itemByLocationIdListMap[item?.itemId]?.locations,
                      'quantity',
                      'desc',
                    ),
                  )?.locator
                : locationList[0],
            }
          },
        ),
      )
    }
  }
  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.warehouseImportStore')}
      onBack={backToDetail}
      loading={isLoading}
    >
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={formSchema(t)}
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue }) => {
          return (
            <Form>
              <Grid container justifyContent="center">
                <Grid item xl={11} xs={12}>
                  <Grid
                    container
                    rowSpacing={4 / 3}
                    columnSpacing={{ xl: 8, xs: 4 }}
                  >
                    <Grid item xs={12}>
                      <LV
                        label={t('warehouseImportReceipt.status')}
                        value={
                          <Status
                            options={WAREHOUSE_IMPORT_RECEIPT_OPTIONS}
                            value={warehouseImportReceiptDetails?.status}
                          />
                        }
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <LV
                        label={t('warehouseImportReceipt.id')}
                        value={warehouseImportReceiptDetails.code}
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <LV
                        label={t('warehouseImportReceipt.receiptEBS')}
                        value={warehouseImportReceiptDetails.ebsId}
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <LV
                        label={t('warehouseImportReceipt.receiptDate')}
                        value={convertUtcDateToLocalTz(
                          warehouseImportReceiptDetails.receiptDate,
                        )}
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <LV
                        label={t('warehouseImportReceipt.attachedFile')}
                        value={
                          warehouseImportReceiptDetails.attachment?.fileName
                        }
                        file={true}
                        onClick={() =>
                          dowAttachment(
                            warehouseImportReceiptDetails.attachment,
                          )
                        }
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <LV
                        label={t('warehouseImportReceipt.shipper')}
                        value={warehouseImportReceiptDetails.deliver}
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <LV
                        label={t('warehouseImportReceipt.departmentReceipt')}
                        value={
                          warehouseImportReceiptDetails?.departmentReceipt?.name
                        }
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <LV
                        label={t('warehouseImportReceipt.expenditureType')}
                        value={
                          !isEmpty(warehouseImportReceiptDetails.businessType)
                            ? `${warehouseImportReceiptDetails.businessType?.code} - ${warehouseImportReceiptDetails.businessType?.name}`
                            : ''
                        }
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <LV
                        label={t('warehouseImportReceipt.warehouse')}
                        value={
                          !isEmpty(warehouseImportReceiptDetails.warehouse)
                            ? `${warehouseImportReceiptDetails.warehouse?.code} - ${warehouseImportReceiptDetails.warehouse?.name}`
                            : ''
                        }
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <LV
                        label={t('warehouseImportReceipt.reason')}
                        value={
                          !isEmpty(warehouseImportReceiptDetails.reason)
                            ? `${warehouseImportReceiptDetails.reason?.code} - ${warehouseImportReceiptDetails.reason?.name}`
                            : ''
                        }
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <LV
                        label={t('warehouseImportReceipt.source')}
                        value={
                          !isEmpty(warehouseImportReceiptDetails.source)
                            ? `${warehouseImportReceiptDetails.source?.code} - ${warehouseImportReceiptDetails.source?.name}`
                            : ''
                        }
                      />
                    </Grid>
                    {receiptRequired && (
                      <Grid item lg={6} xs={12}>
                        <LV
                          label={t('warehouseImportReceipt.contractNumber')}
                          value={warehouseImportReceiptDetails?.contractNumber}
                        />
                      </Grid>
                    )}
                    {warehouseImportReceiptDetails?.attributes?.map((item) => {
                      if (item.tableName) {
                        if (item?.tableName === TABLE_NAME_ENUM.RECEIPT) {
                          return (
                            <Grid item lg={6} xs={12}>
                              <LV
                                label={`${item.fieldName}`}
                                value={
                                  attributesBusinessTypeDetails[
                                    item.tableName
                                  ]?.find(
                                    (itemDetail) =>
                                      `${itemDetail.id}` === item.value,
                                  )?.name ||
                                  attributesBusinessTypeDetails[
                                    item.tableName
                                  ]?.find(
                                    (itemDetail) =>
                                      `${itemDetail.id}` === item.value,
                                  )?.receiptNumber ||
                                  warehouseImportReceiptDetails?.receiptNumber
                                }
                              />
                            </Grid>
                          )
                        } else if (
                          item?.tableName ===
                          TABLE_NAME_ENUM.ORGANIZATION_PAYMENT
                        ) {
                          return (
                            <Grid item lg={6} xs={12}>
                              <LV
                                label={`${item.fieldName}`}
                                value={
                                  attributesBusinessTypeDetails[
                                    item.tableName
                                  ]?.find(
                                    (itemDetail) =>
                                      `${itemDetail.id}` === item.value,
                                  )?.name
                                }
                              />
                            </Grid>
                          )
                        } else if (
                          item?.tableName ===
                            TABLE_NAME_ENUM.SALE_ORDER_EXPORT ||
                          item?.tableName ===
                            TABLE_NAME_ENUM.WAREHOUSE_EXPORT_PROPOSAL
                        ) {
                          return (
                            <Grid item lg={6} xs={12}>
                              <LV
                                label={`${item.fieldName}`}
                                value={
                                  attributesBusinessTypeDetails[
                                    item.tableName
                                  ]?.find(
                                    (itemDetail) =>
                                      `${itemDetail.id}` === item.value,
                                  )?.code
                                }
                              />
                            </Grid>
                          )
                        } else {
                          return (
                            <Grid item lg={6} xs={12}>
                              <LV
                                label={`${item.fieldName}`}
                                value={
                                  attributesBusinessTypeDetails[
                                    item.tableName
                                  ]?.find(
                                    (itemDetail) =>
                                      itemDetail.id + '' === item.value,
                                  )?.code &&
                                  attributesBusinessTypeDetails[
                                    item.tableName
                                  ]?.find(
                                    (itemDetail) =>
                                      itemDetail.id + '' === item.value,
                                  )?.name
                                    ? `${
                                        attributesBusinessTypeDetails[
                                          item.tableName
                                        ]?.find(
                                          (itemDetail) =>
                                            itemDetail.id + '' === item.value,
                                        )?.code
                                      } - ${
                                        attributesBusinessTypeDetails[
                                          item.tableName
                                        ]?.find(
                                          (itemDetail) =>
                                            itemDetail.id + '' === item.value,
                                        )?.name
                                      }`
                                    : ''
                                }
                              />
                            </Grid>
                          )
                        }
                      } else {
                        if (item?.type === DATA_TYPE.DATE) {
                          return (
                            <Grid item lg={6} xs={12}>
                              <LV
                                label={`${item.fieldName}`}
                                value={convertUtcDateToLocalTz(item.value)}
                              />
                            </Grid>
                          )
                        } else {
                          return (
                            <Grid item lg={6} xs={12}>
                              <LV
                                label={`${item.fieldName}`}
                                value={item.value}
                              />
                            </Grid>
                          )
                        }
                      }
                    })}
                  </Grid>
                  <Grid sx={{ mt: 1 }} item xs={12}>
                    <LV
                      label={t('warehouseExportReceipt.explain')}
                      value={warehouseImportReceiptDetails?.explanation}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12} sx={{ mt: 1 }}>
                    <FormControlLabel
                      control={
                        <Field.Checkbox
                          name="storedNoLocation"
                          onChange={(val) => handleChecked(val, setFieldValue)}
                        />
                      }
                      label={t('warehouseImportReceipt.storeNoLocatin')}
                    />
                  </Grid>
                  <Box sx={{ mt: 3 }}>
                    <FieldArray
                      name="items"
                      render={(arrayHelpers) => (
                        <ItemsSettingTable
                          items={values?.items}
                          setFieldValue={setFieldValue}
                          arrayHelpers={arrayHelpers}
                          values={values}
                          warehouse={warehouseImportReceiptDetails?.warehouse}
                        />
                      )}
                    />
                  </Box>
                  {renderActionBar()}
                </Grid>
              </Grid>
            </Form>
          )
        }}
      </Formik>
    </Page>
  )
}

export default WarehouseImportStorage
