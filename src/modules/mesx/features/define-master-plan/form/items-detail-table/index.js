import React, { useEffect, useState } from 'react'

import { useTranslation } from 'react-i18next'

import DataTable from '~/components/DataTable'
import useSaleOrder from '~/modules/mesx/redux/hooks/useSaleOrder'
import { formatDateTimeUtc } from '~/utils/date-time';

const ItemsDetailTable = (props) => {
  const { t } = useTranslation(['mesx'])
  const {
    data: { saleOrderDetails },
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
      field: 'saleOrder',
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
    {
      field: 'planDate',
      headerName: t('defineMasterPlan.itemDetail.planDate'),
      align: 'center',
      sortable: false,
    },
  ]

  useEffect(() => {
    actions.getSaleOrderDetailsById(props.soId)
  }, [props.soId])

  useEffect(() => {
    getItemsInSo()
  }, [saleOrderDetails, props.planDate])

  const getItemsInSo = () => {
    const itemsInSo = saleOrderDetails?.saleOrderDetails?.map((saleOrder) => ({
      saleOrder: saleOrderDetails.name,
      itemName: saleOrder?.item?.name,
      unit: saleOrder?.item?.itemUnit,
      quantityPlan: saleOrder.quantity,
      quantityActual: saleOrder.actualQuantity,
      bomName: saleOrder?.item?.bom?.name,
      routingName: saleOrder?.item?.bom?.code,
      planDate: props.planDate?.map(date => formatDateTimeUtc(date, 'dd/MM/yyyy'))?.join(' - ')
    }))
    setItemsDetail(itemsInSo)
  }

  return (
    <DataTable
      rows={itemsDetail}
      columns={columns}
    />
  )
}

export default ItemsDetailTable;
