import React, { useEffect } from 'react'

import { Box, Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import { MODAL_MODE } from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TextField from '~/components/TextField'
import {
  ACTIVE_STATUS_OPTIONS,
  WAREHOUSE_LAYOUTS,
} from '~/modules/wmsx/constants'
import useInventoryStatistics from '~/modules/wmsx/redux/hooks/useInventoryStatistics'
import useLocationManagement from '~/modules/wmsx/redux/hooks/useLocationManagement'
import { ROUTE } from '~/modules/wmsx/routes/config'

import ItemsSettingTable from '../form/items-setting-table'

const breadcrumbs = [
  {
    title: ROUTE.WAREHOUSE_MANAGEMENT.TITLE,
  },
  {
    route: ROUTE.LOCATION_MANAGEMENT.LIST.PATH,
    title: ROUTE.LOCATION_MANAGEMENT.LIST.TITLE,
  },
  {
    route: ROUTE.LOCATION_MANAGEMENT.DETAIL.PATH,
    title: ROUTE.LOCATION_MANAGEMENT.DETAIL.TITLE,
  },
]

function LocationManagementDetail() {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const { id } = useParams()

  const {
    data: { isLoading, locationDetails },
    actions,
  } = useLocationManagement()
  const {
    data: { isLoading: isLoadingGetItem },
  } = useInventoryStatistics()
  useEffect(() => {
    actions.getLocationDetailsById(id)
    return () => {
      actions.resetLocationDetailsState()
    }
  }, [id])

  const backToList = () => {
    history.push(ROUTE.LOCATION_MANAGEMENT.LIST.PATH)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.locationManagementDetail')}
      onBack={backToList}
      loading={isLoading || isLoadingGetItem}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item xs={12}>
              <LV
                label={t('locationManagement.status')}
                value={
                  <Status
                    options={ACTIVE_STATUS_OPTIONS}
                    value={locationDetails?.status}
                  />
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('locationManagement.code')}
                value={locationDetails.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('locationManagement.warehouseCode')}
                value={locationDetails?.warehouse?.code}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('locationManagement.description')}
                multiline
                rows={3}
                value={locationDetails.description}
                readOnly
                sx={{
                  'label.MuiFormLabel-root': {
                    color: (theme) => theme.palette.subText.main,
                  },
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        sx={(theme) => ({
          justifyContent: 'center',
          bgcolor: 'grayF4.main',
          borderRadius: 1,
          my: 2,
          pt: 1,
          pb: 2,

          [theme.breakpoints.down('xl')]: {
            px: 2,
          },
        })}
      >
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('locationManagement.assemblyCode')}
                value={
                  locationDetails?.locations?.find(
                    (i) => i?.level === WAREHOUSE_LAYOUTS.ASSEMBLY,
                  )?.code
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('locationManagement.drawerCode')}
                value={
                  locationDetails?.locations?.find(
                    (i) => i?.level === WAREHOUSE_LAYOUTS.DRAWER,
                  )?.code
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('locationManagement.shelfCode')}
                value={
                  locationDetails?.locations?.find(
                    (i) => i?.level === WAREHOUSE_LAYOUTS.SHELF,
                  )?.code
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('locationManagement.binCode')}
                value={
                  locationDetails?.locations?.find(
                    (i) => i?.level === WAREHOUSE_LAYOUTS.BIN,
                  )?.code
                }
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Box sx={{ mt: 3 }}>
        <ItemsSettingTable mode={MODAL_MODE.DETAIL} />
      </Box>
      <ActionBar onBack={backToList} />
    </Page>
  )
}

export default LocationManagementDetail
