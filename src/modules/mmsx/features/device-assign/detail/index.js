import React, { useEffect, useMemo, useState } from 'react'

import { Grid, Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { addMinutes, endOfDay, startOfDay, subMonths } from 'date-fns'
import { isEmpty, isNumber } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import Autocomplete from '~/components/Autocomplete'
import Button from '~/components/Button'
import DateRangePicker from '~/components/DateRangePicker'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import Tabs from '~/components/Tabs'
import {
  ACTION_MAP,
  DEVICE_ASSIGN_STATUS,
  SUPPLIES_ACCESSORY,
  WORK_TIME_DATA_SOURCE_TYPE,
} from '~/modules/mmsx/constants'
import Activities from '~/modules/mmsx/partials/Activities'
import useCommonInfo from '~/modules/mmsx/redux/hooks/useCommonInfo'
import useDeviceAssign from '~/modules/mmsx/redux/hooks/useDeviceAssign'
import { maintainInfoDeviceAssign } from '~/modules/mmsx/redux/sagas/device-assign/get-maintain-info'
import { ROUTE } from '~/modules/mmsx/routes/config'
import { convertUtcDateToLocalTz } from '~/utils'

import DeviceAssignFormHistory from '../form/form-history'
import TableMo from '../form/table-mo'
import TableMaintenance from '../table-maintenance'
const breadcrumbs = [
  {
    title: ROUTE.DEVICE_MANAGEMENT.TITLE,
  },
  {
    route: ROUTE.DEVICE_ASSIGN.LIST.PATH,
    title: ROUTE.DEVICE_ASSIGN.LIST.TITLE,
  },
  {
    route: ROUTE.DEVICE_ASSIGN.DETAIL.PATH,
    title: ROUTE.DEVICE_ASSIGN.DETAIL.TITLE,
  },
]

const DeviceAssignDetail = () => {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const { id } = useParams()
  const {
    data: { isLoading, deviceAssignDetail, logTimeByMo },
    actions,
  } = useDeviceAssign()
  const [maintainList, setMaintainList] = useState([])
  const [dateWorkCenter, setDateWorkCenter] = useState([
    subMonths(new Date(), 6),
    new Date(),
  ])
  const [selectedMO, setSelectedMO] = useState([])

  const {
    data: { moListByWorkCenter },
    actions: actionsCommon,
  } = useCommonInfo()

  const formatSubAccessories = (data) => {
    const accessories = []
    data?.forEach((item) => {
      if (item?.type === SUPPLIES_ACCESSORY.ACCESSORY) {
        accessories.push({
          ...item,
          nextMaintain: convertUtcDateToLocalTz(
            addMinutes(
              new Date(deviceAssignDetail?.usedAt),
              +item?.maintenancePeriod || 0,
            ),
          ),
          replaceDate: convertUtcDateToLocalTz(
            addMinutes(
              new Date(deviceAssignDetail?.usedAt),
              +item?.mttfIndex || 0,
            ),
          ),
        })
      }
    })
    return accessories
  }

  // const formatMaintainList = (data) => {
  //   let newData = data?.map((row) => {
  //     const temp = []
  //     row?.details?.forEach((item) => {
  //       if (!isEmpty(item)) {
  //         temp.push({
  //           ...item,
  //           nextMaintain: item?.nextMaintain || row?.nextMaintain,
  //           replaceDate: item?.replaceDate || row?.replaceDate,
  //         })
  //       }
  //     })
  //     return {
  //       details: temp,
  //       ...row,
  //     }
  //   })
  //   return newData
  // }

  useEffect(() => {
    actions.detailDeviceAssign(id)
    return () => {
      actions.resetDeviceAssignState()
    }
  }, [id])

  const getMaintainInfoDeviceAssign = async () => {
    if (!isEmpty(deviceAssignDetail)) {
      const params = {
        id: deviceAssignDetail?.deviceId,
        deviceAssignId: deviceAssignDetail?.id,
      }
      const response = await maintainInfoDeviceAssign(params)
      if (response?.data) {
        const data = response?.data
        setMaintainList([
          {
            details: formatSubAccessories(data?.details),
            name: data?.name,
            nextMaintain: convertUtcDateToLocalTz(
              addMinutes(
                new Date(deviceAssignDetail?.usedAt),
                data?.maintenancePeriod || 0,
              ),
            ),
            mtbf: Math.round(data?.mtbfIndex),
            mttf: +data?.mttfIndex ? Math.round(data?.mttfIndex) : null,
            mtta: Math.round(data?.mttaIndex),
            mttr: Math.round(data?.mttrIndex),
            replaceDate: convertUtcDateToLocalTz(
              addMinutes(
                new Date(deviceAssignDetail?.usedAt),
                data?.mttfIndex || 0,
              ),
            ),
          },
        ])
      }
    }
  }

  useEffect(() => {
    getMaintainInfoDeviceAssign()
  }, [deviceAssignDetail])

  useEffect(() => {
    if (!isEmpty(moListByWorkCenter)) setSelectedMO([moListByWorkCenter[0].id])
  }, [moListByWorkCenter])

  useEffect(() => {
    setSelectedMO([])
    const startOfDay1 = startOfDay(dateWorkCenter[0])
    const endOfDay2 = endOfDay(dateWorkCenter[1])
    const params = {
      filter:
        JSON.stringify([
          {
            column: 'plan',
            text: `${startOfDay1.toISOString()}|${endOfDay2.toISOString()}`,
          },
          {
            column: 'workCenterId',
            text: `${deviceAssignDetail?.workCenter?.id}`,
          },
        ]) || [],
    }
    actionsCommon?.getMoByWorkCenter(params)
  }, [dateWorkCenter, deviceAssignDetail?.workCenter])

  useEffect(() => {
    const params = {
      wcId: deviceAssignDetail?.workCenter?.id,
      moIds: selectedMO.join(','),
    }

    actions?.getLogTimeByMo(params)
  }, [selectedMO])

  const backToList = () => {
    history.push(ROUTE.DEVICE_ASSIGN.LIST.PATH)
  }

  const columns = useMemo(
    () => [
      {
        field: 'name',
        headerName: t('deviceAssign.assign.name'),
        width: 150,
      },
      {
        field: 'nextMaintain',
        headerName: t('deviceAssign.maintainTable.nextMaintainEstimate'),
        width: 150,
        align: 'center',
      },
      {
        field: 'mtbf',
        headerName: t('deviceList.form.mtbf'),
        headerTooltip: t('deviceList.tooltipHeader.mtbf'),
        width: 150,
        align: 'center',
      },
      {
        field: 'mttr',
        headerName: t('deviceList.form.mttr'),
        headerTooltip: t('deviceList.tooltipHeader.mttr'),
        width: 150,
        align: 'center',
      },
      {
        field: 'mtta',
        headerName: t('deviceList.form.mtta'),
        headerTooltip: t('deviceList.tooltipHeader.mtta'),
        width: 150,
        align: 'center',
      },
      {
        field: 'mttf',
        headerName: t('deviceList.form.mttf'),
        headerTooltip: t('deviceList.tooltipHeader.mttf'),
        width: 150,
        align: 'center',
      },
      {
        field: 'replaceDate',
        headerName: t('deviceAssign.maintainTable.estimatedReplacementDate'),
        width: 150,
        align: 'center',
      },
    ],
    [deviceAssignDetail, maintainList],
  )

  const subColumns = [
    {
      field: 'name',
      headerName: t('deviceAssign.assign.componentTitle'),
      width: 150,
    },
    {
      field: 'nextMaintain',
      headerName: t('deviceAssign.maintainTable.nextMaintainEstimate'),
      width: 150,
      align: 'center',
    },
    {
      field: 'mtbfIndex',
      headerName: t('deviceList.form.mtbf'),
      headerTooltip: t('deviceList.tooltipHeader.mtbf'),
      width: 150,
      align: 'center',
    },
    {
      field: 'mttrIndex',
      headerName: t('deviceList.form.mttr'),
      headerTooltip: t('deviceList.tooltipHeader.mttr'),
      width: 150,
      align: 'center',
    },
    {
      field: 'mttaIndex',
      headerName: t('deviceList.form.mtta'),
      headerTooltip: t('deviceList.tooltipHeader.mtta'),
      width: 150,
      align: 'center',
    },
    {
      field: 'mttfIndex',
      headerName: t('deviceList.form.mttf'),
      headerTooltip: t('deviceList.tooltipHeader.mttf'),
      width: 150,
      align: 'center',
    },
    {
      field: 'replaceDate',
      headerName: t('deviceAssign.maintainTable.estimatedReplacementDate'),
      width: 150,
      align: 'center',
    },
  ]

  const renderHeaderRight = () => {
    return (
      <>
        <Box>
          <Button
            variant="outlined"
            sx={{ ml: 4 / 3 }}
            onClick={() => history.push(ROUTE.DEVICE_LIST.PATH)}
          >
            {t('deviceCategory.button.device')}
          </Button>
          <Button
            sx={{ ml: 4 / 3 }}
            onClick={() => history.push(ROUTE.REQUEST_DEVICE.PATH)}
          >
            {t('menu.requestDevice')}
          </Button>
        </Box>
      </>
    )
  }
  const histories = deviceAssignDetail?.histories?.map((item) => ({
    content: ACTION_MAP[item?.action]
      ? t(`deviceAssign.comment.${ACTION_MAP[item?.action]}`)
      : '',
    createdAt: item?.createdAt,
    id: item?.userId,
    username: item?.username,
  }))

  const historyMaintenance = deviceAssignDetail?.histories?.reduce(
    (acc, cur) => {
      if (cur?.action === 1 && cur?.planCode && cur?.jobType) {
        return [
          ...acc,
          {
            code: cur?.planCode,
            date: cur?.createdAt,
            type: cur?.jobType,
            id: cur?.jobId,
          },
        ]
      }
      return acc
    },
    [],
  )

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.deviceAssignDetail')}
      onBack={backToList}
      loading={isLoading}
      renderHeaderRight={renderHeaderRight}
      freeSolo
    >
      <Paper sx={{ p: 2 }}>
        <Grid container justifyContent="center">
          <Grid item xl={11} xs={12}>
            <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('deviceAssign.assign.assignCode')}
                  value={deviceAssignDetail?.requestCode}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('deviceAssign.assign.assignDate')}
                  value={convertUtcDateToLocalTz(
                    deviceAssignDetail?.assignedAt,
                  )}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('deviceAssign.assign.code')}
                  value={deviceAssignDetail?.deviceCode}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('deviceAssign.assign.usageUser')}
                  value={deviceAssignDetail?.assignUser?.username}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('deviceAssign.assign.name')}
                  value={deviceAssignDetail?.deviceName}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('deviceAssign.assign.usageTime')}
                  value={convertUtcDateToLocalTz(deviceAssignDetail?.usedAt)}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('deviceAssign.assign.serial')}
                  value={deviceAssignDetail?.serial}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('deviceAssign.assign.status')}
                  value={
                    <Status
                      options={DEVICE_ASSIGN_STATUS}
                      value={deviceAssignDetail?.status}
                    />
                  }
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('deviceAssign.assign.model')}
                  value={deviceAssignDetail?.model}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('deviceAssign.assign.workTimeDataSource')}
                  value={t(
                    WORK_TIME_DATA_SOURCE_TYPE.find(
                      (e) => e.value === deviceAssignDetail?.workTimeDataSource,
                    )?.text,
                  )}
                />
              </Grid>
            </Grid>
            <Tabs
              list={[
                t('viewAssignTabDisplay.maintain'),
                t('viewAssignTabDisplay.history'),
                ...(deviceAssignDetail?.deviceType === 1
                  ? [t('viewAssignTabDisplay.mo')]
                  : []),
              ]}
              sx={{ mt: 3 }}
            >
              {/* Tab 1 */}
              <Box
                sx={{
                  mb: 2,
                }}
              >
                <TableMaintenance
                  rows={maintainList}
                  columns={columns}
                  subColumns={subColumns}
                  striped={false}
                  hideSetting
                  hideFooter
                />
              </Box>

              {/* Tab 2 */}

              <Box
                sx={{
                  mb: 2,
                }}
              >
                <DeviceAssignFormHistory items={historyMaintenance} />
              </Box>

              {/* Tab 3 */}

              <Box
                sx={{
                  mb: 2,
                }}
              >
                <Grid container columnSpacing={4} rowSpacing={4 / 3}>
                  <Grid item lg={6} xs={12}>
                    <LV
                      label={t('deviceAssign.assign.workCenter')}
                      value={deviceAssignDetail?.workCenter?.name}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <LV
                      label={t('deviceAssign.assign.oeeTarget')}
                      value={
                        deviceAssignDetail?.oee
                          ? deviceAssignDetail?.oee + ' %'
                          : ''
                      }
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <LV
                      label={t('deviceAssign.assign.factory')}
                      value={deviceAssignDetail?.factory?.name}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <LV
                      label={t('deviceAssign.assign.productivityTarget')}
                      value={
                        deviceAssignDetail?.productivityTarget
                          ? deviceAssignDetail?.productivityTarget + ' %'
                          : ''
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h4" sx={{ my: 1 }}>
                      {t('deviceAssign.lookProductInfo')}
                    </Typography>
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <DateRangePicker
                      value={dateWorkCenter}
                      label={t('deviceAssign.moTable.date')}
                      onChange={(val) => setDateWorkCenter(val)}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Autocomplete
                      name="attributeMaintenance"
                      label={t('deviceAssign.moTable.code')}
                      placeholder={t('deviceAssign.moPlaceHolder')}
                      options={moListByWorkCenter}
                      getOptionValue={(opt) => opt?.id || ''}
                      getOptionLabel={(opt) => opt?.name || ''}
                      value={selectedMO}
                      multiple
                      onChange={(e) => setSelectedMO(e)}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <LV
                      label={t('deviceAssign.actualOee')}
                      value={
                        isNumber(logTimeByMo?.oee)
                          ? logTimeByMo?.oee.toFixed(2) + ' %'
                          : ''
                      }
                    />
                  </Grid>
                </Grid>
                <Box sx={{ mt: 2 }}>
                  <TableMo items={logTimeByMo?.logTimes || []} />
                </Box>
              </Box>
            </Tabs>

            <Grid item xs={12}>
              <LV
                label={t('deviceCategory.responsibleUser')}
                value={deviceAssignDetail?.responsibleUser?.fullName}
              />
            </Grid>
            <ActionBar onBack={backToList} />
          </Grid>
        </Grid>
      </Paper>
      <Activities data={histories} />
    </Page>
  )
}

export default DeviceAssignDetail
