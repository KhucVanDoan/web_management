import React, { useEffect } from 'react'

import { Box, Grid } from '@mui/material'
import { uniq, map } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory, useRouteMatch } from 'react-router-dom'

import { MODAL_MODE, NOTIFICATION_TYPE } from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import Button from '~/components/Button'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TextField from '~/components/TextField'
import {
  ORDER_STATUS,
  ORDER_STATUS_OPTIONS,
  TABLE_NAME_ENUM,
} from '~/modules/wmsx/constants'
import useWarehouseImportReceipt from '~/modules/wmsx/redux/hooks/useWarehouseImportReceipt'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { api } from '~/services/api'
import { convertUtcDateToLocalTz } from '~/utils'
import { getFileNameFromHeader } from '~/utils/api'
import addNotification from '~/utils/toast'

import ItemsSettingTable from '../form/items-setting-table'

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
]

function WarehouseImportReceiptDetail() {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const { id } = useParams()
  const routeMatch = useRouteMatch()
  const {
    data: {
      warehouseImportReceiptDetails,
      isLoading,
      attributesBusinessTypeDetails,
    },
    actions,
  } = useWarehouseImportReceipt()

  const dowFile = async (params) => {
    const warehouseImportId = JSON.stringify(params)
    const uri = `/v1/sales/export/purchased-order-import?queryIds=${warehouseImportId}&type=3`
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
  const MODE_MAP = {
    [ROUTE.WAREHOUSE_IMPORT_RECEIPT.DETAIL.PATH]: MODAL_MODE.DETAIL,
  }
  const mode = MODE_MAP[routeMatch.path]

  useEffect(() => {
    actions.getWarehouseImportReceiptDetailsById(id, (data) => {
      const attributes = data?.attributes?.filter((e) => e?.value !== null)
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

  const backToList = () => {
    history.push(ROUTE.WAREHOUSE_IMPORT_RECEIPT.LIST.PATH)
  }

  const renderHeaderRight = () => {
    return (
      <>
        {warehouseImportReceiptDetails?.status === ORDER_STATUS.CONFIRMED && (
          <Button
            onClick={() =>
              history.push(
                ROUTE.WAREHOUSE_IMPORT_RECEIPT.RECEIVE_AND_STORAGE.PATH.replace(
                  ':id',
                  `${id}`,
                ),
              )
            }
            sx={{ ml: 4 / 3 }}
            icon="add"
          >
            {t('warehouseImportReceipt.receiveAndStorageBtn')}
          </Button>
        )}
      </>
    )
  }
  const receiptRequired = warehouseImportReceiptDetails?.attributes?.find(
    (item) => item?.tableName === TABLE_NAME_ENUM.RECEIPT,
  )
  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.warehouseImportReceiptDetail')}
      onBack={backToList}
      renderHeaderRight={renderHeaderRight}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
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
            <Grid item xs={12}>
              <LV
                label={t('warehouseImportReceipt.id')}
                value={warehouseImportReceiptDetails.code}
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
                value={warehouseImportReceiptDetails.code}
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
                value={warehouseImportReceiptDetails?.departmentReceipt?.code}
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
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="explain"
              label={t('warehouseExportReceipt.explain')}
              multiline
              rows={3}
              value={warehouseImportReceiptDetails?.explaination}
              readOnly
              sx={{
                'label.MuiFormLabel-root': {
                  color: (theme) => theme.palette.subText.main,
                },
              }}
            />
          </Grid>
          <Box sx={{ mt: 3 }}>
            <ItemsSettingTable
              items={
                warehouseImportReceiptDetails?.purchasedOrderImportDetails || []
              }
              mode={mode}
            />
          </Box>
          <ActionBar
            onBack={backToList}
            elBefore={
              <Button
                sx={{ mr: 'auto' }}
                color="grayF4"
                onClick={() => dowFile([{ id: id }])}
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

export default WarehouseImportReceiptDetail
