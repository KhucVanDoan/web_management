import React, { useEffect } from 'react'

import { Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { isNil } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useHistory, useLocation } from 'react-router-dom'

import { DATE_FORMAT } from '~/common/constants'
import DataTable from '~/components/DataTable'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import { WORK_CENTER_PLAN_STATUS_OPTIONS } from '~/modules/mesx/constants'
import useWorkCenterPlan from '~/modules/mesx/redux/hooks/useWorkCenterPlan'
import { ROUTE } from '~/modules/mesx/routes/config'
import { formatDateTimeUtc } from '~/utils'

const DetailWorkCenterPlan = () => {
  const history = useHistory()
  const { t } = useTranslation(['mesx'])

  const {
    data: { wcpStructure, isLoading },
    actions,
  } = useWorkCenterPlan()
  const location = useLocation()
  useEffect(() => {
    actions.generateWorkCenterPlan({
      id: location.state.id,
      workCenterId: location.state.workCenterId,
    })
  }, [location.state.id, location.state.workCenterId])
  const breadcrumbs = [
    {
      title: 'database',
    },
    {
      route: ROUTE.WORK_CENTER_PLAN.DETAIL.PATH,
      title: ROUTE.WORK_CENTER_PLAN.DETAIL.TITLE,
    },
  ]

  const backToList = () => {
    history.push(ROUTE.WORK_CENTER_PLAN.LIST.PATH)
  }

  const getColumnManufacturing = () => {
    const columns = [
      {
        field: 'plan',
        headerName: t('workCenterPlan.plan'),
        width: 200,
      },
    ]
    if (wcpStructure) {
      wcpStructure?.workCenterScheduleDetails?.map((e) => {
        columns.push({
          field: e.executionDay,
          headerName: formatDateTimeUtc(e?.executionDay, DATE_FORMAT),
        })
        return null
      })
    }
    const total = [
      {
        file: 'total',
        headerName: t(`workCenterPlan.sum`),
      },
    ]

    return columns.concat(total)
  }

  const getRowManufacturing = () => {
    const rows = []

    return rows
  }
  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.detailWorkCenterPlan')}
      loading={isLoading}
      onBack={backToList}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            {!isNil(wcpStructure?.workOrderScheduleDetail?.status) && (
              <Grid item xs={12}>
                <LV
                  label={t('workCenterPlan.status')}
                  value={
                    <Status
                      options={WORK_CENTER_PLAN_STATUS_OPTIONS}
                      value={wcpStructure?.workOrderScheduleDetail?.status}
                    />
                  }
                />
              </Grid>
            )}

            <Grid item lg={6} xs={12}>
              <LV
                label={t('workCenterPlan.name')}
                value={wcpStructure?.workCenter?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('workCenterPlan.leader')}
                value={wcpStructure?.workCenter?.leader?.fullName}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('workCenterPlan.member')}
                value={wcpStructure?.workCenter?.members
                  ?.map((e) => e.fullName)
                  .join(', ')}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('workCenterPlan.performance')}
                value={wcpStructure?.workOrderScheduleDetail?.quantity}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Box sx={{ mt: 3, mb: 2 }}>
        <Typography variant="h4" component="span">
          {t('workCenterPlan.workCenterScheduleDetails')}
        </Typography>
      </Box>
      <DataTable
        rows={getRowManufacturing()}
        columns={getColumnManufacturing()}
        hideSetting
        hideFooter
      ></DataTable>
    </Page>
  )
}
export default DetailWorkCenterPlan
