import { Box, IconButton, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import Icon from '~/components/Icon'
import TableCollapse from '~/components/TableCollapse'

function PriceTable(props) {
  const { PriceStructure } = props
  const { t } = useTranslation(['mesx'])
  const getColumns = [
    {
      field: 'id',
      headerName: t('Mo.item.orderNumber'),
      width: 50,
      align: 'center',
      renderCell: (params) => {
        const { row } = params
        return row?.id
      },
    },
    {
      field: 'code',
      headerName: t('Mo.item.code'),
      width: 50,
      align: 'center',
      renderCell: (params) => {
        const { row } = params
        return row?.item?.code
      },
    },
    {
      field: 'name',
      headerName: t('Mo.item.name'),
      width: 50,
      align: 'center',
      renderCell: (params) => {
        const { row } = params
        return row?.item?.name
      },
    },
    {
      field: 'type',
      headerName: t('Mo.item.type'),
      width: 50,
      align: 'center',
      renderCell: (params) => {
        const { item } = params.row
        return item?.itemType?.name
      },
    },
    {
      field: 'multiplier',
      headerName: t('Mo.item.multiler'),
      width: 50,
      align: 'center',
    },
    {
      field: 'quantity',
      headerName: t('Mo.item.planQuantity'),
      width: 50,
      align: 'center',
    },
    {
      field: 'unit',
      headerName: t('Mo.item.unit'),
      width: 50,
      align: 'center',
      renderCell: (params) => {
        const { item } = params.row
        return item?.itemUnitName
      },
    },
    {
      field: 'isProduction',
      headerName: t('Mo.item.isProduction'),
      width: 50,
      align: 'center',
      renderCell: (params) => {
        const { item } = params.row
        return item?.isProductionObject ? (
          <IconButton>
            <Icon name="tick" />
          </IconButton>
        ) : null
      },
    },
    {
      field: 'costMaterialActual',
      headerName: t('Mo.item.productionPrice'),
      width: 50,
      align: 'center',
    },
    {
      field: 'costMaterial',
      headerName: t('Mo.item.materialPrice'),
      width: 50,
      align: 'center',
    },
  ]

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography variant="h4" component="span">
          {t('Mo.priceBom')}
        </Typography>
      </Box>
      <TableCollapse
        rows={PriceStructure}
        columns={getColumns}
        isRoot={true}
        isView={true}
        hideSetting
        hideFooter
      />
    </>
  )
}

export default PriceTable
