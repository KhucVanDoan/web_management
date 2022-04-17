import { useEffect, useState } from 'react'

import { Grid, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import TableCollapse from '~/components/TableCollapse'
import { useAppStore } from '~/modules/auth/redux/hooks/useAppStore'
import { useMo } from '~/modules/mesx/redux/hooks/useMo'
import { ROUTE } from '~/modules/mesx/routes/config'

const breadcrumbs = [
  {
    title: 'database',
  },
  {
    route: ROUTE.PRICE_REPORT.LIST.PATH,
    title: ROUTE.PRICE_REPORT.LIST.TITLE,
  },
  {
    route: ROUTE.PRICE_REPORT.DETAIL.PATH,
    title: ROUTE.PRICE_REPORT.DETAIL.TITLE,
  },
]

const PriceDetail = () => {
  const { t } = useTranslation(['mesx'])
  const history = useHistory()
  const { id } = useParams()
  const [priceReport, setPriceReport] = useState([])

  const {
    appStore: { itemTypes },
    actions,
  } = useAppStore()
  const { actions: actionMo } = useMo()
  useEffect(() => {
    actions.getAppStore()

    actionMo.getPriceStructureById(id, (res) => {
      setPriceReport(res)
    })
  }, [id])

  const backToList = () => {
    history.push(ROUTE.PRICE_REPORT.LIST.PATH)
  }

  const columns = [
    {
      field: 'id',
      headerName: '#',
      width: 80,
      sortable: false,
      align: 'center',
    },
    {
      field: 'itemName',
      headerName: t('priceDetail.itemName'),
      width: 200,
      sortable: false,
      align: 'center',
      renderCell: (params) => {
        const { item } = params?.row
        return item?.name
      },
    },
    {
      field: 'itemType',
      headerName: t('priceDetail.itemType'),
      width: 200,
      sortable: false,
      align: 'center',
      renderCell: (params) => {
        const { item } = params?.row
        return itemTypes.find((type) => type.id === item.itemTypeId)?.name
      },
    },
    {
      field: 'multiplier',
      headerName: t('priceDetail.bomRatio'),
      width: 150,
      sortable: false,
      align: 'center',
    },
    {
      field: 'unit',
      headerName: t('priceDetail.unit'),
      width: 120,
      sortable: false,
      align: 'center',
      renderCell: (params) => {
        const { item } = params?.row
        return item?.itemUnitName
      },
    },
    {
      field: 'costProducing',
      headerName: t('priceDetail.planProductionPrice'),
      width: 200,
      sortable: false,
      align: 'center',
    },
    {
      field: 'costProducingActual',
      headerName: t('priceDetail.actualProductionPrice'),
      width: 200,
      sortable: false,
      align: 'center',
    },
    {
      field: 'costMaterial',
      headerName: t('priceDetail.planMaterialPrice'),
      width: 250,
      sortable: false,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'costMaterialActual',
      headerName: t('priceDetail.actualMaterialPrice'),
      width: 250,
      sortable: false,
      align: 'center',
      headerAlign: 'center',
    },
  ]
  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t(`menu.priceDetail`)}
      onBack={backToList}
    >
      <Grid container mb={3}>
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item xs={12} lg={6}>
              <LV
                label={t('priceReport.productName')}
                value={priceReport[0]?.item?.name}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <LV
                label={t('priceReport.productionQuantity')}
                value={priceReport[0]?.actualQuantity}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Typography variant="h4" component="span" mb={2}>
        {t('priceDetail.pricePerItem')}
      </Typography>
      <TableCollapse
        rows={priceReport}
        columns={columns}
        isRoot={true}
        isView={true}
        hideSetting
      />
    </Page>
  )
}
export default PriceDetail
