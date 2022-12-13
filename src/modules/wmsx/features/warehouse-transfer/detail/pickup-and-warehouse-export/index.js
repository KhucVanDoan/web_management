import React, { useEffect } from 'react'

import { Box, Grid } from '@mui/material'
import { FieldArray, Form, Formik } from 'formik'
import { isEmpty, uniq, map } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import Button from '~/components/Button'
import Icon from '~/components/Icon'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TextField from '~/components/TextField'
import {
  DATA_TYPE,
  TRANSFER_STATUS_OPTIONS,
  WAREHOUSE_TRANSFER_MAP,
} from '~/modules/wmsx/constants'
import useWarehouseImportReceipt from '~/modules/wmsx/redux/hooks/useWarehouseImportReceipt'
import useWarehouseTransfer from '~/modules/wmsx/redux/hooks/useWarehouseTransfer'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertUtcDateToLocalTz } from '~/utils'

import ItemSettingTable from './items-setting-table'
import { formSchema } from './schema'

const PickupAndWarehouseExport = () => {
  const breadcrumbs = [
    {
      route: ROUTE.WAREHOUSE_TRANSFER.LIST.PATH,
      title: ROUTE.WAREHOUSE_TRANSFER.LIST.TITLE,
    },
    {
      route: ROUTE.WAREHOUSE_TRANSFER.DETAIL.PATH,
      title: ROUTE.WAREHOUSE_TRANSFER.DETAIL.TITLE,
    },
    {
      route: ROUTE.WAREHOUSE_TRANSFER.PICKUP.PATH,
      title: ROUTE.WAREHOUSE_TRANSFER.PICKUP.TITLE,
    },
  ]
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const { id } = useParams()
  const {
    data: { warehouseTransferDetails, isLoading },
    actions,
  } = useWarehouseTransfer()
  const {
    data: { attributesBusinessTypeDetails },
    actions: useWarehouseImportReceiptAction,
  } = useWarehouseImportReceipt()
  useEffect(() => {
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
      useWarehouseImportReceiptAction.getAttribuiteBusinessTypeDetailsById(
        params,
      )
    })
    return () => {
      actions.resetWarehouseTransfer()
    }
  }, [id])
  const backToList = () => {
    history.push(ROUTE.WAREHOUSE_TRANSFER.LIST.PATH)
  }
  const initialValues = {
    items: warehouseTransferDetails?.warehouseTransferDetailLots?.map(
      (item) => ({
        itemCode: !isEmpty(item?.item)
          ? {
              itemId: item?.itemId,
              id: item?.itemId,
              ...item?.item,
            }
          : '',
        lotNumber: item?.lotNumber || null,
        locator: !isEmpty(item?.locator)
          ? {
              ...item?.locator,
              locatorId: item?.locatorId,
              itemId: item?.itemId,
            }
          : '',
        creditAcc:
          item?.item?.itemWarehouseSources?.find(
            (item) =>
              item?.warehouseId ===
              warehouseTransferDetails?.sourceWarehouse?.id,
          )?.accounting || item?.creditAccount,
        itemName: item?.item?.name || '',
        itemType: item?.item?.itemType?.name || '',
        transferQuantity: +item?.planQuantity || '',
        ExportedQuantity: item?.quantity || '',
      }),
    ),
  }
  const onSubmit = (values) => {
    const params = {
      items: values?.items?.map((item) => ({
        id: +id,
        itemId: item?.itemCode?.id || item?.itemCode?.itemId,
        lotNumber: item?.lotNumber || null,
        locatorId: item?.locator?.locatorId || null,
        quantity: +item?.ExportedQuantity,
      })),
    }
    actions.confirmWarehouseExportById(params, backToList)
  }
  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.pickupAndWarehouseExport')}
      onBack={backToList}
      onSubmit={onSubmit}
      loading={isLoading}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={formSchema(
          t,
          Boolean(warehouseTransferDetails?.sourceWarehouse?.manageByLot),
        )}
        onSubmit={onSubmit}
        enableReinitialize
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
                        label={t('warehouseTransfer.status')}
                        value={
                          <Status
                            options={TRANSFER_STATUS_OPTIONS}
                            value={warehouseTransferDetails?.status}
                          />
                        }
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <LV
                        label={t('warehouseTransfer.code')}
                        value={warehouseTransferDetails.code}
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <LV
                        label={t('warehouseTransfer.name')}
                        value={warehouseTransferDetails.name}
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <LV
                        label={t('warehouseTransfer.businessType')}
                        value={warehouseTransferDetails?.bussinessType?.name}
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <LV
                        label={t('warehouseTransfer.type')}
                        value={t(
                          `${
                            WAREHOUSE_TRANSFER_MAP[
                              warehouseTransferDetails?.type
                            ]
                          }`,
                        )}
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <LV
                        label={t('warehouseTransfer.reason')}
                        value={`${warehouseTransferDetails?.reason?.code} - ${warehouseTransferDetails?.reason?.name}`}
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <LV
                        label={t('warehouseTransfer.warehouseImport')}
                        value={
                          warehouseTransferDetails?.destinationWarehouse?.name
                        }
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <LV
                        label={t('warehouseTransfer.warehouseExport')}
                        value={warehouseTransferDetails?.sourceWarehouse?.name}
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <LV
                        label={t('warehouseTransfer.createdAt')}
                        value={convertUtcDateToLocalTz(
                          warehouseTransferDetails?.createdAt,
                        )}
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <LV label={t('warehouseTransfer.receiptNo')} value={''} />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <LV
                        label={t('warehouseTransfer.deliver')}
                        value={warehouseTransferDetails?.receiver}
                      />
                    </Grid>
                    {warehouseTransferDetails?.attributes?.map((item) => {
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
                                    `${itemDetail.id}` === item.value,
                                )?.name ||
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
                    <Grid item xs={12}>
                      <TextField
                        name="explaination"
                        label={t('warehouseTransfer.explaination')}
                        multiline
                        rows={3}
                        value={warehouseTransferDetails?.explanation}
                        readOnly
                        sx={{
                          'label.MuiFormLabel-root': {
                            color: (theme) => theme.palette.subText.main,
                          },
                        }}
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
                      arrayHelpers={arrayHelpers}
                      setFieldValue={setFieldValue}
                    />
                  )}
                />
              </Box>
              <ActionBar
                onBack={backToList}
                elAfter={
                  <>
                    {/* <Button>
                      <Icon name="print" mr={1} />
                      {t(`warehouseTransfer.printReceipt`)}
                    </Button> */}
                    <Button type="submit">
                      <Icon name="confirm" mr={1} />
                      {t(`warehouseTransfer.confirmWarehouseExport`)}
                    </Button>
                  </>
                }
              />
            </Form>
          )
        }}
      </Formik>
    </Page>
  )
}

export default PickupAndWarehouseExport
