import React, { useEffect } from 'react'

import { Grid, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import TextField from '~/components/TextField'
import { SPACE_UNITS } from '~/modules/wmsx/constants'
import useDefineWarehouse from '~/modules/wmsx/redux/hooks/useDefineWarehouse'
import useWarehouseArea from '~/modules/wmsx/redux/hooks/useWarehouseArea'
import { ROUTE } from '~/modules/wmsx/routes/config'

const WarehouseAreaDetail = () => {
  const history = useHistory()
  const { t } = useTranslation(['wmsx'])
  const { id } = useParams()

  const breadcrumbs = [
    {
      title: ROUTE.WAREHOUSE_SETUP.TITLE,
    },
    {
      route: ROUTE.WAREHOUSE_AREA.LIST.PATH,
      title: ROUTE.WAREHOUSE_AREA.LIST.TITLE,
    },
    {
      route: ROUTE.WAREHOUSE_AREA.DETAIL.PATH,
      title: ROUTE.WAREHOUSE_AREA.DETAIL.TITLE,
    },
  ]
  const backToList = () => {
    history.push(ROUTE.WAREHOUSE_AREA.LIST.PATH)
  }
  const {
    data: { warehouseAreaDetails, isLoading },
    actions,
  } = useWarehouseArea()

  const {
    data: { warehouseDetails },
    actions: defineWarehouseAction,
  } = useDefineWarehouse()

  useEffect(() => {
    actions.getWarehouseAreaDetailById(id, (res) => {
      defineWarehouseAction.getWarehouseDetailsById(res?.warehouseId)
    })
    return () => actions.resetWarehouseAreaState()
  }, [id])
  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.warehouseAreaDetail')}
      loading={isLoading}
      onBack={backToList}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseArea.code')}
                value={warehouseAreaDetails.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseArea.name')}
                value={warehouseAreaDetails?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseArea.warehouseName')}
                value={warehouseDetails?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseArea.factoryName')}
                value={warehouseDetails?.factory?.name}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h4" component="span">
                {t('warehouseArea.storageSpace.title')}
              </Typography>
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseArea.storageSpace.long')}
                value={`${warehouseAreaDetails?.long?.value}  ${
                  SPACE_UNITS?.find(
                    (x) => x.id === warehouseAreaDetails?.long?.unit,
                  )?.name
                }`}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseArea.storageSpace.width')}
                value={`${warehouseAreaDetails?.width?.value} ${
                  SPACE_UNITS?.find(
                    (x) => x.id === warehouseAreaDetails?.width?.unit,
                  )?.name
                }`}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseArea.storageSpace.height')}
                value={`${warehouseAreaDetails?.height?.value} ${
                  SPACE_UNITS?.find(
                    (x) => x.id === warehouseAreaDetails?.height?.unit,
                  )?.name
                }`}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('warehouseArea.description')}
                multiline
                rows={3}
                value={warehouseAreaDetails.description}
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

export default WarehouseAreaDetail
