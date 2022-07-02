import React, { useEffect } from 'react'

import { Box, Button, Grid, Paper, Typography } from '@mui/material'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  CHECKLIST_CONCLUDE,
  CHECKLIST_RESULT,
  WARNING_STATUS_LIST,
} from '~/modules/mmsx/constants'
import Activities from '~/modules/mmsx/partials/Activities'
import useWarningSystem from '~/modules/mmsx/redux/hooks/useWarningSystem'
import { ROUTE } from '~/modules/mmsx/routes/config'
import { convertUtcDateToLocalTz } from '~/utils'

import ItemSettingTable from '../item-setting-table'

const breadcrumbs = [
  {
    title: 'maintenance',
  },
  {
    route: ROUTE.WARNING_SYSTEM.LIST.PATH,
    title: ROUTE.WARNING_SYSTEM.LIST.TITLE,
  },
  {
    route: ROUTE.WARNING_SYSTEM.DETAIL.CHECKLIST.PATH,
    title: ROUTE.WARNING_SYSTEM.DETAIL.CHECKLIST.TITLE,
  },
]

const WarningChecklistDetail = () => {
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
  const histories = warningDetail?.histories?.map((item) => ({
    content: item?.content,
    createdAt: item?.createdAt,
    id: item?.userId,
    username: item?.username,
  }))
  const checklistResult = CHECKLIST_RESULT.find(
    (clc) => clc.value === warningDetail?.job?.checklistResult,
  )
  const checklistConclude = CHECKLIST_CONCLUDE.find(
    (clc) => clc.value === warningDetail?.job?.checklistConclude,
  )
  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('warningList.headerTitle.checklist')}
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
                  label={t('warningList.formChecklist.code')}
                  value={warningDetail?.code}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('warningList.formChecklist.description')}
                  value={warningDetail?.description}
                />
              </Grid>

              <Grid item lg={6} xs={12}>
                <LV
                  label={t('warningList.formChecklist.name')}
                  value={warningDetail?.name}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('warningList.formChecklist.checkDate')}
                  value={convertUtcDateToLocalTz(warningDetail?.scheduleDate)}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('warningList.formChecklist.deviceName')}
                  value={warningDetail?.deviceAssignment?.device?.name}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('warningList.formChecklist.realtimeCheck')}
                  value={convertUtcDateToLocalTz(
                    warningDetail?.job?.executionDateFrom,
                  )}
                />
              </Grid>

              <Grid item lg={6} xs={12}>
                <LV
                  label={t('warningList.formChecklist.serial')}
                  value={warningDetail?.deviceAssignment?.serial}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('warningList.formChecklist.completeDay')}
                  value={convertUtcDateToLocalTz(
                    warningDetail?.job?.executionDateTo,
                  )}
                />
              </Grid>

              <Grid item lg={6} xs={12}>
                <LV
                  label={t('warningList.formChecklist.deviceId')}
                  value={warningDetail?.deviceAssignment?.device?.code}
                />
              </Grid>
            </Grid>
            {!isEmpty(warningDetail?.details) && (
              <>
                <Box sx={{ mt: 3 }}>
                  <ItemSettingTable items={warningDetail.details} />
                </Box>
                <Grid
                  container
                  rowSpacing={4 / 3}
                  columnSpacing={{ xl: 8, xs: 4 }}
                  sx={{ mt: 1 }}
                >
                  <Grid item xs={12}>
                    <LV
                      label={t('jobList.checklistDetail.checklistResult.title')}
                      value={
                        checklistResult
                          ? t(
                              `jobList.checklistDetail.checklistResult.${checklistResult?.title}`,
                            )
                          : null
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <LV
                      label={t(
                        'jobList.checklistDetail.checklistConclude.title',
                      )}
                      value={
                        checklistConclude
                          ? t(
                              `jobList.checklistDetail.checklistConclude.${checklistConclude?.title}`,
                            )
                          : ''
                      }
                    />
                  </Grid>
                </Grid>
              </>
            )}
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
      <Activities data={histories} />
    </Page>
  )
}

export default WarningChecklistDetail
