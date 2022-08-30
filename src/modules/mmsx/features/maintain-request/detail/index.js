import React, { useEffect } from 'react'

import { Grid, Paper, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  MAINTAIN_STATUS_OPTIONS,
  PRIORITY_LEVEL_MAP,
} from '~/modules/mmsx/constants'
import Activities from '~/modules/mmsx/partials/Activities'
import useMaintainRequest from '~/modules/mmsx/redux/hooks/useMaintainRequest'
import { ROUTE } from '~/modules/mmsx/routes/config'
import { convertUtcDateToLocalTz } from '~/utils'

const breadcrumbs = [
  {
    title: 'maintenance',
  },
  {
    route: ROUTE.MAINTAIN_REQUEST.LIST.PATH,
    title: ROUTE.MAINTAIN_REQUEST.LIST.TITLE,
  },
  {
    route: ROUTE.MAINTAIN_REQUEST.DETAIL.PATH,
    title: ROUTE.MAINTAIN_REQUEST.DETAIL.TITLE,
  },
]

const MaintainRequestDetail = () => {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const { id } = useParams()

  const {
    data: { maintainRequestDetail, isLoading },
    actions,
  } = useMaintainRequest()

  useEffect(() => {
    actions.getMaintainRequestDetail(id)
    return () => {
      actions.rejectMaintainRequest()
    }
  }, [id])

  const backToList = () => {
    history.push(ROUTE.MAINTAIN_REQUEST.LIST.PATH)
  }

  const renderHeaderRight = () => {
    // return (
    //   <>
    //     <Box>
    //       <Button variant="outlined" sx={{ ml: 4 / 3 }}>
    //         {t('maintainRequest.deviceButton')}
    //       </Button>
    //       <Button variant="outlined" sx={{ ml: 4 / 3 }}>
    //         {t('maintainRequest.partsButton')}
    //       </Button>
    //     </Box>
    //   </>
    // )
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.maintainRequestDetail')}
      onBack={backToList}
      renderHeaderRight={renderHeaderRight}
      loading={isLoading}
      freeSolo
    >
      <Paper sx={{ p: 2 }}>
        <Grid container justifyContent="center">
          <Grid item xl={11} xs={12}>
            <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
              <Grid item xs={12}>
                <LV
                  label={t('maintainRequest.status')}
                  value={
                    <Status
                      options={MAINTAIN_STATUS_OPTIONS}
                      value={maintainRequestDetail?.status}
                    />
                  }
                />
              </Grid>
              {/* main */}
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('maintainRequest.form.code')}
                  value={maintainRequestDetail?.code}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('maintainRequest.priority')}
                  value={t(PRIORITY_LEVEL_MAP[maintainRequestDetail?.priority])}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('maintainRequest.form.name')}
                  value={maintainRequestDetail?.name}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('maintainRequest.form.serial')}
                  value={maintainRequestDetail?.deviceAssignment?.serial}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('maintainRequest.form.description')}
                  value={maintainRequestDetail?.description}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('maintainRequest.form.deviceName')}
                  value={maintainRequestDetail?.deviceAssignment?.device?.name}
                />
              </Grid>
              <Grid item xs={12}>
                <LV
                  label={t('maintainRequest.form.estimateDay')}
                  value={convertUtcDateToLocalTz(
                    maintainRequestDetail?.completeExpectedDate,
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <LV
                  label={t('maintainRequest.form.estimatedDuration')}
                  value={`${maintainRequestDetail?.expectedMaintainTime} ${t(
                    'maintainRequest.form.minute',
                  )}`}
                />
              </Grid>
              {/* supplies */}
              <Grid item xs={12}>
                <Typography variant="h4" component="span">
                  {t('maintainRequest.supplies.title')}
                </Typography>
              </Grid>
              {maintainRequestDetail?.supplies?.map((item) => (
                <React.Fragment key={item?.id}>
                  <Grid item lg={6} xs={12}>
                    <LV
                      label={t('maintainRequest.supplies.name')}
                      value={item?.name}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <LV
                      label={t('maintainRequest.supplies.quantity')}
                      value={item?.quantity}
                    />
                  </Grid>
                </React.Fragment>
              ))}
              {/* information */}
              <Grid item xs={12}>
                <Typography variant="h4" component="span">
                  {t('maintainRequest.smallTitle')}
                </Typography>
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('maintainRequest.information.factory')}
                  value={maintainRequestDetail?.deviceAssignment?.user?.factories?.map(
                    (fac) => fac?.name,
                  )}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('maintainRequest.information.workCenter')}
                  value={
                    maintainRequestDetail?.deviceAssignment?.workCenter?.name
                  }
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('maintainRequest.information.usageUser')}
                  value={
                    maintainRequestDetail?.deviceAssignment?.user?.fullName
                  }
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('maintainRequest.information.address')}
                  value={maintainRequestDetail?.deviceAssignment?.user?.address}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('maintainRequest.information.phone')}
                  value={maintainRequestDetail?.deviceAssignment?.user?.phone}
                />
              </Grid>
              <Grid item xs={12}>
                <LV
                  label={t('maintainRequest.responsibleUser')}
                  value={
                    maintainRequestDetail?.deviceAssignment?.responsibleUser
                      ?.fullName
                  }
                />
              </Grid>
            </Grid>
            <ActionBar onBack={backToList} />
          </Grid>
        </Grid>
      </Paper>
      <Activities data={maintainRequestDetail?.histories} />
    </Page>
  )
}

export default MaintainRequestDetail
