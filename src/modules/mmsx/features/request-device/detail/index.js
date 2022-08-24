import React, { useEffect } from 'react'

import { Checkbox, FormControlLabel, Grid, Paper } from '@mui/material'
import { Box } from '@mui/system'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TextField from '~/components/TextField'
import {
  ACTION_MAP,
  DEVICE_REQUEST_TICKET_STATUS_OPTION,
} from '~/modules/mmsx/constants'
import Activities from '~/modules/mmsx/partials/Activities'
import useRequestDevice from '~/modules/mmsx/redux/hooks/useRequestDevice'
import { ROUTE } from '~/modules/mmsx/routes/config'
const breadcrumbs = [
  {
    title: ROUTE.DEVICE_MANAGEMENT.TITLE,
  },
  {
    route: ROUTE.REQUEST_DEVICE.LIST.PATH,
    title: ROUTE.REQUEST_DEVICE.LIST.TITLE,
  },
  {
    route: ROUTE.REQUEST_DEVICE.DETAIL.PATH,
    title: ROUTE.REQUEST_DEVICE.DETAIL.TITLE,
  },
]

const RequestDeviceDetail = () => {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const { id } = useParams()
  const {
    data: { requestDeviceDetail, isLoading },
    actions,
  } = useRequestDevice()
  useEffect(() => {
    actions.getRequestDeviceDetail(id)
    return () => {
      actions.resetStateRequestDevice()
    }
  }, [id])
  const backToList = () => {
    history.push(ROUTE.REQUEST_DEVICE.LIST.PATH)
  }
  // const renderHeaderRight = () => {
  //   return (
  //     <>
  //       <Box>
  //         <Button
  //           variant="outlined"
  //           sx={{ ml: 4 / 3 }}
  //           onClick={() => history.push(ROUTE.DEVICE_LIST.LIST.PATH)}
  //         >
  //           {t('requestDevice.buttonTitle.device')}
  //         </Button>
  //         <Button
  //           variant="outlined"
  //           sx={{ ml: 4 / 3 }}
  //           onClick={() => history.push(ROUTE.DEVICE_ASSIGN.LIST.PATH)}
  //         >
  //           {t('requestDevice.buttonTitle.assignment')}
  //         </Button>
  //       </Box>
  //     </>
  //   )
  // }
  const histories = requestDeviceDetail?.histories?.map((item) => ({
    content: ACTION_MAP[item?.action]
      ? t(`requestDevice.comment.${ACTION_MAP[item?.action]}`)
      : '',
    createdAt: item?.createdAt,
    username: item?.username,
  }))

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('requestDevice.form.viewDetailRequestDevice')}
      onBack={backToList}
      loading={isLoading}
      // renderHeaderRight={renderHeaderRight}
      freeSolo
    >
      <Paper sx={{ p: 2 }}>
        <Grid container justifyContent="center">
          <Grid item xl={11} xs={12}>
            <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
              <Grid item xs={12}>
                <LV
                  label={t('requestDevice.category.status')}
                  value={
                    <Status
                      options={DEVICE_REQUEST_TICKET_STATUS_OPTION}
                      value={requestDeviceDetail?.status}
                    />
                  }
                />
              </Grid>

              <Grid item lg={6} xs={12}>
                <LV
                  label={t('requestDevice.form.field.code')}
                  value={requestDeviceDetail?.code}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('requestDevice.form.field.deviceCode')}
                  value={requestDeviceDetail?.device?.code}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('requestDevice.form.field.name')}
                  value={requestDeviceDetail?.name}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('requestDevice.form.field.deviceName')}
                  value={requestDeviceDetail?.device?.name}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('requestDevice.form.field.personUsing')}
                  value={requestDeviceDetail?.user?.username}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('requestDevice.form.field.count')}
                  value={requestDeviceDetail?.quantity}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <Box display="flex">
                  <FormControlLabel
                    control={<Checkbox sx={{ my: '-9px' }} />}
                    label={t('requestDevice.form.field.useInProduction')}
                    checked={Boolean(requestDeviceDetail?.device?.type === 1)}
                    disabled
                    sx={{ pointerEvents: 'none' }}
                  />
                </Box>
              </Grid>
              {requestDeviceDetail?.workCenter && (
                <Grid item lg={6} xs={12}>
                  <LV
                    label={t('requestDevice.form.field.factoryUsing')}
                    value={requestDeviceDetail?.workCenter?.name}
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <TextField
                  name="description"
                  label={t('requestDevice.form.field.description')}
                  multiline
                  rows={3}
                  value={requestDeviceDetail?.description}
                  readOnly
                  sx={{
                    'label.MuiFormLabel-root': {
                      color: (theme) => theme.palette.subText.main,
                    },
                  }}
                />
              </Grid>
            </Grid>
            <ActionBar onBack={backToList} />
          </Grid>
        </Grid>
      </Paper>
      <Activities data={histories} />
    </Page>
  )
}

export default RequestDeviceDetail
