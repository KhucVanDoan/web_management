import React, { useEffect } from 'react'

import { Box, Grid, Paper, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  PRIORITY_LEVEL_OPTIONS,
  WARNING_PRIORITY_LEVEL,
  WARNING_STATUS_LIST,
  WARNING_TYPE,
} from '~/modules/mmsx/constants'
import Activities from '~/modules/mmsx/partials/Activities'
import useWarningSystem from '~/modules/mmsx/redux/hooks/useWarningSystem'
import { ROUTE } from '~/modules/mmsx/routes/config'
import { convertUtcDateToLocalTz } from '~/utils'

const breadcrumbs = [
  {
    title: 'maintenance',
  },
  {
    route: ROUTE.WARNING_SYSTEM.LIST.PATH,
    title: ROUTE.WARNING_SYSTEM.LIST.TITLE,
  },
  {
    route: ROUTE.WARNING_SYSTEM.DETAIL.ERROR.PATH,
    title: ROUTE.WARNING_SYSTEM.DETAIL.ERROR.TITLE,
  },
]

const WarningListErrorForm = () => {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const { id } = useParams()
  const {
    data: { warningDetail, isLoading },
    actions,
  } = useWarningSystem()
  useEffect(() => {
    actions.getWarningDetail(id)
  }, [id])
  const backToList = () => {
    history.push(ROUTE.WARNING_SYSTEM.LIST.PATH)
  }
  // const renderHeaderRight = () => {
  //   return (
  //     <>
  //       <Box>
  //         <Button variant="outlined" sx={{ ml: 4 / 3 }}>
  //           {t('deviceCategory.button.device')}
  //         </Button>
  //         <Button variant="outlined" sx={{ ml: 4 / 3 }}>
  //           {t('deviceCategory.button.job')}
  //         </Button>
  //       </Box>
  //     </>
  //   )
  // }

  const warningType = WARNING_TYPE.filter(
    (warning) => warning.value === warningDetail.type,
  )
  const getPriorty = (priorityLevel, options = PRIORITY_LEVEL_OPTIONS) => {
    if (!priorityLevel) {
      return null
    }
    return options.find((priority) => priority.value === priorityLevel)
  }
  const priorityLevel = getPriorty(
    warningDetail?.priority,
    WARNING_PRIORITY_LEVEL,
  )

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('warningList.headerTitle.scheduled')}
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
                  label={t('errorWarning.form.status')}
                  value={
                    <Status
                      options={WARNING_STATUS_LIST}
                      value={warningDetail?.status}
                    />
                  }
                />
              </Grid>

              <Grid item lg={6} xs={12}>
                <LV
                  label={t('warningList.formError.code')}
                  value={warningDetail?.code}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('warningList.formError.type')}
                  value={t(`${warningType?.text ?? WARNING_TYPE[1].text}`)}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('warningList.formError.name')}
                  value={warningDetail?.name}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('warningList.formError.priority')}
                  value={priorityLevel?.title ? t(priorityLevel?.title) : ''}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('warningList.formError.description')}
                  value={warningDetail?.description}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('warningList.formError.serial')}
                  value={warningDetail?.deviceAssignment?.serial}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('warningList.formError.estimatedDate')}
                  value={convertUtcDateToLocalTz(
                    warningDetail?.completeExpectedDate,
                  )}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('warningList.formError.deviceName')}
                  value={warningDetail?.deviceAssignment?.device?.name}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('warningList.formError.estimatedDuration')}
                  value={
                    warningDetail?.expectedMaintenanceTime
                      ? `${Math.round(
                          warningDetail?.expectedMaintenanceTime,
                        )} phút`
                      : ''
                  }
                />
              </Grid>
            </Grid>
            <Grid
              container
              sx={(theme) => ({
                justifyContent: 'center',
                bgcolor: 'grayF4.main',
                borderRadius: 1,
                my: 2,
                pt: 1,
                pb: 2,
                [theme.breakpoints.down('xl')]: {
                  px: 2,
                },
                mt: 3,
              })}
            >
              <Grid item xl={11} xs={12}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2,
                  }}
                >
                  <Typography variant="h4">
                    {t('warningList.smallTitle')}
                  </Typography>
                </Box>
                <Grid
                  container
                  rowSpacing={4 / 3}
                  columnSpacing={{ xl: 8, xs: 4 }}
                >
                  <Grid item lg={6} xs={12}>
                    <LV
                      label={t('warningList.information.factory')}
                      value={warningDetail?.factory?.name}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <LV
                      label={t('warningList.information.workshop')}
                      value={warningDetail?.workCenter?.name}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <LV
                      label={t('warningList.information.usageUser')}
                      value={warningDetail?.user?.fullName}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <LV
                      label={t('warningList.information.address')}
                      value={warningDetail?.factory?.location}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <LV
                      label={t('warningList.information.phone')}
                      value={warningDetail?.user?.phone}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Box sx={{ mt: 3 }}>
              <Grid item xs={12}>
                <LV
                  label={t('warningList.form.responsibleUser')}
                  value={warningDetail?.user?.fullName}
                />
              </Grid>
            </Box>

            <ActionBar onBack={backToList} />
          </Grid>
        </Grid>
      </Paper>
      <Activities data={warningDetail?.histories} />
    </Page>
  )
}

export default WarningListErrorForm
