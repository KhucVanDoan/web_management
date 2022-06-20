import { useEffect } from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import LabelValue from '~/components/LabelValue'
import Page from '~/components/Page'
import useInventoryLimit from '~/modules/wmsx/redux/hooks/useInvetoryLimit'
import { ROUTE } from '~/modules/wmsx/routes/config'
const breadcrumbs = [
  {
    title: ROUTE.SETTING.TITLE,
  },
  {
    route: ROUTE.INVENTORY_LIMIT.LIST.PATH,
    title: ROUTE.INVENTORY_LIMIT.LIST.TITLE,
  },
  {
    route: ROUTE.INVENTORY_LIMIT.DETAIL.PATH,
    title: ROUTE.INVENTORY_LIMIT.DETAIL.TITLE,
  },
]
function InventoryLimitDetail() {
  const history = useHistory()
  const { id } = useParams()
  const { t } = useTranslation(['wmsx'])
  const {
    data: { isLoading, inventoryLimitDetails },
    actions,
  } = useInventoryLimit()

  useEffect(() => {
    actions.getInventoryLimitDetailsById(id)
    return () => actions.resetInventoryLimitState()
  }, [id])
  const backToList = () => {
    history.push(ROUTE.INVENTORY_LIMIT.LIST.PATH)
  }
  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.inventoryLimitDetails')}
      loading={isLoading}
      onBack={backToList}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container columnSpacing={{ xl: 8, xs: 4 }} rowSpacing={4 / 3}>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('inventoryLimit.itemCode')}
                value={inventoryLimitDetails?.item?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('inventoryLimit.itemName')}
                value={inventoryLimitDetails?.item?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('inventoryLimit.itenUnit')}
                value={inventoryLimitDetails?.item?.itemUnit?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('inventoryLimit.itemType')}
                value={inventoryLimitDetails?.item?.itemType?.name}
              />
            </Grid>
            <Grid item xs={12}>
              <LabelValue
                label={t('inventoryLimit.inventoryLimitDown')}
                value={inventoryLimitDetails?.minInventoryLimit}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('inventoryLimit.inventoryLimitUp')}
                value={inventoryLimitDetails?.maxInventoryLimit}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('inventoryLimit.inventoryLimit')}
                value={inventoryLimitDetails?.inventoryLimit}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue label={t('inventoryLimit.durationStorage')}>
                {inventoryLimitDetails?.expiryWarehouse} {t('general:days')}
              </LabelValue>
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue label={t('inventoryLimit.warningStorage')}>
                {inventoryLimitDetails?.expiryWarningWarehouse}{' '}
                {t('general:days')}
              </LabelValue>
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('inventoryLimit.durationLife')}
                value={inventoryLimitDetails?.expiryWarehouse}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('inventoryLimit.shelfLifeWarning')}
                value={inventoryLimitDetails?.expiryWarningWarehouse}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <ActionBar onBack={backToList} />
    </Page>
  )
}
export default InventoryLimitDetail
