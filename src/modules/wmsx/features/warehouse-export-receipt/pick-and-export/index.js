import React, { useEffect, useMemo } from 'react'

import { Box, Grid } from '@mui/material'
import { FieldArray, Form, Formik } from 'formik'
import { uniq, map } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory, useRouteMatch } from 'react-router-dom'

import { MODAL_MODE, NOTIFICATION_TYPE } from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TextField from '~/components/TextField'
import { ORDER_STATUS_OPTIONS, MOVEMENT_TYPE } from '~/modules/wmsx/constants'
import useWarehouseExportReceipt from '~/modules/wmsx/redux/hooks/useWarehouseExportReceipt'
import useWarehouseImportReceipt from '~/modules/wmsx/redux/hooks/useWarehouseImportReceipt'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertUtcDateToLocalTz, getLocalItem } from '~/utils'
import addNotification from '~/utils/toast'

import ItemSettingTable from './item-setting-table'
import { formSchema } from './schema'

const breadcrumbs = [
  {
    title: 'receiptCommandManagement',
  },
  {
    route: ROUTE.WAREHOUSE_EXPORT_RECEIPT.LIST.PATH,
    title: ROUTE.WAREHOUSE_EXPORT_RECEIPT.LIST.TITLE,
  },
  {
    route: ROUTE.WAREHOUSE_EXPORT_RECEIPT.PICK_AND_EXPORT.PATH,
    title: ROUTE.WAREHOUSE_EXPORT_RECEIPT.PICK_AND_EXPORT.TITLE,
  },
]

