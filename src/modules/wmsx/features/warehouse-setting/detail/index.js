import React, { useEffect } from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import TextField from '~/components/TextField'
import { useWarehouseSetting } from '~/modules/wmsx/redux/hooks/useWarehouseSetting'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertUtcDateTimeToLocalTz } from '~/utils'
const WarehouseSettingDetail = () => {
  const history = useHistory()
  const { t } = useTranslation(['wmsx'])
  const { id } = useParams()

  const breadcrumbs = [
    {
      title: 'warehouseSetup',
    },
    {
      route: ROUTE.WAREHOUSE_SETTING.DETAIL.PATH,
      title: ROUTE.WAREHOUSE_SETTING.DETAIL.TITLE,
    },
  ]
  const backToList = () => {
    history.push(ROUTE.WAREHOUSE_SETTING.LIST.PATH)
  }
  const {
    data: { warehouseSettingDetails, isLoading },
    actions,
  } = useWarehouseSetting()
  useEffect(() => {
    actions.getWarehouseSettingDetailsById(id)
    return () => actions.resetWarehouseSettingState()
  }, [id])
  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.warehouseDetail')}
      loading={isLoading}
      onBack={backToList}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseSetting.code')}
                value={warehouseSettingDetails.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseSetting.createdAt')}
                value={convertUtcDateTimeToLocalTz(
                  warehouseSettingDetails.createdAt,
                )}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseSetting.name')}
                value={warehouseSettingDetails.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseSetting.updatedAt')}
                value={convertUtcDateTimeToLocalTz(
                  warehouseSettingDetails.updatedAt,
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('warehouseSetting.description')}
                multiline
                rows={3}
                value={warehouseSettingDetails.description}
                readOnly
                sx={{
                  'label.MuiFormLabel-root': {
                    color: (theme) => theme.palette.subText.main,
                  },
                }}
              />
            </Grid>
          </Grid>
          <ActionBar onBack={backToList} />
        </Grid>
      </Grid>
    </Page>
  )
}

export default WarehouseSettingDetail
