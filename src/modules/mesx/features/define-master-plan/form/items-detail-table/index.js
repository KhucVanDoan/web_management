import React, { useEffect, useState } from 'react'

import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

import DataTable from '~/components/DataTable'
import useSaleOrder from '~/modules/database/redux/hooks/useSaleOrder'
import qs from '~/utils/qs'

const ItemsDetailTable = (props) => {
  const { soId = [], planDate, isView, isUpdate } = props
  const { t } = useTranslation(['mesx'])
  const location = useLocation()
  const { cloneId } = qs.parse(location.search)
  const {
    data: { saleOrderDetailList },
    actions,
  } = useSaleOrder()

  const [itemsDetail, setItemsDetail] = useState()
  const columns = [
    {
      field: 'itemName',
      headerName: t('defineMasterPlan.itemDetail.itemName'),
      width: 150,
      align: 'left',
      sortable: false,
    },
    {
      field: 'bomName',
      headerName: t('defineMasterPlan.itemDetail.bomName'),
      align: 'center',
      sortable: false,
    },
    {
      field: 'routingName',
      headerName: t('defineMasterPlan.itemDetail.routingName'),
      align: 'center',
      sortable: false,
    },
    {
      field: 'saleOrderName',
      headerName: t('defineMasterPlan.itemDetail.saleOrder'),
      align: 'center',
      sortable: false,
    },
    {
      field: 'quantityPlan',
      headerName: t('defineMasterPlan.itemDetail.quantityPlan'),
      align: 'center',
      sortable: false,
    },
    {
      field: 'quantityActual',
      headerName: t('defineMasterPlan.itemDetail.quantityActual'),
      align: 'center',
      sortable: false,
    },
    {
      field: 'unit',
      headerName: t('defineMasterPlan.itemDetail.unit'),
      align: 'center',
      sortable: false,
    },
  ]

  useEffect(() => {
    if ((isView || isUpdate || cloneId) && !isEmpty(soId)) {
      actions.getSaleOrderDetailsByIds({ ids: soId?.join(',') })
    }
    return () => {
      actions.resetSaleOrderListState()
    }
  }, [soId])

  useEffect(() => {
    getItemsInSo(saleOrderDetailList)
    if (isEmpty(soId)) {
      setItemsDetail([])
    }
  }, [saleOrderDetailList, planDate, soId])

  const getItemsInSo = (saleOrders = []) => {
    const itemsInSo = []
    saleOrders.forEach((saleOrder) => {
      saleOrder?.saleOrderDetails?.forEach((saleOrderDetail) => {
        const { item, quantity, actualQuantity } = saleOrderDetail
        itemsInSo.push({
          saleOrderName: saleOrder.name,
          itemName: item?.name,
          unit: item?.itemUnit,
          quantityPlan: quantity,
          quantityActual: actualQuantity,
          bomName: item?.bom?.name,
          routingName: item?.bom?.code,
        })
      })
    })

    setItemsDetail(itemsInSo)
  }

  return (
    <DataTable rows={itemsDetail} columns={columns} hideSetting hideFooter />
  )
}

export default ItemsDetailTable
