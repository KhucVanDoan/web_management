import React, { useEffect } from 'react'

import { Box, Grid } from '@mui/material'
import { uniq, map } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory, useRouteMatch } from 'react-router-dom'

import { MODAL_MODE, NOTIFICATION_TYPE } from '~/common/constants'
import { FUNCTION_CODE } from '~/common/constants/functionCode'
import ActionBar from '~/components/ActionBar'
import Button from '~/components/Button'
import Guard from '~/components/Guard'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TextField from '~/components/TextField'
import { ORDER_STATUS } from '~/modules/mesx/constants'
import { ORDER_STATUS_OPTIONS } from '~/modules/wmsx/constants'
import useWarehouseExportReceipt from '~/modules/wmsx/redux/hooks/useWarehouseExportReceipt'
import useWarehouseImportReceipt from '~/modules/wmsx/redux/hooks/useWarehouseImportReceipt'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { api } from '~/services/api'
import { convertUtcDateToLocalTz } from '~/utils'
import { getFileNameFromHeader } from '~/utils/api'
import addNotification from '~/utils/toast'

import ItemSettingTableDetail from './item-setting-table'

const breadcrumbs = [
  {
    title: 'receiptCommandManagement',
  },
  {
    route: ROUTE.WAREHOUSE_EXPORT_RECEIPT.LIST.PATH,
    title: ROUTE.WAREHOUSE_EXPORT_RECEIPT.LIST.TITLE,
  },
  {
    route: ROUTE.WAREHOUSE_EXPORT_RECEIPT.DETAIL.PATH,
    title: ROUTE.WAREHOUSE_EXPORT_RECEIPT.DETAIL.TITLE,
  },
]

function WarehouseExportReceiptDetail() {
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
  const dowFile = async (params) => {
    const uri = `/v1/sales/sale-order-exports/export-delivery-ticket/${params}`
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
      const filename = getFileNameFromHeader(res)
      const blob = new Blob([res?.data])
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      const nameFile = decodeURI(filename)
      link.setAttribute('download', nameFile)
      document.body.appendChild(link)
      link.click()
      URL.revokeObjectURL(url)
    }
  }
  useEffect(() => {
    actions.getWarehouseExportReceiptDetailsById(id, (data) => {
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
      actions.resetWarehouseExportReceiptState()
    }
  }, [id])

  const backToList = () => {
    history.push(ROUTE.WAREHOUSE_EXPORT_RECEIPT.LIST.PATH)
  }

  const renderHeaderRight = () => {
    return (
      <>
        {warehouseExportReceiptDetails?.status === ORDER_STATUS.CONFIRMED && (
          <Guard code={FUNCTION_CODE.SALE_COLLECT_SALE_ORDER_EXPORT}>
            <Button
              onClick={() =>
                history.push(
                  ROUTE.WAREHOUSE_EXPORT_RECEIPT.PICK_AND_EXPORT.PATH.replace(
                    ':id',
                    `${id}`,
                  ),
                )
              }
              sx={{ ml: 4 / 3 }}
              icon="add"
            >
              {t('warehouseExportReceipt.pickAndExport.title')}
            </Button>
          </Guard>
        )}
      </>
    )
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.warehouseExportReceiptDetail')}
      onBack={backToList}
      loading={isLoading}
      renderHeaderRight={renderHeaderRight}
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
                label={t('warehouseExportReceipt.receiptId')}
                value={warehouseExportReceiptDetails?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportReceipt.createdAt')}
                value={convertUtcDateToLocalTz(
                  warehouseExportReceiptDetails?.receiptDate,
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
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportReceipt.typeBusiness')}
                value={warehouseExportReceiptDetails.businessType?.name}
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
                    <LV label={`${item.fieldName}`} value={item?.values} />
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
            <ItemSettingTableDetail
              items={warehouseExportReceiptDetails?.itemsSync || []}
              mode={mode}
            />
          </Box>
          <ActionBar
            onBack={backToList}
            elBefore={
              <Button
                sx={{ mr: 'auto' }}
                color="grayF4"
                onClick={() => dowFile(id)}
              >
                {t(`warehouseExportReceipt.dowload`)}
              </Button>
            }
          />
        </Grid>
      </Grid>
    </Page>
  )
}

export default WarehouseExportReceiptDetail
