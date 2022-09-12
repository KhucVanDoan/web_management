import React, { useEffect } from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import useSetStoragePeriod from '~/modules/wmsx/redux/hooks/useSetStoragePeriod'
import { ROUTE } from '~/modules/wmsx/routes/config'

const breadcrumbs = [
  {
    title: ROUTE.WAREHOUSE_MANAGEMENT.TITLE,
  },
  {
    route: ROUTE.SET_STORAGE_PERIOD.LIST.PATH,
    title: ROUTE.SET_STORAGE_PERIOD.LIST.TITLE,
  },
  {
    route: ROUTE.SET_STORAGE_PERIOD.DETAIL.PATH,
    title: ROUTE.SET_STORAGE_PERIOD.DETAIL.TITLE,
  },
]

function SetStoragePeriodDetail() {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const { id } = useParams()
  const {
    data: { isLoading, storagePeriodDetails },
    actions,
  } = useSetStoragePeriod()

  useEffect(() => {
    actions.getStoragePeriodDetailsById(id)
    return () => {
      actions.resetStoragePeriodDetailsState()
    }
  }, [id])

  const backToList = () => {
    history.push(ROUTE.SET_STORAGE_PERIOD.LIST.PATH)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.setStoragePeriodDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('setStoragePeriod.warehouseCode')}
                value={storagePeriodDetails?.warehouse?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('setStoragePeriod.warehouseName')}
                value={storagePeriodDetails?.warehouse?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('setStoragePeriod.storageLimitTitle')}
                value={`${storagePeriodDetails?.expiryWarehouse} ${t(
                  'general.day',
                )}`}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('setStoragePeriod.warningPeriodTitle')}
                value={`${storagePeriodDetails?.expiryWarningWarehouse} ${t(
                  'general.day',
                )}`}
              />
            </Grid>
          </Grid>
          <ActionBar onBack={backToList} />
        </Grid>
      </Grid>
    </Page>
  )
}

export default SetStoragePeriodDetail
