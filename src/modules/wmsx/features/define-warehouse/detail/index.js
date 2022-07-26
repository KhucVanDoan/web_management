import { useEffect, useState } from 'react'

import { Grid, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import Button from '~/components/Button'
import Dialog from '~/components/Dialog'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import TextField from '~/components/TextField'
import { DEFAULT_UNITS_MAP } from '~/modules/wmsx/constants'
import useDefineWarehouse from '~/modules/wmsx/redux/hooks/useDefineWarehouse'
import { ROUTE } from '~/modules/wmsx/routes/config'
const breadcrumbs = [
  {
    title: ROUTE.WAREHOUSE_SETUP.TITLE,
  },
  {
    route: ROUTE.DEFINE_WAREHOUSE.LIST.PATH,
    title: ROUTE.DEFINE_WAREHOUSE.LIST.TITLE,
  },
  {
    route: ROUTE.DEFINE_WAREHOUSE.DETAIL.PATH,
    title: ROUTE.DEFINE_WAREHOUSE.DETAIL.TITLE,
  },
]
function DefineWarehouseDetail() {
  const history = useHistory()
  const { id } = useParams()
  const { t } = useTranslation(['wmsx'])
  const {
    data: { warehouseDetails, isLoading },
    actions,
  } = useDefineWarehouse()

  const [deleteModal, setDeleteModal] = useState(false)

  useEffect(() => {
    actions.getWarehouseDetailsById(id)
    return () => actions.resetWarehouseState()
  }, [id])

  const backToList = () => {
    history.push(ROUTE.DEFINE_WAREHOUSE.LIST.PATH)
  }

  const onSubmitDelete = () => {
    actions.deleteWarehouse(id, backToList)
    setDeleteModal(false)
  }

  const renderActionBar = () => {
    return (
      <ActionBar>
        <Button color="grayF4" onClick={backToList}>
          {t('general:actionBar.back')}
        </Button>
        {/* @TODO: <linh.taquang> handle button detail warehouse */}
        <Button
          variant="outlined"
          color="subText"
          onClick={() => setDeleteModal(true)}
        >
          {t('defineWarehouse.delete')}
        </Button>
        <Button variant="outlined" color="subText" disabled onClick={() => {}}>
          {t('defineWarehouse.design')}
        </Button>
      </ActionBar>
    )
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.defineWarehouseDetail')}
      loading={isLoading}
      onBack={backToList}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container columnSpacing={{ xl: 8, xs: 4 }} rowSpacing={4 / 3}>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineWarehouse.code')}
                value={warehouseDetails.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineWarehouse.name')}
                value={warehouseDetails.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineWarehouse.type')}
                value={warehouseDetails?.warehouseTypeSettings
                  ?.map((i) => i?.name)
                  .join(', ')}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineWarehouse.factory')}
                value={warehouseDetails?.factory?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineWarehouse.company')}
                value={warehouseDetails.company?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineWarehouse.address')}
                value={warehouseDetails.location}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('defineWarehouse.description')}
                multiline
                rows={3}
                readOnly
                sx={{
                  'label.MuiFormLabel-root': {
                    color: (theme) => theme.palette.subText.main,
                  },
                }}
                value={warehouseDetails.description}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h4" mt={1}>
                {t('defineWarehouse.storageSpace')}
              </Typography>
            </Grid>
            <Grid item xs={12} lg={6}>
              <LV
                label={t('defineWarehouse.long')}
                value={
                  warehouseDetails?.long?.value +
                  ' ' +
                  t(DEFAULT_UNITS_MAP[warehouseDetails?.long?.unit])
                }
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <LV
                label={t('defineWarehouse.height')}
                value={
                  warehouseDetails?.height?.value +
                  ' ' +
                  t(DEFAULT_UNITS_MAP[warehouseDetails?.height?.unit])
                }
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <LV
                label={t('defineWarehouse.width')}
                value={
                  warehouseDetails?.width?.value +
                  ' ' +
                  t(DEFAULT_UNITS_MAP[warehouseDetails?.width?.unit])
                }
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {renderActionBar()}
      <Dialog
        open={deleteModal}
        title={t('defineWarehouse.deleteTitle')}
        onCancel={() => setDeleteModal(false)}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitDelete}
        submitLabel={t('general:common.yes')}
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('defineWarehouse.confirmDelete')}
      </Dialog>
    </Page>
  )
}

export default DefineWarehouseDetail
