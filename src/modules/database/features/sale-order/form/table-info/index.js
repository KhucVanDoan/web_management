import React, { useEffect, useState } from 'react'

import { Box, Typography } from '@mui/material'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'

import { MODAL_MODE } from '~/common/constants'
import DataTable from '~/components/DataTable'
import NumberFormatText from '~/components/NumberFormat'
import useSaleOrder from '~/modules/database/redux/hooks/useSaleOrder'
import { api } from '~/services/api'

function TableInfo(props) {
  const { t } = useTranslation(['database'])
  const { items = [], mode } = props
  const [dataList, setDataList] = useState([])
  const isCreate = mode === MODAL_MODE.CREATE

  const {
    data: { saleOrderDetails: saleOrder },
  } = useSaleOrder()

  const materialPreviewApi = (params) => {
    const url = `/v1/produces/materials/stocks/available/preview`
    return api.post(url, params)
  }

  const getMaterialPreview = async () => {
    let itemList
    if (isCreate) {
      itemList = items.map((item) => ({
        id: item?.item?.id,
        quantity: item?.quantity,
      }))
    } else {
      itemList = saleOrder?.saleOrderDetails?.map((item) => ({
        id: item?.itemId,
        quantity: Number(item?.quantity),
      }))
    }
    const params = {
      items: itemList,
    }
    const res = await materialPreviewApi(params)
    if (res.statusCode === 200) {
      setDataList(res.data)
    }
  }
  useEffect(() => {
    if (!isEmpty(items[0]?.item) || !items) {
      getMaterialPreview()
    } else if (mode === MODAL_MODE.DETAIL) {
      getMaterialPreview()
    }
    return () => setDataList([])
  }, [])

  const columns = [
    {
      field: 'id',
      headerName: '#',
      width: 80,
      align: 'center',
      renderCell: (_, index) => {
        return index + 1
      },
    },
    {
      field: 'itemName',
      headerName: t('saleOrder.itemInfo.itemName'),
      width: 120,
      renderCell: (params) => {
        return params.row?.item?.name
      },
    },
    {
      field: 'code',
      headerName: t('saleOrder.itemInfo.code'),
      width: 120,
      renderCell: (params) => {
        return params.row?.material?.code
      },
    },
    {
      field: 'name',
      headerName: t('saleOrder.itemInfo.name'),
      width: 120,
      renderCell: (params) => {
        return params.row?.material?.name
      },
    },
    {
      field: 'quantity',
      headerName: t('saleOrder.itemInfo.quantity'),
      width: 120,
      align: 'right',
      headerAlign: 'left',
      renderCell: (params) => {
        return params.row?.material?.planQuantity
      },
    },
    {
      field: 'remainQuantity',
      headerName: t('saleOrder.itemInfo.remainQuantity'),
      width: 120,
      align: 'right',
      headerAlign: 'left',
      renderCell: (params) => {
        return params.row?.material?.availableStock
      },
    },
    {
      field: 'actualQuantity',
      headerName: t('saleOrder.itemInfo.actualQuantity'),
      width: 120,
      align: 'right',
      headerAlign: 'left',
      renderCell: (params) => {
        return params.row?.material?.requestQuantity
      },
    },
    {
      field: 'itemPrice',
      headerName: t('saleOrder.itemInfo.itemPrice'),
      width: 120,
      align: 'right',
      renderCell: (params) => {
        return <NumberFormatText value={params.row?.material?.price} />
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
        <Typography variant="h4">{t('saleOrder.itemsInfo')}</Typography>
      </Box>
      <DataTable
        rows={dataList}
        columns={columns}
        total={dataList?.length}
        hideSetting
        hideFooter
        striped={false}
      />
    </>
  )
}

export default TableInfo
