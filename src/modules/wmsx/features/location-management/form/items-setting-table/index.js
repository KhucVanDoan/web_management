import React, { useMemo } from 'react'

import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import { MODAL_MODE } from '~/common/constants'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { scrollToBottom } from '~/utils'

const ItemSettingTable = ({ items, mode, arrayHelpers }) => {
  const { t } = useTranslation(['wmsx'])
  const isView = mode === MODAL_MODE.DETAIL

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
        field: 'code',
        headerName: t('locationManagement.item.code'),
        width: 200,
      },
      {
        field: 'name',
        headerName: t('locationManagement.item.name'),
        width: 200,
      },
      {
        field: 'quantity',
        headerName: t('locationManagement.item.quantity'),
        width: 200,
        renderCell: (params) => Number(params.row?.quantity),
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
      },
      {
        field: 'intoMoney',
        headerName: t('locationManagement.item.intoMoney'),
        width: 200,
      },
      // {
      //   field: 'remove',
      //   headerName: '',
      //   width: 50,
      //   align: 'center',
      //   hide: isView,
      //   renderCell: (params) => {
      //     const idx = items.findIndex((item) => item.id === params.row.id)
      //     return (
      //       <IconButton
      //         type="button"
      //         onClick={() => {
      //           arrayHelpers.remove(idx)
      //         }}
      //         disabled={items?.length === 1}
      //       >
      //         <Icon name="remove" />
      //       </IconButton>
      //     )
      //   },
      // },
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

ItemSettingTable.defaultProps = {
  items: [],
  mode: '',
  arrayHelpers: {},
}

ItemSettingTable.propTypes = {
  arrayHelpers: PropTypes.shape(),
  items: PropTypes.array,
  mode: PropTypes.string,
}

export default ItemSettingTable
