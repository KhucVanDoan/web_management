import React, { useState } from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { useQueryState } from '~/common/hooks'
import Page from '~/components/Page'

import { ROUTE } from '../../routes/config'
import ListTemplate from './ListTemplate'
import WarehouseCanvas from './WarehouseCanvas'

const breadcrumbs = [
  {
    title: 'warehouseSetup',
  },
  {
    route: ROUTE.WAREHOUSE_DESIGN.PATH,
    title: ROUTE.WAREHOUSE_DESIGN.TITLE,
  },
]

const warehouseDesign = () => {
  const { t } = useTranslation('wmsx')
  const { setKeyword } = useQueryState()
  const [warehouseRaio, setWarehouseRatio] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const onChangeWarehouseRatio = (ratio) => {
    setWarehouseRatio(ratio)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.warehouseDesign')}
      onSearch={setKeyword}
      placeholder={t('warehouseArea.searchPlaceholder')}
      freeSolo
      loading={isLoading}
    >
      <Grid
        container
        spacing={2}
        sx={{
          flex: 1,
          overflow: 'hidden',
          minHeight: 500,
        }}
      >
        <Grid item xs={3} sx={{ height: '100%' }}>
          <ListTemplate warehouseRaio={warehouseRaio} />
        </Grid>
        <Grid item xs={9} sx={{ height: '100%' }}>
          <WarehouseCanvas
            onChangeWarehouseRatio={onChangeWarehouseRatio}
            setIsLoading={setIsLoading}
          />
        </Grid>
      </Grid>
    </Page>
  )
}

export default warehouseDesign
