import { useEffect } from 'react'

import { Box, Grid } from '@mui/material'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import LabelValue from '~/components/LabelValue'
import Page from '~/components/Page'
import TextField from '~/components/TextField'
import useDefineFactory from '~/modules/mesx/redux/hooks/useDefineFactory'
import useWarehouseReport from '~/modules/wmsx/redux/hooks/useWarehouseReport'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertUtcDateToLocalTz } from '~/utils'

import ItemWarehouseTable from '../items-warehouse-table'
const breadcrumbs = [
  {
    title: ROUTE.WAREHOUSE_REPORT_MANAGEMENT.TITLE,
  },
  {
    route: ROUTE.WAREHOUSE_REPORT.LIST.PATH,
    title: ROUTE.WAREHOUSE_REPORT.LIST.TITLE,
  },
  {
    route: ROUTE.WAREHOUSE_REPORT.DETAIL.PATH,
    title: ROUTE.WAREHOUSE_REPORT.DETAIL.TITLE,
  },
]
function warehouseReportDetail() {
  const history = useHistory()
  const { id } = useParams()
  const { t } = useTranslation(['wmsx'])
  const {
    data: { warehouseReportDetails, isLoading },
    actions,
  } = useWarehouseReport()

  const {
    data: { factoryList },
    actions: actionFactory,
  } = useDefineFactory()

  useEffect(() => {
    actions.getWarehouseReportDetailsById(id)
    actionFactory.searchFactories({ isGetAll: 1 })
    return () => actions.resetWarehouseReportState()
  }, [id])

  const backToList = () => {
    history.push(ROUTE.WAREHOUSE_REPORT.LIST.PATH)
  }

  const genFactoryName = () => {
    const factoryIds =
      warehouseReportDetails?.warehouses
        ?.map((item) => item.factoryId)
        ?.filter((value, index, self) => index === self.indexOf(value)) || []
    return factoryList
      .reduce((acc, cur) => {
        if (factoryIds.includes(cur.id)) return [...acc, cur?.name]
        return acc
      }, [])
      .join(', ')
  }
  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.warehouseReportDetails')}
      loading={isLoading}
      onBack={backToList}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container columnSpacing={{ xl: 8, xs: 4 }} rowSpacing={4 / 3}>
            <Grid item xs={12} lg={6}>
              <LabelValue
                label={t('warehouseReport.code')}
                value={warehouseReportDetails?.code}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <LabelValue
                label={t('warehouseReport.factoryName')}
                value={genFactoryName()}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <LabelValue
                label={t('warehouseReport.periodReport')}
                value={`${convertUtcDateToLocalTz(
                  warehouseReportDetails?.startDate,
                )}-${convertUtcDateToLocalTz(warehouseReportDetails?.endDate)}`}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <LabelValue
                label={t('warehouseReport.name')}
                value={warehouseReportDetails?.name}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <LabelValue
                label={t('warehouseReport.createdBy')}
                value={warehouseReportDetails?.createdBy?.username}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <LabelValue
                label={t('warehouseReport.warehouseName')}
                value={
                  !isEmpty(warehouseReportDetails?.warehouses) &&
                  warehouseReportDetails?.warehouses?.map(
                    (warehouse) => warehouse.name,
                  )
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('warehouseReport.description')}
                placeholder={t('warehouseReport.description')}
                multiline
                readOnly
                rows={3}
                value={warehouseReportDetails.description}
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
        <ItemWarehouseTable
          items={warehouseReportDetails?.reportDetails?.items || []}
        />
      </Box>
      <ActionBar onBack={backToList} />
    </Page>
  )
}

export default warehouseReportDetail
