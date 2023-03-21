import React, { useEffect, useMemo } from 'react'

import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { isEmpty } from 'lodash'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import { MODAL_MODE } from '~/common/constants'
import { useQueryState } from '~/common/hooks'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import NumberFormatText from '~/components/NumberFormat'
import useInventoryStatistics from '~/modules/wmsx/redux/hooks/useInventoryStatistics'
import useLocationManagement from '~/modules/wmsx/redux/hooks/useLocationManagement'
import { convertFilterParams, scrollToBottom } from '~/utils'

const ItemSettingTable = ({ items, mode, arrayHelpers }) => {
  const { t } = useTranslation(['wmsx'])
  const isView = mode === MODAL_MODE.DETAIL
  const {
    data: { inventoryStatisticList, total },
    actions: getItemByLocationId,
  } = useInventoryStatistics()
  const {
    data: { locationDetails },
  } = useLocationManagement()
  const { page, pageSize, setPage, setPageSize } = useQueryState()
  useEffect(() => {
    if (!isEmpty(locationDetails)) {
      const params = {
        page,
        limit: pageSize,
        filter: convertFilterParams({
          warehouseId: locationDetails?.warehouse?.id,
          locatorId: locationDetails?.locatorId,
        }),
      }
      getItemByLocationId.searchInventoryStatistics(params)
    }
  }, [page, pageSize, locationDetails])
  const getColumns = useMemo(
    () => [
      {
        field: 'id',
        headerName: t(''),
        width: 50,
        renderCell: (_, index) => {
          return index + 1
        },
      },
      {
        field: 'itemCode',
        headerName: t('locationManagement.item.code'),
        width: 200,
      },
      {
        field: 'itemName',
        headerName: t('locationManagement.item.name'),
        width: 200,
      },
      {
        field: 'quantity',
        headerName: t('locationManagement.item.quantity'),
        width: 200,
        renderCell: (params) => (
          <NumberFormatText value={params.row?.stock} formatter="quantity" />
        ),
      },
      {
        field: 'lotNumber',
        headerName: t('locationManagement.item.lotNumber'),
        width: 200,
        renderCell: (params) => params.row.locations?.[0]?.lots?.[0]?.lotNumber,
      },
      {
        field: 'price',
        headerName: t('locationManagement.item.price'),
        width: 200,
        renderCell: (params) => (
          <NumberFormatText value={params.row?.amount} formatter="price" />
        ),
      },
      {
        field: 'intoMoney',
        headerName: t('locationManagement.item.intoMoney'),
        width: 200,
        renderCell: (params) => (
          <NumberFormatText value={params.row.totalAmount} formatter="price" />
        ),
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
          {t('locationManagement.itemsDetails')}
        </Typography>

        {!isView && (
          <Button
            variant="outlined"
            onClick={() => {
              arrayHelpers.push({
                id: new Date().getTime(),
                itemId: '',
                quantity: 1,
              })
              scrollToBottom()
            }}
          >
            {t('locationManagement.item.addItem')}
          </Button>
        )}
      </Box>
      <DataTable
        rows={inventoryStatisticList}
        columns={getColumns}
        total={total}
        striped={false}
        pageSize={pageSize}
        page={page}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        hideSetting
      />
    </>
  )
}

ItemSettingTable.propTypes = {
  arrayHelpers: PropTypes.shape(),
  items: PropTypes.array,
  mode: PropTypes.string,
}

export default ItemSettingTable
