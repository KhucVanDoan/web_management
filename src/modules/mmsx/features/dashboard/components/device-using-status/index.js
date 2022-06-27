import React, { useEffect, useState } from 'react'

import { Box, Card, Grid, Typography } from '@mui/material'
import { isEmpty, isNumber } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import Autocomplete from '~/components/Autocomplete'
import Button from '~/components/Button'
import useCommonInfo from '~/modules/mmsx/redux/hooks/useCommonInfo'
import { useDashboardDeviceUsingStatus } from '~/modules/mmsx/redux/hooks/useDashboard'
import { ROUTE } from '~/modules/mmsx/routes/config'
import { useClasses } from '~/themes'
import { convertUtcDateTimeToLocalTz } from '~/utils'

import DevicePanel from './device-panel'
import style from './style'

function DeviceUsingStatus() {
  const [factoryId, setFactoryId] = useState(null)
  const [manufacturingOrderId, setManufacturingOrderId] = useState(null)
  const { t } = useTranslation(['mmsx'])
  const classes = useClasses(style)

  const history = useHistory()

  const { data, actions } = useDashboardDeviceUsingStatus()

  const {
    data: { factoryList, moListByFactory },
    actions: actionsCommon,
  } = useCommonInfo()

  const handleOnClickSearch = () => {
    actions.getDeviceUsingStatus({
      factoryId: factoryId?.toString(),
      moId: manufacturingOrderId?.toString(),
    })
  }

  useEffect(() => {
    actionsCommon.getFactoryList()
  }, [])

  useEffect(() => {
    if (!isEmpty(factoryList)) {
      setFactoryId(factoryList[0]?.id)
      actions.getDeviceUsingStatus({
        factoryId: factoryList[0]?.id?.toString(),
      })
    }
  }, [factoryList])

  useEffect(() => {
    actionsCommon.getMoByFactory({
      filter: JSON.stringify([
        { column: 'factoryIds', text: factoryId?.toString() },
      ]),
    })
  }, [factoryId])

  return (
    <Card sx={{ p: 2 }}>
      <Box className={classes.container}>
        <Typography variant="h2">
          {t('dashboard.deviceUsingStatus.title')}
        </Typography>
        <Typography variant="body2">
          {t('dashboard.deviceUsingStatus.exportDate')}
          {convertUtcDateTimeToLocalTz(data?.exportedAt)}
        </Typography>
      </Box>
      <Box className={classes.container}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={6} md={6} sx={{ display: 'flex' }}>
            <Grid item xs={12}>
              <Autocomplete
                value={factoryId}
                options={factoryList}
                getOptionValue={(opt) => opt?.id || ''}
                getOptionLabel={(opt) => opt?.name}
                onChange={(val) => {
                  setFactoryId(val)
                }}
                sx={{ mr: 1 }}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                value={manufacturingOrderId}
                options={moListByFactory}
                getOptionValue={(opt) => opt?.id || ''}
                getOptionLabel={(opt) => opt?.name}
                placeholder={t(
                  'dashboard.deviceUsingStatus.productOrderPlaceholder',
                )}
                onChange={(val) => {
                  setManufacturingOrderId(val)
                }}
              />
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            lg={6}
            md={6}
            sx={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <Button onClick={handleOnClickSearch}>{t('general.filter')}</Button>
          </Grid>
        </Grid>
      </Box>
      <Box className={classes.boxContainer}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={2} md={2}>
            <Box className="overall-background">
              <Box className="overall-text">
                <span className="device-text">
                  {isNumber(data?.deviceTotal) ? data?.deviceTotal : ''}
                  {' ' + t('general.device')}
                </span>
                <span className="oee-text">
                  {t('dashboard.deviceUsingStatus.oee') + ' '}
                  {isNumber(data?.oee) ? data?.oee.toFixed(2) + ' %' : ''}
                </span>
              </Box>
            </Box>
          </Grid>
          <Grid item sx={12} lg={10} md={10} display="flex" alignItems="center">
            <Grid container spacing={2}>
              <Grid item xs={6} md={6} lg={2}>
                <Box className="item">
                  <Box className="stt-box activation">
                    {data?.totalDeviceStatus?.totalInActive}
                  </Box>
                  <span className="status-text">
                    {t('dashboard.deviceUsingStatus.activating')}
                  </span>
                </Box>
              </Grid>
              <Grid item xs={6} md={6} lg={2}>
                <Box className="item">
                  <Box className="stt-box stop">
                    {data?.totalDeviceStatus?.totalInStop}
                  </Box>
                  <span className="status-text">
                    {t('dashboard.deviceUsingStatus.stop')}
                  </span>
                </Box>
              </Grid>
              <Grid item xs={6} md={6} lg={2}>
                <Box className="item">
                  <Box className="stt-box error">
                    {data?.totalDeviceStatus?.totalInError}
                  </Box>
                  <span className="status-text">
                    {t('dashboard.deviceUsingStatus.error')}
                  </span>
                </Box>
              </Grid>
              <Grid item xs={6} md={6} lg={2}>
                <Box className="item">
                  <Box className="stt-box off-maintain">
                    {data?.totalDeviceStatus?.totalInMaintain}
                  </Box>
                  <span className="status-text">
                    {t('dashboard.deviceUsingStatus.off.maintain')}
                  </span>
                </Box>
              </Grid>
              <Grid item xs={6} md={6} lg={2}>
                <Box className="item">
                  <Box className="stt-box off-shutdown">
                    {data?.totalDeviceStatus?.totalInShutDown}
                  </Box>
                  <span className="status-text">
                    {t('dashboard.deviceUsingStatus.off.shutdown')}
                  </span>
                </Box>
              </Grid>
              <Grid item xs={6} md={6} lg={2}>
                <Box className="item">
                  <Box className="stt-box using">
                    {data?.totalDeviceStatus?.totalInUse}
                  </Box>
                  <span className="status-text">
                    {t('dashboard.deviceUsingStatus.using')}
                  </span>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button onClick={() => history.push(ROUTE.DEVICE_STATUS.PATH)}>
          {t('dashboard.deviceUsingStatus.listView')}
        </Button>
      </Box>
      {data?.deviceStatusData?.map((device, index) => (
        <DevicePanel
          key={index}
          type={device?.status}
          title={device?.serial}
          data={device?.activeTime}
        />
      ))}
    </Card>
  )
}

export default DeviceUsingStatus
