import { Box, IconButton, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import Icon from '~/components/Icon'
import TableCollapse from '~/components/TableCollapse'

function BomProducingStepTable(props) {
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
    },
    {
      field: 'needInputQuantity',
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

  const producingStepColumns = [
    {
      field: 'producingStepCode',
      headerName: t('Mo.producingStep.producingStepCode'),
      width: 200,
      renderCell: (params) => {
        const { row } = params
        return row?.producingStep?.code
      },
    },
    {
      field: 'producingStepName',
      headerName: t('Mo.producingStep.producingStepName'),
      width: 200,
      renderCell: (params) => {
        const { row } = params
        return row?.producingStep?.name
      },
    },
    {
      field: 'planQuantity',
      headerName: t('Mo.producingStep.planQuantity'),
      width: 200,
    },
    {
      field: 'remainingQuantity',
      headerName: t('Mo.producingStep.remainingQuantity'),
      width: 200,
    },
    {
      field: 'minInventoryLimit',
      headerName: t('Mo.producingStep.remainingMinQuantity'),
      width: 200,
    },
    {
      field: 'planningQuantity',
      headerName: t('Mo.producingStep.planningQuantity'),
      width: 200,
    },
    {
      field: 'inputQuantity',
      headerName: t('Mo.producingStep.inputQuantity'),
      width: 200,
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
          {t('Mo.bomProducingStep')}
        </Typography>
      </Box>
      <TableCollapse
        rows={BOMStructure || []}
        columns={getColumns}
        producingStepColumns={producingStepColumns}
        isRoot={true}
        isView={true}
        hideSetting
        hideFooter
      />
    </>
  )
}
export default BomProducingStepTable
