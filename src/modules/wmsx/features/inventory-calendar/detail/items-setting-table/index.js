import React, { useEffect } from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { useQueryState } from '~/common/hooks'
import DataTable from '~/components/DataTable'
import useInventoryCalendar from '~/modules/wmsx/redux/hooks/useInventoryCalendar'

function ItemSettingTable() {
  const { t } = useTranslation(['wmsx'])
  const { id } = useParams()

  const {
    data: { itemUpdate, totalItemDetail },
    actions,
  } = useInventoryCalendar()

  const { page, pageSize, setPage, setPageSize } = useQueryState()
  useEffect(() => {
    refreshData()
  }, [id, page, pageSize])
  const refreshData = () => {
    const params = {
      id: id,
      page: page,
      limit: pageSize,
    }
    actions.getItem(params)
  }

  const getColumns = () => {
    return [
      {
        field: 'id',
        headerName: '#',
        width: 50,
        renderCell: (_, index) => {
          return index + 1
        },
      },
      {
        field: 'itemCode',
        headerName: t('inventoryCalendar.items.itemCode'),
        width: 180,
        renderCell: (params) => {
          return params?.row?.itemCode?.code
        },
      },
      {
        field: 'itemName',
        headerName: t('inventoryCalendar.items.itemName'),
        width: 180,
        renderCell: (params) => {
          return params?.row?.itemCode?.name
        },
      },
      {
        field: 'unit',
        headerName: t('inventoryCalendar.items.unit'),
        width: 180,
        renderCell: (params) => {
          return params?.row?.itemCode?.itemUnit?.name
        },
      },
    ]
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
        <Typography variant="h4">
          {t('inventoryCalendar.items.tableTitle')}
        </Typography>
      </Box>
      <DataTable
        rows={itemUpdate?.map((i, index) => ({
          id: index,
          itemCode: { ...i, name: i?.item?.name, code: i?.item?.code },
        }))}
        columns={getColumns()}
        total={totalItemDetail}
        pageSize={pageSize}
        page={page}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        hideSetting
        striped={false}
      />
    </>
  )
}

export default ItemSettingTable
