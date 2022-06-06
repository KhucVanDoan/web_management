import React, { useState } from 'react'

import {
  Grid,
  //  Paper
} from '@mui/material'
// import { styled } from '@mui/styles'
import { useTranslation } from 'react-i18next'
// import { useHistory } from 'react-router-dom'

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
// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }))

const warehouseDesign = () => {
  const { t } = useTranslation('wmsx')
  const { setKeyword } = useQueryState()
  const [warehouseRaio, setWarehouseRatio] = useState(1)
  // const [isLoading, setIsLoading] = useState(false)
  const renderHeaderRight = () => {
    return <></>
  }
  const onChangeWarehouseRatio = (ratio) => {
    setWarehouseRatio(ratio)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.warehouseDesign')}
      renderHeaderRight={renderHeaderRight}
      onSearch={setKeyword}
      placeholder={t('warehouseArea.searchPlaceholder')}
      // loading={isLoading}
    >
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <ListTemplate warehouseRaio={warehouseRaio} />
        </Grid>
        <Grid item xs={8}>
          <WarehouseCanvas onChangeWarehouseRatio={onChangeWarehouseRatio} />
        </Grid>
      </Grid>
    </Page>
  )
}

export default warehouseDesign
