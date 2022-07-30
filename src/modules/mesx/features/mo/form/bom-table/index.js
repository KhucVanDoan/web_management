import { Box, IconButton, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import Icon from '~/components/Icon'
import TableCollapse from '~/components/TableCollapse'

function BomTable(props) {
  const { BOMStructure } = props
  const { t } = useTranslation(['mesx'])

  const getColumns = [
    {
      field: 'id',
      headerName: t('Mo.item.orderNumber'),
      width: 50,
      align: 'center',
      renderCell: (params) => {
        const { row } = params
        return row?.bom?.id
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
      field: 'multiler',
      headerName: t('Mo.item.multiler'),
      width: 50,
      align: 'center',
    },
    {
      field: 'planQuantity',
      headerName: t('Mo.item.planQuantity'),
      width: 50,
      align: 'center',
    },
    {
      field: 'remainningQuantity',
      headerName: t('Mo.item.remainingQuantity'),
      width: 50,
      align: 'center',
      renderCell: (params) => {
        return Number(params.row?.item?.remainingQuantity)
      },
    },
    {
      field: 'remainningMinQuantity',
      headerName: t('Mo.item.remainingMinQuantity'),
      width: 50,
      align: 'center',
    },
    {
      field: 'planningQuantity',
      headerName: t('Mo.item.planningQuantity'),
      width: 50,
      align: 'center',
      renderCell: (params) => {
        return Number(params.row?.item?.planningQuantity)
      },
    },
    {
      field: 'manufactureQuantity',
      headerName: t('Mo.item.needInputQuantity'),
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
          {t('Mo.bom')}
        </Typography>
      </Box>
      <TableCollapse
        rows={BOMStructure}
        columns={getColumns}
        producingStepColumns={[]} // @TODO: <linh.taquang> convert BOM
        isRoot={true}
        isView={true}
        hideSetting
        hideFooter
      />
    </>
  )
}

export default BomTable
