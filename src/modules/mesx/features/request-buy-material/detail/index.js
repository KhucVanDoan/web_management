import { useEffect } from 'react'

import { Box, Grid, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

import { useApp } from '~/common/hooks/useApp'
import ActionBar from '~/components/ActionBar'
import DataTable from '~/components/DataTable'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TextField from '~/components/TextField'
import { ORDER_STATUS_OPTIONS } from '~/modules/mesx/constants'
import useRequestBuyMaterial from '~/modules/mesx/redux/hooks/useRequestBuyMaterial'
import { ROUTE } from '~/modules/mesx/routes/config'
import { convertUtcDateTimeToLocalTz } from '~/utils'

const breadcrumbs = [
  {
    title: 'plan',
  },
  {
    route: ROUTE.REQUEST_BUY_MATERIAL.LIST.PATH,
    title: ROUTE.REQUEST_BUY_MATERIAL.LIST.TITLE,
  },
  {
    title: ROUTE.REQUEST_BUY_MATERIAL.DETAIL.TITLE,
    route: ROUTE.REQUEST_BUY_MATERIAL.DETAIL.PATH,
  },
]

function RequestBuyMaterialDetail() {
  const { t } = useTranslation(['mesx'])
  const { id } = useParams()
  const history = useHistory()
  const { refreshKey, clearRefreshKey } = useApp()

  const {
    data: { isLoading, requestBuyMaterialDetails },
    actions,
  } = useRequestBuyMaterial()
  const backToList = () => {
    history.push(ROUTE.REQUEST_BUY_MATERIAL.LIST.PATH)
  }

  useEffect(() => {
    actions.getRequestBuyMaterialDetailsById(id)

    return () => {
      actions.resetRequestBuyMaterialState()
    }
  }, [id])

  useEffect(() => {
    if (refreshKey) {
      if (id === refreshKey.toString()) {
        actions.getRequestBuyMaterialDetailsById(id)
      }

      clearRefreshKey()
    }
  }, [refreshKey, id])

  const getColumns = () => [
    {
      field: 'id',
      headerName: '#',
      width: 80,
      align: 'center',
      renderCell: (_, index) => {
        return index + 1
      },
    },
    {
      field: 'code',
      headerName: t('requestBuyMaterial.item.code'),
      width: 180,
      align: 'center',
    },
    {
      field: 'name',
      headerName: t('requestBuyMaterial.item.name'),
      width: 180,
      align: 'center',
    },
    {
      field: 'unitType',
      headerName: t('requestBuyMaterial.item.type'),
      width: 180,
      align: 'center',
      renderCell: (params) => {
        const { itemType } = params.row
        return itemType?.name
      },
    },
    {
      field: 'quantity',
      headerName: t('requestBuyMaterial.item.quantity'),
      width: 180,
      align: 'center',
    },
    {
      field: 'itemUnit',
      headerName: t('requestBuyMaterial.item.unitType'),
      width: 180,
      align: 'center',
      renderCell: (params) => {
        const { itemUnit } = params.row
        return itemUnit?.name
      },
    },
  ]

  return (
    <>
      <Page
        breadcrumbs={breadcrumbs}
        title={t('menu.requestBuyMaterialDetails')}
        loading={isLoading}
        onBack={backToList}
      >
        <Grid container justifyContent="center">
          <Grid item xl={11} xs={12}>
            <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
              <Grid item xs={12}>
                <LV
                  label={t('requestBuyMaterial.status')}
                  value={
                    <Status
                      options={ORDER_STATUS_OPTIONS}
                      value={requestBuyMaterialDetails?.status}
                    />
                  }
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('requestBuyMaterial.requestCode')}
                  value={requestBuyMaterialDetails?.code}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('requestBuyMaterial.requestName')}
                  value={requestBuyMaterialDetails?.name}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                {/* @TODO: <linh.taquang> waiting BE return planCode */}
                <LV
                  label={t('requestBuyMaterial.moCode')}
                  value={requestBuyMaterialDetails?.manufacturingOrder?.code}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                {/* @TODO: <linh.taquang> waiting BE return planName */}
                <LV
                  label={t('requestBuyMaterial.moName')}
                  value={requestBuyMaterialDetails?.manufacturingOrder?.name}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV label={t('requestBuyMaterial.plan')}>
                  {convertUtcDateTimeToLocalTz(
                    requestBuyMaterialDetails?.manufacturingOrder?.planFrom,
                  )}
                  {' - '}
                  {convertUtcDateTimeToLocalTz(
                    requestBuyMaterialDetails?.manufacturingOrder?.planTo,
                  )}
                </LV>
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('requestBuyMaterial.factory')}
                  value={requestBuyMaterialDetails?.factory?.name}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV label={t('requestBuyMaterial.deadline')}>
                  {convertUtcDateTimeToLocalTz(
                    requestBuyMaterialDetails?.planFrom,
                  )}
                  {' - '}
                  {convertUtcDateTimeToLocalTz(
                    requestBuyMaterialDetails?.planTo,
                  )}
                </LV>
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('requestBuyMaterial.soName')}
                  value={requestBuyMaterialDetails?.saleOrder?.name}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('requestBuyMaterial.userCreate')}
                  value={requestBuyMaterialDetails?.createdBy?.username}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('requestBuyMaterial.createAt')}
                  value={convertUtcDateTimeToLocalTz(
                    requestBuyMaterialDetails?.createdAt,
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="description"
                  label={t('requestBuyMaterial.descriptionInput')}
                  multiline
                  value={requestBuyMaterialDetails?.description}
                  rows={3}
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
        <Box sx={{ mt: 3 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <Typography variant="h4">
              {t('requestBuyMaterial.itemsDetails')}
            </Typography>
          </Box>
          <DataTable
            rows={requestBuyMaterialDetails?.itemDetails}
            columns={getColumns()}
            total={requestBuyMaterialDetails?.itemDetails?.length}
            hideSetting
            hideFooter
            striped={false}
          />
        </Box>
        <ActionBar onBack={backToList} />
      </Page>
    </>
  )
}

export default RequestBuyMaterialDetail
