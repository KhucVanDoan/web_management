import React, { useMemo } from 'react'

import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import DataTable from '~/components/DataTable'

const ItemWarehouseTable = ({ items }) => {
  const { t } = useTranslation(['wmsx'])

  const getColumns = useMemo(
    () => [
      {
        field: 'itemId',
        headerName: t('warehouseReport.itemId'),
        width: 50,
      },
      {
        field: 'itemName',
        headerName: t('warehouseReport.itemName'),
        width: 150,
      },
      {
        field: 'warehouseId',
        headerName: t('warehouseReport.warehouseId'),
        width: 150,
      },
      {
        field: 'warehouseName',
        headerName: t('warehouseReport.warehouseName'),
        width: 150,
      },
      {
        field: 'stockStart',
        headerName: t('warehouseReport.stockStart'),
        width: 150,
      },
      {
        field: 'stockIn',
        headerName: t('warehouseReport.stockIn'),
        width: 150,
      },
      {
        field: 'stockOut',
        headerName: t('warehouseReport.stockOut'),
        width: 150,
      },
      {
        field: 'stockEnd',
        headerName: t('warehouseReport.stockEnd'),
        width: 150,
      },
      {
        field: 'itemUnit',
        headerName: t('warehouseReport.itemUnit'),
        width: 150,
      },
    ],
    [items],
  )

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
          {t('warehouseReport.warehouseDetail')}
        </Typography>
      </Box>
      <DataTable
        rows={items}
        columns={getColumns}
        total={items.length}
        striped={false}
        hideSetting
        hideFooter
      />
    </>
  )
}

ItemWarehouseTable.defaultProps = {
  items: [],
}

ItemWarehouseTable.propTypes = {
  items: PropTypes.array,
}

export default ItemWarehouseTable
