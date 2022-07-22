import React, { useEffect } from 'react'

import { Box, Grid, Paper } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import DataTable from '~/components/DataTable'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import useMaintainanceProgress from '~/modules/mmsx/redux/hooks/useMaintainanceProgress'
import { ROUTE } from '~/modules/mmsx/routes/config'
import { convertUtcDateToLocalTz } from '~/utils'

const breadcrumbs = [
  {
    title: 'report',
  },
  {
    route: ROUTE.MAINTAINANCE_PROGRESS.LIST.PATH,
    title: ROUTE.MAINTAINANCE_PROGRESS.LIST.TITLE,
  },
  {
    route: ROUTE.MAINTAINANCE_PROGRESS.DETAIL.PATH,
    title: ROUTE.MAINTAINANCE_PROGRESS.DETAIL.TITLE,
  },
]

const MaintainanceProgressDetail = () => {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const { id } = useParams()

  const {
    data: { progressDetail, isLoading },
    actions,
  } = useMaintainanceProgress()

  useEffect(() => {
    actions.getDetailMaintainanceProgressStart(id)
    return () => {
      actions.resetMaintainanceProgress()
    }
  }, [id])

  const backToList = () => {
    history.push(ROUTE.MAINTAINANCE_PROGRESS.LIST.PATH)
  }

  const columns = [
    {
      field: 'id',
      headerName: '#',
      width: 80,
      renderCell: (params, index) => {
        if (params.row.id === 'maintainanceProgress.table.rate') return ''
        return index + 1
      },
    },
    {
      field: 'workType',
      headerName: t('maintainanceProgress.workType'),
      width: 200,
      renderCell: (params) => {
        if (params.row.id === 'maintainanceProgress.table.completedWork')
          return t('maintainanceProgress.table.completedWork')
        if (params.row.id === 'maintainanceProgress.table.doingWork')
          return t('maintainanceProgress.table.doingWork')
        if (params.row.id === 'maintainanceProgress.table.outOfDateWork')
          return t('maintainanceProgress.table.outOfDateWork')
        if (params.row.id === 'maintainanceProgress.table.pendingWork')
          return t('maintainanceProgress.table.pendingWork')
        if (params.row.id === 'maintainanceProgress.table.rate')
          return t('maintainanceProgress.table.rate')
      },
    },
    {
      field: 'workQuantity',
      headerName: t('maintainanceProgress.workQuantity'),
      width: 200,
      align: 'right',
      headerAlign: 'left',
      renderCell: (params) => {
        if (params.row.id === 'maintainanceProgress.table.completedWork')
          return progressDetail?.successQuantity
        if (params.row.id === 'maintainanceProgress.table.doingWork')
          return progressDetail?.executeQuantity
        if (params.row.id === 'maintainanceProgress.table.outOfDateWork')
          return progressDetail?.lateQuantity
        if (params.row.id === 'maintainanceProgress.table.pendingWork')
          return progressDetail?.waitQuantity
        if (params.row.id === 'maintainanceProgress.table.rate')
          return progressDetail?.successQuantity &&
            progressDetail?.totalQuantity
            ? (progressDetail?.successQuantity /
                progressDetail?.totalQuantity) *
                100 +
                '%'
            : '0%'
      },
    },
  ]

  const renderRow = [
    {
      id: 'maintainanceProgress.table.completedWork',
    },
    {
      id: 'maintainanceProgress.table.doingWork',
    },
    {
      id: 'maintainanceProgress.table.outOfDateWork',
    },
    {
      id: 'maintainanceProgress.table.pendingWork',
    },
    {
      id: 'maintainanceProgress.table.rate',
    },
  ]

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.maintainanceProgressDetail')}
      onBack={backToList}
      loading={isLoading}
      freeSolo
    >
      <Paper sx={{ p: 2 }}>
        <Grid container justifyContent="center">
          <Grid item xl={11} xs={12}>
            <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
              <Grid item xs={12}>
                <LV
                  label={t('maintainanceProgress.userName')}
                  value={progressDetail?.fullName}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('maintainanceProgress.userCode')}
                  value={progressDetail?.userCode}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('maintainanceProgress.role')}
                  value={progressDetail?.userRole}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <LV
                  label={t('maintainanceProgress.startDay')}
                  value={convertUtcDateToLocalTz(progressDetail?.startWork)}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('maintainanceProgress.planQuantity')}
                  value={`${progressDetail?.planQuantity} ${t(
                    'maintainanceProgress.work',
                  )}`}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('maintainanceProgress.totalQuantity')}
                  value={`${progressDetail?.totalQuantity} ${t(
                    'maintainanceProgress.work',
                  )}`}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('maintainanceProgress.incurredQuantity')}
                  value={`${progressDetail?.incurredQuantity} ${t(
                    'maintainanceProgress.work',
                  )}`}
                />
              </Grid>
            </Grid>
            <Box mt={2}>
              <DataTable
                rows={renderRow}
                columns={columns}
                striped={false}
                hideSetting
                hideFooter
              />
            </Box>
            <ActionBar onBack={backToList} />
          </Grid>
        </Grid>
      </Paper>
    </Page>
  )
}

export default MaintainanceProgressDetail
