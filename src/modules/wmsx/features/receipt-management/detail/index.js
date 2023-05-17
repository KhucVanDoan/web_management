import React, { useEffect, useMemo } from 'react'

import { Box, Grid } from '@mui/material'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { FUNCTION_CODE } from '~/common/constants/functionCode'
import ActionBar from '~/components/ActionBar'
import Button from '~/components/Button'
import Guard from '~/components/Guard'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TextField from '~/components/TextField'
import {
  RECEIPT_MANAGEMENT_STATUS,
  RECEIPT_MANAGEMENT_STATUS_OPTIONS,
  STATUS_SYNC_ORDER_TO_EBS,
} from '~/modules/wmsx/constants'
import useReceiptManagement from '~/modules/wmsx/redux/hooks/useReceiptManagement'
import { checkAdjustDeliverApi } from '~/modules/wmsx/redux/sagas/receipt-management/adjust-deliver'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertUtcDateToLocalTz } from '~/utils'
import addNotification from '~/utils/toast'

import ItemsSettingTable from './items-setting-table'

const breadcrumbs = [
  {
    route: ROUTE.RECEIPT_MANAGEMENT.LIST.PATH,
    title: ROUTE.RECEIPT_MANAGEMENT.LIST.TITLE,
  },
  {
    route: ROUTE.RECEIPT_MANAGEMENT.DETAIL.PATH,
    title: ROUTE.RECEIPT_MANAGEMENT.DETAIL.TITLE,
  },
]

const ReceiptManagementDetail = () => {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const { id } = useParams()
  const {
    data: { isLoading, receiptDetail },
    actions,
  } = useReceiptManagement()

  useEffect(() => {
    actions.getReceiptDetailsById(id)
    return () => {
      actions.resetReceiptDetailsState()
    }
  }, [id])
  const backToList = () => {
    history.push(ROUTE.RECEIPT_MANAGEMENT.LIST.PATH)
  }
  const handleClickAdjustDeliver = async () => {
    const response = await checkAdjustDeliverApi(id)
    if (response?.statusCode === 200) {
      if (!isEmpty(response?.data)) {
        addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      } else {
        history.push(
          ROUTE.RECEIPT_MANAGEMENT.ADJUST_DELIVERY.PATH.replace(':id', `${id}`),
        )
      }
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
    }
  }
  const renderHeaderRight = () =>
    useMemo(() => {
      return (
        <>
          {receiptDetail?.syncStatus !==
            STATUS_SYNC_ORDER_TO_EBS.SYNC_WSO2_ERROR &&
            (receiptDetail?.status ===
              RECEIPT_MANAGEMENT_STATUS.NOT_YET_STOCKED ||
              receiptDetail?.status ===
                RECEIPT_MANAGEMENT_STATUS.IN_PROGRESS) && (
              <Guard code={FUNCTION_CODE.SALE_DELIVERY_RETURN_RECEIPT}>
                <Button
                  sx={{
                    ml: 4 / 3,
                  }}
                  onClick={() => handleClickAdjustDeliver()}
                >
                  {t('receiptManagement.adjustDelivery')}
                </Button>
              </Guard>
            )}
          {receiptDetail?.syncStatus ===
            STATUS_SYNC_ORDER_TO_EBS.SYNC_WSO2_ERROR && (
            <Guard code={FUNCTION_CODE.SALE_SYNC_DELIVERY_RETURN_RECEIPT_EBS}>
              <Button
                sx={{
                  ml: 4 / 3,
                }}
                onClick={() =>
                  actions.receiptEBSById(id, () => {
                    actions.getReceiptDetailsById(id)
                  })
                }
              >
                {t('receiptManagement.syncAdjustDelivery')}
              </Button>
            </Guard>
          )}
        </>
      )
    }, [receiptDetail])
  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('receiptManagement.formTitle')}
      onBack={backToList}
      loading={isLoading}
      renderHeaderRight={renderHeaderRight}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item xs={12}>
              <LV
                label={t('general.status')}
                value={
                  <Status
                    options={RECEIPT_MANAGEMENT_STATUS_OPTIONS}
                    value={Number(receiptDetail?.status)}
                  />
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('receiptManagement.receiptNo')}
                value={receiptDetail?.receiptNumber}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('receiptManagement.code')}
                value={receiptDetail?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('receiptManagement.receiptDate')}
                value={convertUtcDateToLocalTz(receiptDetail?.receiptDate)}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('receiptManagement.deliver')}
                value={receiptDetail?.deliver}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('receiptManagement.warehouseCode')}
                value={receiptDetail?.warehouse?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('receiptManagement.department')}
                value={receiptDetail?.department}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('receiptManagement.contractNo')}
                value={receiptDetail?.contractNumber}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('receiptManagement.purpose')}
                value={receiptDetail?.purpose}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('materialManagement.description')}
                multiline
                rows={3}
                value={receiptDetail?.explaination}
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
        <ItemsSettingTable items={receiptDetail?.items || []} />
      </Box>
      <ActionBar onBack={backToList} />
    </Page>
  )
}

export default ReceiptManagementDetail
