import React, { useEffect } from 'react'

import { Box, Grid } from '@mui/material'
import { FieldArray, Form, Formik } from 'formik'
import { uniq, map, groupBy } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import { MODAL_MODE, NOTIFICATION_TYPE } from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  ORDER_STATUS_OPTIONS,
  MOVEMENT_TYPE,
  DATA_TYPE,
} from '~/modules/wmsx/constants'
import useWarehouseImportReceipt from '~/modules/wmsx/redux/hooks/useWarehouseImportReceipt'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertUtcDateToLocalTz, getLocalItem } from '~/utils'
import addNotification from '~/utils/toast'

import ItemsSettingTable from './items-setting-table'
import { formSchema } from './schema'

const breadcrumbs = [
  {
    title: 'receiptCommandManagement',
  },
  {
    route: ROUTE.WAREHOUSE_IMPORT_RECEIPT.LIST.PATH,
    title: ROUTE.WAREHOUSE_IMPORT_RECEIPT.LIST.TITLE,
  },
  {
    route: ROUTE.WAREHOUSE_IMPORT_RECEIPT.DETAIL.PATH,
    title: ROUTE.WAREHOUSE_IMPORT_RECEIPT.DETAIL.TITLE,
  },
  {
    route: ROUTE.WAREHOUSE_IMPORT_RECEIPT.RECEIVE_AND_STORAGE.PATH,
    title: ROUTE.WAREHOUSE_IMPORT_RECEIPT.RECEIVE_AND_STORAGE.TITLE,
  },
]

function WarehouseImportReceiveAndStorage() {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const { id } = useParams()
  const {
    data: {
      warehouseImportReceiptDetails,
      isLoading,
      attributesBusinessTypeDetails,
    },
    actions,
  } = useWarehouseImportReceipt()

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
        values.items?.map((item) => ({
          ...item,
          itemId: item.itemCode?.itemId,
        })),
        'itemId',
      )

      if (
        Object.keys(itemByIds)?.length <
        warehouseImportReceiptDetails?.purchasedOrderImportDetails?.length
      ) {
        addNotification(
          t('warehouseImportReceipt.importedItemIsNotEnough'),
          NOTIFICATION_TYPE.ERROR,
        )
        return
      }

      const itemsRequest = Object.keys(itemByIds)?.map((itemId) => ({
        id: Number(itemId),
        locations: itemByIds[itemId]?.map((locator) => ({
          locatorId: locator.locator?.locatorId,
          quantity: locator.receivedQuantity,
        })),
      }))
      const userInfo = getLocalItem('userInfo')
      const payload = {
        userId: userInfo.id,
        movementType: MOVEMENT_TYPE.PO_IMPORT,
        orderId: Number(id),
        warehouseId: warehouseImportReceiptDetails?.warehouse?.id,
        items: itemsRequest,
        autoCreateReceive: 1,
      }
      actions.importWarehouse(payload, backToDetail)
    } catch (error) {
      addNotification(error.message, NOTIFICATION_TYPE.ERROR)
    }
  }

  const initialValues = {
    items: [
      {
        itemCode: '',
        locator: '',
        itemName: '',
        itemUnit: '',
        quantity: '',
        receivedQuantity: '',
      },
    ],
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.warehouseImportReceiveAndStorage')}
      onBack={backToDetail}
      loading={isLoading}
    >
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={formSchema(t)}
        onSubmit={onSubmit}
      >
        {({ values }) => {
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
                            options={ORDER_STATUS_OPTIONS}
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
                        label={t('warehouseImportReceipt.createdAt')}
                        value={convertUtcDateToLocalTz(
                          warehouseImportReceiptDetails.receiptDate,
                        )}
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <LV
                        label={t('warehouseImportReceipt.attachedFile')}
                        value={warehouseImportReceiptDetails.attachedFile}
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
                        value={warehouseImportReceiptDetails.businessType?.name}
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <LV
                        label={t('warehouseImportReceipt.warehouse')}
                        value={warehouseImportReceiptDetails.warehouse?.name}
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <LV
                        label={t('warehouseImportReceipt.reason')}
                        value={warehouseImportReceiptDetails.reason?.name}
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <LV
                        label={t('warehouseImportReceipt.source')}
                        value={warehouseImportReceiptDetails.source?.name}
                      />
                    </Grid>
                    {warehouseImportReceiptDetails?.attributes?.map((item) => {
                      if (item.tableName) {
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
                                )?.name ||
                                attributesBusinessTypeDetails[
                                  item.tableName
                                ]?.find(
                                  (itemDetail) =>
                                    itemDetail.id + '' === item.value,
                                )?.code
                              }
                            />
                          </Grid>
                        )
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
                  <Box sx={{ mt: 3 }}>
                    <FieldArray
                      name="items"
                      render={(arrayHelpers) => (
                        <ItemsSettingTable
                          items={values?.items}
                          itemList={
                            warehouseImportReceiptDetails?.purchasedOrderImportDetails ||
                            []
                          }
                          arrayHelpers={arrayHelpers}
                          warehouseId={
                            warehouseImportReceiptDetails?.warehouse?.id
                          }
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

export default WarehouseImportReceiveAndStorage
