import React, { useEffect, useState } from 'react'

import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'

import DataTable from '~/components/DataTable'
import useSaleOrder from '~/modules/mesx/redux/hooks/useSaleOrder'

const ItemsDetailTable = (props) => {
  const { soId = [], planDate } = props
  const { t } = useTranslation(['mesx'])
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
    if (!isEmpty(soId)) {
      actions.getSaleOrderDetailsByIds({ ids: soId.join(',') })
    } else {
      setItemsDetail([])
    }
  }, [soId])

  useEffect(() => {
    getItemsInSo(saleOrderDetailList)
    return () => actions.resetSaleOrderState()
  }, [saleOrderDetailList, planDate])

  const getItemsInSo = (saleOrders = []) => {
    const itemsInSo = [];
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
    });
    
    setItemsDetail(itemsInSo)
  }

  return (
    <DataTable rows={itemsDetail} columns={columns} hideSetting hideFooter />
  )
}

export default ItemsDetailTable
