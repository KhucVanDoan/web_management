import React, { useEffect } from 'react'

import { Grid, Paper } from '@mui/material'
import { Box } from '@mui/system'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import Button from '~/components/Button'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TextField from '~/components/TextField'
import {
  ACTION_MAP,
  SUPPLY_REQUEST_STATUS,
  SUPPLIES_ACCESSORY_OPTION_MAP,
} from '~/modules/mmsx/constants'
import Activities from '~/modules/mmsx/partials/Activities'
import useSuppliesRequest from '~/modules/mmsx/redux/hooks/useSuppliesRequest'
import { ROUTE } from '~/modules/mmsx/routes/config'
import { convertUtcDateToLocalTz } from '~/utils'

import ItemSettingDetail from './item-detail'
const breadcrumbs = [
  {
    title: 'deviceSerialManagement',
  },
  {
    route: ROUTE.SUPPLIES_REQUEST.LIST.PATH,
    title: ROUTE.SUPPLIES_REQUEST.LIST.TITLE,
  },
  {
    route: ROUTE.SUPPLIES_REQUEST.DETAIL.PATH,
    title: ROUTE.SUPPLIES_REQUEST.DETAIL.TITLE,
  },
]

const SuppliesRequestDetail = () => {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const { id } = useParams()
  const {
    data: { suppliesRequestDetail, isLoading },
    actions,
  } = useSuppliesRequest()
  useEffect(() => {
    actions.getSuppliesRequestDetail(id)
    return () => {
      actions.resetStateSuppliesRequest()
    }
  }, [id])
  const backToList = () => {
    history.push(ROUTE.SUPPLIES_REQUEST.LIST.PATH)
  }
  const renderHeaderRight = () => {
    return (
      <>
        <Box>
          <Button variant="outlined" sx={{ ml: 4 / 3 }}>
            {t('deviceCategory.button.device')}
          </Button>
          <Button variant="outlined" sx={{ ml: 4 / 3 }}>
            {t('deviceCategory.button.job')}
          </Button>
        </Box>
      </>
    )
  }
  const histories = suppliesRequestDetail?.histories?.map((item) => ({
    content: ACTION_MAP[item?.action]
      ? t(`deviceCategory.actionHistory.${ACTION_MAP[item?.action]}`)
      : '',
    createdAt: item?.createdAt,
    id: item?.userId,
    username: item?.username,
  }))
  const items = suppliesRequestDetail?.supplies?.map((item) => ({
    id: item?.id,
    materialCode: item?.code,
    materialName: item?.name,
    materialType: t(`${SUPPLIES_ACCESSORY_OPTION_MAP[item?.type]}`),
    materialUnit: item?.unit,
    materialPrice: item?.price,
    requireAmount: item?.quantity,
    stockQuantity: item?.stockQuantity,
    planQuantity: item?.planQuantity,
    buyQuantity: item?.buyQuantity,
  }))
  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.suppliesRequestDetail')}
      onBack={backToList}
      loading={isLoading}
      renderHeaderRight={renderHeaderRight}
      freeSolo
    >
      <Paper sx={{ p: 2 }}>
        <Grid container justifyContent="center">
          <Grid item xl={11} xs={12}>
            <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
              <Grid item xs={12}>
                <LV
                  label={t('suppliesCategory.form.status')}
                  value={
                    <Status
                      options={SUPPLY_REQUEST_STATUS}
                      value={suppliesRequestDetail?.status}
                    />
                  }
                />
              </Grid>

              <Grid item lg={6} xs={12}>
                <LV
                  label={t('suppliesRequest.form.field.code')}
                  value={suppliesRequestDetail?.code}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('suppliesRequest.form.field.name')}
                  value={suppliesRequestDetail?.name}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('suppliesRequest.form.field.jobCode')}
                  value={suppliesRequestDetail?.jobCode}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('suppliesRequest.form.field.jobName')}
                  value={suppliesRequestDetail?.jobName}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('suppliesRequest.form.field.requestedBy')}
                  value={suppliesRequestDetail?.requestedBy}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('suppliesRequest.form.field.serial')}
                  value={suppliesRequestDetail?.serial}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('suppliesRequest.form.field.team')}
                  value={suppliesRequestDetail?.team}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('suppliesRequest.form.field.deviceName')}
                  value={suppliesRequestDetail?.deviceName}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('suppliesRequest.form.field.receiveExpectedDate')}
                  value={convertUtcDateToLocalTz(
                    suppliesRequestDetail?.receiveExpectedDate,
                  )}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('suppliesRequest.form.field.factory')}
                  value={suppliesRequestDetail?.factory}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('suppliesRequest.form.field.workCenter')}
                  value={suppliesRequestDetail?.workCenter}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="description"
                  label={t('suppliesRequest.form.field.description')}
                  multiline
                  rows={3}
                  value={suppliesRequestDetail?.description}
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
          <ItemSettingDetail items={items || []} />
        </Box>
        <ActionBar onBack={backToList} />
      </Paper>
      <Activities data={histories} />
    </Page>
  )
}

export default SuppliesRequestDetail