function WarehouseExportReceiptPickAndExport() {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const { id } = useParams()
  const routeMatch = useRouteMatch()
  const MODE_MAP = {
    [ROUTE.WAREHOUSE_EXPORT_RECEIPT.DETAIL.PATH]: MODAL_MODE.DETAIL,
  }
  const mode = MODE_MAP[routeMatch.path]

  const {
    data: { isLoading, warehouseExportReceiptDetails },
    actions,
  } = useWarehouseExportReceipt()

  const {
    data: { attributesBusinessTypeDetails },
    actions: useWarehouseImportReceiptAction,
  } = useWarehouseImportReceipt()

  const initialValues = useMemo(
    () => ({
      items: [
        {
          itemCode: '',
          exportedQuantity: '',
          locator: '',
        },
      ],
    }),
    [warehouseExportReceiptDetails],
  )

  useEffect(() => {
    actions.getWarehouseExportReceiptDetailsById(id, (data) => {
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
      useWarehouseImportReceiptAction.getAttribuiteBusinessTypeDetailsById(
        params,
      )
    })
    return () => {
      actions.resetWarehouseExportReceiptState()
    }
  }, [id])

  const backToDetail = () => {
    history.push(ROUTE.WAREHOUSE_EXPORT_RECEIPT.LIST.PATH)
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
      const userInfo = getLocalItem('userInfo')
      const payload = {
        userId: userInfo.id,
        movementType: MOVEMENT_TYPE.SO_EXPORT,
        orderId: Number(id),
        warehouseId: warehouseExportReceiptDetails?.warehouse?.id,
        items: values.items?.map((item) => ({
          id: item?.item?.itemId,
          locatorId: item.locator?.locatorId,
          lotNumber: item.lotNumber?.lotNumber,
          quantity: Number(item.exportedQuantity),
        })),
      }
      actions.exportWarehouse(payload, backToDetail)
    } catch (error) {
      addNotification(error.message, NOTIFICATION_TYPE.ERROR)
    }
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('warehouseExportReceipt.pickAndExport.title')}
      onBack={backToDetail}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item xs={12}>
              <LV
                label={t('warehouseExportReceipt.status')}
                value={
                  <Status
                    options={ORDER_STATUS_OPTIONS}
                    value={warehouseExportReceiptDetails?.status}
                  />
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportReceipt.createdAt')}
                value={convertUtcDateToLocalTz(
                  warehouseExportReceiptDetails?.createdAt,
                )}
              />
            </Grid>
            {/* <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportReceipt.warehouseExportProposalCode')}
                value={warehouseExportReceiptDetails?.code}
              />
            </Grid> */}
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportReceipt.nameOfReceiver')}
                value={warehouseExportReceiptDetails?.receiver}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportReceipt.departmentReception')}
                value={warehouseExportReceiptDetails?.departmentReceipt?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportReceipt.warehouseExport')}
                value={warehouseExportReceiptDetails?.warehouse?.name}
              />
            </Grid>
            {/* <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportReceipt.accountingAccountCode')}
                value={warehouseExportReceiptDetails?.source?.code}
              />
            </Grid> */}
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportReceipt.warehouseExportReason')}
                value={warehouseExportReceiptDetails?.reason?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportReceipt.warehouseExportReceipt')}
                value={`02${
                  warehouseExportReceiptDetails?.warehouse?.code
                    ? `.${warehouseExportReceiptDetails?.warehouse?.code}`
                    : ''
                }${
                  warehouseExportReceiptDetails?.reason?.code
                    ? `.${warehouseExportReceiptDetails?.reason?.code}`
                    : ''
                }`}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportReceipt.number')}
                value={`03${
                  warehouseExportReceiptDetails?.warehouse?.code
                    ? `.${warehouseExportReceiptDetails?.warehouse?.code}`
                    : ''
                }${
                  warehouseExportReceiptDetails?.reason?.code
                    ? `.${warehouseExportReceiptDetails?.reason?.code}`
                    : ''
                }`}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportReceipt.suorceAccountant')}
                value={warehouseExportReceiptDetails.source?.name}
              />
            </Grid>
            {warehouseExportReceiptDetails?.attributes?.map((item) => {
              if (item.tableName) {
                return (
                  <Grid item lg={6} xs={12}>
                    <LV
                      label={`${item.fieldName}`}
                      value={
                        attributesBusinessTypeDetails[item.tableName]?.find(
                          (itemDetail) => itemDetail.id + '' === item.value,
                        )?.name ||
                        attributesBusinessTypeDetails[item.tableName]?.find(
                          (itemDetail) => itemDetail.id + '' === item.value,
                        )?.code
                      }
                    />
                  </Grid>
                )
              } else {
                return (
                  <Grid item lg={6} xs={12}>
                    <LV label={`${item.fieldName}`} value={item.value} />
                  </Grid>
                )
              }
            })}
            <Grid item xs={12}>
              <TextField
                name="explain"
                label={t('warehouseExportReceipt.explain')}
                multiline
                rows={3}
                value={warehouseExportReceiptDetails?.explaination}
                readOnly
                sx={{
                  'label.MuiFormLabel-root': {
                    color: (theme) => theme.palette.subText.main,
                  },
                }}
              />
            </Grid>
          </Grid>
          <Box sx={{ mt: 3 }}>
            <Formik
              initialValues={initialValues}
              validationSchema={formSchema(t)}
              onSubmit={onSubmit}
              enableReinitialize
            >
              {({ handleReset, values, setFieldValue }) => {
                return (
                  <Form>
                    <FieldArray
                      name="items"
                      render={(arrayHelpers) => (
                        <ItemSettingTable
                          items={values?.items || []}
                          itemList={
                            warehouseExportReceiptDetails?.saleOrderExportDetails
                          }
                          lots={
                            warehouseExportReceiptDetails?.saleOrderExportWarehouseLots ||
                            []
                          }
                          arrayHelpers={arrayHelpers}
                          setFieldValue={setFieldValue}
                          mode={mode}
                        />
                      )}
                    />
                    {renderActionBar(handleReset)}
                  </Form>
                )
              }}
            </Formik>
          </Box>
        </Grid>
      </Grid>
    </Page>
  )
}

export default WarehouseExportReceiptPickAndExport
