import React, { useEffect } from 'react'

import { Grid, Paper } from '@mui/material'
import { Box } from '@mui/system'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

import { MODAL_MODE } from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import Button from '~/components/Button'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TextField from '~/components/TextField'
import {
  ACTION_MAP,
  DEVICE_RETURN_TICKET_STATUS_OPTION,
} from '~/modules/mmsx/constants'
import Activities from '~/modules/mmsx/partials/Activities'
import useRequestDevice from '~/modules/mmsx/redux/hooks/useRequestDevice'
import { ROUTE } from '~/modules/mmsx/routes/config'

import ItemsSettingTable from '../return-form/items-setting-table'

const breadcrumbs = [
  {
    title: ROUTE.DEVICE_MANAGEMENT.TITLE,
  },
  {
    route: ROUTE.REQUEST_DEVICE.LIST.PATH,
    title: ROUTE.REQUEST_DEVICE.LIST.TITLE,
  },
  {
    route: ROUTE.REQUEST_DEVICE.RETURN_DETAIL.PATH,
    title: ROUTE.REQUEST_DEVICE.RETURN_DETAIL.TITLE,
  },
]

const ReturnDeviceDetail = () => {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const { id } = useParams()
  const {
    data: { returnDeviceDetail, isLoading },
    actions,
  } = useRequestDevice()
  useEffect(() => {
    actions.getReturnDeviceDetail(id)
    return () => {
      actions.resetStateReturnRequestDevice()
    }
  }, [id])
  const backToList = () => {
    history.push(ROUTE.REQUEST_DEVICE.LIST.PATH)
  }
  const renderHeaderRight = () => {
    return (
      <>
        <Box>
          <Button
            variant="outlined"
            sx={{ ml: 4 / 3 }}
            onClick={() => history.push(ROUTE.DEVICE_LIST.LIST.PATH)}
          >
            {t('requestDevice.buttonTitle.device')}
          </Button>
          <Button
            variant="outlined"
            sx={{ ml: 4 / 3 }}
            onClick={() => history.push(ROUTE.DEVICE_ASSIGN.LIST.PATH)}
          >
            {t('requestDevice.buttonTitle.assignment')}
          </Button>
        </Box>
      </>
    )
  }
  const histories = returnDeviceDetail?.histories?.map((item) => ({
    content: ACTION_MAP[item?.action]
      ? t(`requestDevice.comment.${ACTION_MAP[item?.action]}`)
      : '',
    createdAt: item?.createdAt,
    username: item?.username,
  }))

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('requestDevice.form.viewDetailReturnDevice')}
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
                  label={t('requestDevice.category.status')}
                  value={
                    <Status
                      options={DEVICE_RETURN_TICKET_STATUS_OPTION}
                      value={returnDeviceDetail?.status}
                    />
                  }
                />
              </Grid>

              <Grid item lg={6} xs={12}>
                <LV
                  label={t('requestDevice.form.field.code')}
                  value={returnDeviceDetail?.code}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('requestDevice.form.field.name')}
                  value={returnDeviceDetail?.name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="description"
                  label={t('deviceCategory.form.field.description')}
                  multiline
                  rows={3}
                  value={returnDeviceDetail?.description}
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
              <ItemsSettingTable
                items={returnDeviceDetail?.deviceAssignments || []}
                mode={MODAL_MODE.DETAIL}
              />
            </Box>
            <ActionBar onBack={backToList} />
          </Grid>
        </Grid>
      </Paper>
      <Activities data={histories} />
    </Page>
  )
}

export default ReturnDeviceDetail
