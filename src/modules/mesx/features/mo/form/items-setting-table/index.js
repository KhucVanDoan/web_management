import React, { useEffect, useState } from 'react'

import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { useTranslation } from 'react-i18next'

import DataTable from '~/components/DataTable'

const ItemsSettingTable = (props) => {
  const { t } = useTranslation(['mesx'])
  const [items, setItems] = useState([])
  const [pageSize] = useState(20)
  const [page] = useState(1)
  const [selectedRows, setSelectedRows] = useState([])

  const columns = [
    {
      field: 'id',
      headerName: t('Mo.item.code'),
      width: 50,
      sortable: false,
      filterable: false,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'itemName',
      headerName: t('Mo.item.name'),
      width: 150,
      sortable: false,
      filterable: false,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'quantity',
      headerName: t('Mo.item.quantity'),
      width: 100,
      sortable: false,
      filterable: false,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'itemUnitName',
      headerName: t('Mo.item.unitType'),
      width: 100,
      sortable: false,
      filterable: false,
      align: 'center',
      headerAlign: 'center',
    },
  ]

  useEffect(() => {
    const itemsInSaleOrder = props.saleOrder?.itemSchedules || []
    setItems(getItemsInTable(itemsInSaleOrder))
  }, [props.saleOrder])

  const getItemsInTable = (listItem) => {
    let itemsInSaleOrder = []
    listItem.forEach((item, index) => {
      itemsInSaleOrder.concat(getItemsInTable(item.subBom))
      itemsInSaleOrder.push({
        id: item.itemId,
        index,
        itemName: item.itemName,
        itemUnitName: item.itemUnitName,
        quantity: item.quantity,
      })
    })

    return itemsInSaleOrder
  }

  const onChangeSelectedRows = (selected) => {
    setSelectedRows([...selected])
    props.updateSelectedItems(selected.map((item) => item.id))
  }

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
          {t('Mo.itemDetails')}
        </Typography>
      </Box>
      <DataTable
        columns={columns}
        rows={items}
        hideFooter
        hideSetting
        pageSize={pageSize}
        page={page}
        checkboxSelection
        selected={selectedRows}
        onChangeSelectedRows={onChangeSelectedRows}
      />
    </>
  )
}

export default ItemsSettingTable
