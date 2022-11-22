import React, { useEffect } from 'react'

import { Box, Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import useReceiptManagement from '~/modules/wmsx/redux/hooks/useReceiptManagement'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertUtcDateTimeToLocalTz } from '~/utils'

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

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('receiptManagement.formTitle')}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            {/* <Grid item xs={12}>
              <LV
                label={t('receiptManagement.movementStatus')}
                value={
                  <Status
                    options={ORDER_STATUS_OPTIONS}
                    value={Number(movementDetail?.status)}
                  />
                }
              />
            </Grid> */}
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
                label={t('receiptManagement.deliver')}
                value={receiptDetail?.deliver}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('receiptManagement.receiptDate')}
                value={convertUtcDateTimeToLocalTz(receiptDetail?.receiptDate)}
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
            <Grid item lg={6} xs={12}>
              <LV
                label={t('receiptManagement.description')}
                value={receiptDetail?.description}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Box sx={{ mt: 3 }}>
        <ItemsSettingTable items={[]} />
      </Box>
      <ActionBar onBack={backToList} />
    </Page>
  )
}

export default ReceiptManagementDetail
