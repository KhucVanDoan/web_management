import React, { useEffect } from 'react'

import { Grid, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import TextField from '~/components/TextField'
import { DEFAULT_UNITS, WEIGHT_UNITS } from '~/modules/wmsx/constants/index'
import useDefineWarehousePallet from '~/modules/wmsx/redux/hooks/useDefineWarehousePallet'
import { ROUTE } from '~/modules/wmsx/routes/config'

const DefineWarehousePalletDetail = () => {
  const history = useHistory()
  const { t } = useTranslation(['wmsx'])
  const { id } = useParams()

  const breadcrumbs = [
    {
      title: ROUTE.WAREHOUSE_SETUP.TITLE,
    },
    {
      route: ROUTE.WAREHOUSE_PALLET.LIST.PATH,
      title: ROUTE.WAREHOUSE_PALLET.LIST.TITLE,
    },
    {
      route: ROUTE.WAREHOUSE_PALLET.DETAIL.PATH,
      title: ROUTE.WAREHOUSE_PALLET.DETAIL.TITLE,
    },
  ]
  const backToList = () => {
    history.push(ROUTE.WAREHOUSE_PALLET.LIST.PATH)
  }
  const {
    data: { defineWarehousePalletDetail, isLoading },
    actions,
  } = useDefineWarehousePallet()

  useEffect(() => {
    actions.getDefineWarehousePalletById(id)
    return () => actions.resetStateWarehousePallet()
  }, [id])
  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.defineWarehousePalletDetail')}
      loading={isLoading}
      onBack={backToList}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineWarehousePallet.code')}
                value={defineWarehousePalletDetail.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineWarehousePallet.name')}
                value={defineWarehousePalletDetail?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineWarehousePallet.warehouseShelf')}
                value={defineWarehousePalletDetail?.warehouseShelf?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineWarehousePallet.warehouseArea')}
                value={defineWarehousePalletDetail?.warehouseSector?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineWarehousePallet.warehouse')}
                value={defineWarehousePalletDetail?.warehouse?.name}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h4" component="span">
                {t('defineWarehousePallet.storageSpace')}
              </Typography>
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineWarehousePallet.long')}
                value={`${defineWarehousePalletDetail?.long?.value}  ${
                  DEFAULT_UNITS?.find(
                    (x) => x.id === defineWarehousePalletDetail?.long?.unit,
                  )?.name
                }`}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineWarehousePallet.width')}
                value={`${defineWarehousePalletDetail?.width?.value} ${
                  DEFAULT_UNITS?.find(
                    (x) => x.id === defineWarehousePalletDetail?.width?.unit,
                  )?.name
                }`}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineWarehousePallet.height')}
                value={`${defineWarehousePalletDetail?.height?.value} ${
                  DEFAULT_UNITS?.find(
                    (x) => x.id === defineWarehousePalletDetail?.height?.unit,
                  )?.name
                }`}
              />
            </Grid>

            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineWarehousePallet.load')}
                value={`${
                  defineWarehousePalletDetail?.weightLoad?.value
                    ? defineWarehousePalletDetail?.weightLoad?.value
                    : ''
                }  ${
                  WEIGHT_UNITS?.find(
                    (x) =>
                      x.id === defineWarehousePalletDetail?.weightLoad?.unit,
                  )?.name
                    ? WEIGHT_UNITS?.find(
                        (x) =>
                          x.id ===
                          defineWarehousePalletDetail?.weightLoad?.unit,
                      )?.name
                    : ''
                } `}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('defineWarehousePallet.description')}
                multiline
                rows={3}
                value={defineWarehousePalletDetail.description}
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

export default DefineWarehousePalletDetail
