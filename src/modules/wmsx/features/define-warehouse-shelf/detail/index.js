import React, { useEffect } from 'react'

import { Grid, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import TextField from '~/components/TextField'
import { DEFAULT_UNITS, WEIGHT_UNITS } from '~/modules/wmsx/constants/index'
import useDefineWarehouseShelf from '~/modules/wmsx/redux/hooks/useDefineWarehouseShelf'
import { ROUTE } from '~/modules/wmsx/routes/config'

const DefineWarehouseShelfDetail = () => {
  const history = useHistory()
  const { t } = useTranslation(['wmsx'])
  const { id } = useParams()

  const breadcrumbs = [
    {
      title: ROUTE.WAREHOUSE_SETUP.TITLE,
    },
    {
      route: ROUTE.WAREHOUSE_SHELF.LIST.PATH,
      title: ROUTE.WAREHOUSE_SHELF.LIST.TITLE,
    },
    {
      route: ROUTE.WAREHOUSE_SHELF.DETAIL.PATH,
      title: ROUTE.WAREHOUSE_SHELF.DETAIL.TITLE,
    },
  ]
  const backToList = () => {
    history.push(ROUTE.WAREHOUSE_SHELF.LIST.PATH)
  }
  const {
    data: { defineWarehouseShelfDetail, isLoading },
    actions,
  } = useDefineWarehouseShelf()

  useEffect(() => {
    actions.getDefineWarehouseShelfById(id)
    return () => actions.resetStateWarehouseShelf()
  }, [id])
  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.defineWarehouseShelfDetail')}
      loading={isLoading}
      onBack={backToList}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineWarehouseShelf.code')}
                value={defineWarehouseShelfDetail.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineWarehouseShelf.name')}
                value={defineWarehouseShelfDetail?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineWarehouseShelf.warehouse')}
                value={defineWarehouseShelfDetail?.warehouse?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineWarehouseShelf.warehouseArea')}
                value={defineWarehouseShelfDetail?.warehouseSector?.name}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h4" component="span">
                {t('defineWarehouseShelf.storageSpace')}
              </Typography>
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineWarehouseShelf.long')}
                value={`${defineWarehouseShelfDetail?.long?.value}  ${
                  DEFAULT_UNITS?.find(
                    (x) => x.id === defineWarehouseShelfDetail?.long?.unit,
                  )?.name
                }`}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineWarehouseShelf.width')}
                value={`${defineWarehouseShelfDetail?.width?.value} ${
                  DEFAULT_UNITS?.find(
                    (x) => x.id === defineWarehouseShelfDetail?.width?.unit,
                  )?.name
                }`}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineWarehouseShelf.height')}
                value={`${defineWarehouseShelfDetail?.height?.value} ${
                  DEFAULT_UNITS?.find(
                    (x) => x.id === defineWarehouseShelfDetail?.height?.unit,
                  )?.name
                }`}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineWarehouseShelf.load')}
                value={`${
                  defineWarehouseShelfDetail?.weightLoad?.value
                    ? defineWarehouseShelfDetail?.weightLoad?.value
                    : ''
                }  ${
                  WEIGHT_UNITS?.find(
                    (x) =>
                      x.id === defineWarehouseShelfDetail?.weightLoad?.unit,
                  )?.name
                    ? WEIGHT_UNITS?.find(
                        (x) =>
                          x.id === defineWarehouseShelfDetail?.weightLoad?.unit,
                      )?.name
                    : ''
                } `}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('defineWarehouseShelf.description')}
                multiline
                rows={3}
                value={defineWarehouseShelfDetail.description}
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

export default DefineWarehouseShelfDetail
