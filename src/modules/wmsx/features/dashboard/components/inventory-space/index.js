import React, { useEffect, useState } from 'react'

import { Box, Card, Typography } from '@mui/material'
import { first, isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import Autocomplete from '~/components/Autocomplete'
import useCommonManagement from '~/modules/wmsx/redux/hooks/useCommonManagement'
import { useDashboardGapInStock } from '~/modules/wmsx/redux/hooks/useDashboard'
import { ROUTE } from '~/modules/wmsx/routes/config'

import SpaceProcessBar from '../space-process-bar'

const InventorySpace = () => {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()

  const {
    data: { warehouseList },
    actions: commonActions,
  } = useCommonManagement()
  const { data: gapInStock, actions } = useDashboardGapInStock()

  const [filterBy, setFilterBy] = useState()

  useEffect(() => {
    commonActions.getWarehouses()
  }, [])

  useEffect(() => {
    if (!isEmpty(warehouseList)) {
      setFilterBy(first(warehouseList)?.id)
    }
  }, [warehouseList])

  useEffect(() => {
    if (filterBy) {
      actions.getReportGapInstock({ warehouseId: filterBy })
    }
  }, [filterBy])

  const handleChangeSelect = (value) => {
    setFilterBy(value)
  }

  const data = gapInStock?.map((item) => ({
    title: `${item.warehouseSectorCode}-${item.warehouseSectorId}`,
    percentage: item.warehouseSectorFullmentPercent.toFixed(1),
  }))
  return (
    <Card sx={{ p: 2, height: '100%', boxSizing: 'border-box' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h2">
          {t('dashboard.chart.inventorySpaceTitle')}
        </Typography>
        <Autocomplete
          disableClearable
          options={warehouseList}
          value={filterBy}
          getOptionValue={(opt) => opt?.id}
          getOptionLabel={(opt) => opt?.name}
          onChange={handleChangeSelect}
          sx={{ width: '50%' }}
        />
      </Box>

      <Box
        sx={{
          height: 260,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {data.length > 0 &&
          data.forEach((warehouse, index) => {
            if (index <= 20) {
              return (
                <Box>
                  <SpaceProcessBar
                    title={warehouse.title}
                    percentage={warehouse.percentage}
                  />
                </Box>
              )
            }
          })}
        {data.length === 0 && (
          <Typography>{t('general:dataTable.noData')}</Typography>
        )}
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <Typography
          color="primary.main"
          onClick={() => {
            history.push(ROUTE.WAREHOUSE_SPACE_REPORT.PATH)
          }}
          sx={{ cursor: 'pointer' }}
        >
          {t('dashboard.chart.viewMore')}
        </Typography>
      </Box>
    </Card>
  )
}

export default InventorySpace
