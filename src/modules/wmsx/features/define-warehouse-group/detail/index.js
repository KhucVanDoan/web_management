import React, { useEffect } from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TextField from '~/components/TextField'
import { ACTIVE_STATUS_OPTIONS } from '~/modules/wmsx/constants'
import useDefineWarehouseGroup from '~/modules/wmsx/redux/hooks/useDefineWarehouseGroup'
import { ROUTE } from '~/modules/wmsx/routes/config'

const breadcrumbs = [
  {
    title: ROUTE.WAREHOUSE_MANAGEMENT.TITLE,
  },
  {
    route: ROUTE.DEFINE_WAREHOUSE_GROUP.LIST.PATH,
    title: ROUTE.DEFINE_WAREHOUSE_GROUP.LIST.TITLE,
  },
  {
    route: ROUTE.DEFINE_WAREHOUSE_GROUP.DETAIL.PATH,
    title: ROUTE.DEFINE_WAREHOUSE_GROUP.DETAIL.TITLE,
  },
]

function DefineWarehouseGroupDetail() {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const { id } = useParams()
  const {
    data: { isLoading, warehouseGroupDetails },
    actions,
  } = useDefineWarehouseGroup()

  useEffect(() => {
    actions.getWarehouseGroupDetailsById(id)
    return () => {
      actions.resetWarehouseGroupDetailsState()
    }
  }, [id])

  const backToList = () => {
    history.push(ROUTE.DEFINE_WAREHOUSE_GROUP.LIST.PATH)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.defineWarehouseGroupDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item xs={12}>
              <LV
                label={t('defineWarehouseGroup.status')}
                value={
                  <Status
                    options={ACTIVE_STATUS_OPTIONS}
                    value={warehouseGroupDetails?.status}
                  />
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineWarehouseGroup.code')}
                value={warehouseGroupDetails?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineWarehouseGroup.name')}
                value={warehouseGroupDetails?.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('defineWarehouseGroup.description')}
                multiline
                rows={3}
                value={warehouseGroupDetails?.description}
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

export default DefineWarehouseGroupDetail
