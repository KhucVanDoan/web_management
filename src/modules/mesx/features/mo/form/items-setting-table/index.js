import React, { useEffect, useState } from 'react'

import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { useTranslation } from 'react-i18next'

import DataTable from '~/components/DataTable'
import { useCommonManagement } from '~/modules/mesx/redux/hooks/useCommonManagement'

const ItemsSettingTable = (props) => {
  const { isView, moDetails } = props
  const { t } = useTranslation(['mesx'])
  const [items, setItems] = useState([])
  const [pageSize] = useState(20)
  const [page] = useState(1)
  const [selectedRows, setSelectedRows] = useState([])

  const {
    data: { itemList },
    actions,
  } = useCommonManagement()

  useEffect(() => {
    actions.getItems({})
  }, [])

  const getItemObject = (id) => {
    return itemList?.find((item) => item?.id === id)
  }

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

  const columnsDetail = [
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
      field: 'itemName',
      headerName: t('Mo.item.name'),
      width: 150,
      align: 'center',
      renderCell: (params) => {
        const { row } = params
        return row?.item?.name
      },
    },
    {
      field: 'quantity',
      headerName: t('Mo.item.quantity'),
      width: 100,
      align: 'center',
    },
    {
      field: 'itemUnitName',
      headerName: t('Mo.item.unitType'),
      width: 100,
      align: 'center',
      renderCell: (params) => {
        const { itemId } = params?.row
        return getItemObject(itemId)?.itemUnit?.name
      },
    },
  ]

  // const renderColumn = () => {
  //   if (isView) {
  //     return columnsDetail
  //   } else if (isUpdate) {
  //     return columnUpdate
  //   } else return columns
  // }

  useEffect(() => {
    const itemsInSaleOrder = props.saleOrder?.itemSchedules || []
    setItems(getItemsInTable(itemsInSaleOrder))
    setSelectedRows([])
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

  const onSelectionChange = (selected) => {
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
        columns={isView ? columnsDetail : columns}
        rows={isView ? moDetails?.manufacturingOrderDetails : items}
        hideFooter
        hideSetting
        pageSize={pageSize}
        page={page}
        selected={selectedRows}
        {...(isView
          ? {}
          : {
              onSelectionChange: onSelectionChange,
            })}
      />
    </>
  )
}

export default ItemsSettingTable
