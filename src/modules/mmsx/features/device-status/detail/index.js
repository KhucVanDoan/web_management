import React, { useEffect } from 'react'

import { Box, Grid, Paper, Typography } from '@mui/material'
import { isNumber } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

import { useQueryState } from '~/common/hooks'
import ActionBar from '~/components/ActionBar'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  DEVICE_STATUS_ENUM_OPTIONS,
  WORK_TIME_DATA_SOURCE_TYPE,
} from '~/modules/mmsx/constants'
import useDeviceStatus from '~/modules/mmsx/redux/hooks/useDeviceStatus'
import { ROUTE } from '~/modules/mmsx/routes/config'
import { useClasses } from '~/themes'
import { convertUtcDateToLocalTz } from '~/utils'

import style from './style'

const breadcrumbs = [
  {
    title: 'serialDeviceManagement',
  },
  {
    route: ROUTE.DEVICE_STATUS.LIST.PATH,
    title: ROUTE.DEVICE_STATUS.LIST.TITLE,
  },
  {
    route: ROUTE.DEVICE_STATUS.DETAIL.PATH,
    title: ROUTE.DEVICE_STATUS.DETAIL.TITLE,
  },
]

const DeviceStatusDetail = () => {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const { id } = useParams()
  const classes = useClasses(style)

  const { page, pageSize, sort, setPage, setPageSize, setSort } =
    useQueryState()

  const {
    data: { deviceStatusDetail, isLoading },
    actions,
  } = useDeviceStatus()

  useEffect(() => {
    actions.getDetailDeviceStatus(id)
    return () => {
      actions.resetDeviceStatus()
    }
  }, [id])

  const backToList = () => {
    history.push(ROUTE.DEVICE_STATUS.LIST.PATH)
  }

  const columns = [
    {
      field: 'id',
      width: 50,
      headerName: '#',
      renderCell: (_, index) => {
        return index + 1
      },
    },
    {
      field: 'date',
      width: 120,
      headerName: t('deviceStatus.date'),
      filterFormat: 'date',
      sortable: true,
      renderCell: (params) => {
        return convertUtcDateToLocalTz(params?.row?.date)
      },
    },
    {
      field: 'active',
      headerName: t('deviceStatus.active'),
      width: 120,
      sortable: true,
      renderCell: (params) => {
        return params.row?.activeTime
      },
    },
    {
      field: 'rest',
      headerName: t('deviceStatus.rest'),
      width: 120,
      sortable: true,
      renderCell: (params) => {
        return params.row?.rest
      },
    },
    {
      field: 'passedDevice',
      headerName: t('deviceStatus.passedDevice'),
      width: 120,
      sortable: true,
      renderCell: (params) => {
        return params.row?.passQuantity
      },
    },
    {
      field: 'manufacturedDevice',
      headerName: t('deviceStatus.manufacturedDevice'),
      width: 120,
      sortable: true,
      renderCell: (params) => {
        return params.row?.actualQuantity
      },
    },
    {
      field: 'stop',
      headerName: t('deviceStatus.stop'),
      width: 120,
      sortable: true,
      renderCell: (params) => {
        return params.row?.stop
      },
    },
    {
      field: 'oee',
      headerName: t('deviceStatus.oee'),
      width: 120,
      sortable: true,
      renderCell: (params) => {
        const { oee } = params.row
        return isNumber(oee) ? oee.toFixed(2) : ''
      },
    },
  ]

  const renderHeaderRight = () => {
    return deviceStatusDetail?.type === WORK_TIME_DATA_SOURCE_TYPE[1].value ? (
      <>
        <Button variant="outlined" icon="download" disabled>
          {t('menu.importExportData')}
        </Button>
        <Button
          onClick={() =>
            history.push(ROUTE.DEVICE_STATUS.EDIT.PATH.replace(':id', `${id}`))
          }
          icon="add"
          sx={{ ml: 4 / 3 }}
        >
          {t('deviceStatus.form.editButton')}
        </Button>
      </>
    ) : (
      <></>
    )
  }
  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.deviceStatusDetail')}
      renderHeaderRight={renderHeaderRight}
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
                  label={t('deviceStatus.form.status')}
                  value={
                    <Status
                      options={DEVICE_STATUS_ENUM_OPTIONS}
                      value={deviceStatusDetail?.status}
                    />
                  }
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('deviceStatus.form.serial')}
                  value={deviceStatusDetail?.serial}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('deviceStatus.form.deviceName')}
                  value={deviceStatusDetail?.deviceName}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <Box className={classes.boxContainer}>
                  <Box className="overall-background">
                    <Box className="overall-text">
                      <span className="oee-text">
                        {t('deviceStatus.form.oee') + ': '}
                        {deviceStatusDetail?.totalOee > 0
                          ? `${deviceStatusDetail?.totalOee.toFixed(2)}%`
                          : '0.00%'}
                      </span>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Typography variant="h4" mt={1}>
                {t('deviceStatus.form.tableTitle')}
              </Typography>
            </Grid>
            <Box mt={1}>
              <DataTable
                columns={columns}
                rows={deviceStatusDetail?.data}
                pageSize={pageSize}
                page={page}
                onPageChange={setPage}
                onPageSizeChange={setPageSize}
                onSortChange={setSort}
                sort={sort}
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

export default DeviceStatusDetail
