import React, { useEffect, useState } from 'react'

import Checkbox from '@mui/material/Checkbox'
import { isEmpty, groupBy, keyBy, mapValues } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

import { MATERIAL_CODE } from '~/common/constants'
import TableCollapse from '~/components/TableCollapse'
import useSaleOrder from '~/modules/database/redux/hooks/useSaleOrder'
import useBOM from '~/modules/mesx/redux/hooks/useBOM'
import { useDefineMasterPlan } from '~/modules/mesx/redux/hooks/useDefineMasterPlan'
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
  const {
    actions: bomActions
  } = useBOM()
  const {
    data: { masterPlanDetails },
  } = useDefineMasterPlan()
  const [itemsDetail, setItemsDetail] = useState()
  const [productionObjectByItemId, setProductionObjectByItemId] = useState({})
  const [disabledProductionObjects, setDisabledProductionObjects] = useState({})

  const columns = [
    {
      field: 'itemName',
      headerName: t('defineMasterPlan.itemDetail.itemName'),
      width: 150,
      align: 'left',
      sortable: false,
    },
    {
      field: 'saleOrderName',
      headerName: t('defineMasterPlan.itemDetail.saleOrderName'),
      align: 'center',
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

  const boms = [
    {
      field: 'itemCode',
      headerName: t('defineMasterPlan.itemDetail.itemCode'),
      align: 'left',
      sortable: false,
    },
    {
      field: 'itemName',
      headerName: t('defineMasterPlan.itemDetail.itemName'),
      align: 'left',
      width: 100,
      sortable: false,
    },
    {
      field: 'quantity',
      headerName: t('defineMasterPlan.itemDetail.quantity'),
      align: 'right',
      sortable: false,
    },
    {
      field: 'unit',
      headerName: t('defineMasterPlan.itemDetail.unit'),
      align: 'center',
      sortable: false,
    },
    {
      field: 'itemType',
      headerName: t('defineMasterPlan.itemDetail.itemType'),
      align: 'left',
      sortable: false,
    },
    {
      field: 'isProductionObject',
      headerName: t('defineMasterPlan.itemDetail.productionObject'),
      align: 'left',
      sortable: false,
      renderCell: (params) => {
        return params.row?.itemTypeCode !== MATERIAL_CODE && (
          <>
            <Checkbox
              defaultChecked={params.row?.isProductionObject}
              checked={productionObjectByItemId[params.row?.id]}
              onChange={(e) => changeSaleOrdersObject(params.row?.id, e.target.checked)}
              disabled={disabledProductionObjects[params.row?.id] || isView}
            />
            {params.row?.id}
          </>
        )
      },
    }
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

  useEffect(() => {
    // set soId when update
    if (masterPlanDetails?.saleOrders && (isUpdate || cloneId || isView)) {
      const parsedItems = masterPlanDetails?.saleOrders.map((saleOrder) => (
        parseItemsInSaleOrder(saleOrder.items, saleOrder.id)
      )).flat()
      setProductionObjectByItemId(mapValues(keyBy(parsedItems, 'id'), 'isProductionObject'))
    }
  }, [masterPlanDetails])

  useEffect(() => {
    changeSaleOrdersObject()
  }, [itemsDetail])

  const parseItemsInSaleOrder = (items, parentBomId) => {
    let results = []
    items.forEach((item) => {
      const newItem = {
        id: `${item.itemId}-${parentBomId}`,
        isProductionObject: item.isProductionObject,
      }
      if (!isEmpty(item.subBoms)) {
        const subBoms = parseItemsInSaleOrder(item.subBoms, newItem.id)
        results = results.concat(subBoms)
      }
      results.push(newItem)
    })
    return results.flat()
  }

  const getItemsInSo = (saleOrders = []) => {
    const itemsInSo = []
    saleOrders.forEach((saleOrder) => {
      const { boq } = saleOrder
      saleOrder?.saleOrderDetails?.forEach((saleOrderDetail) => {
        const { item, quantity, actualQuantity } = saleOrderDetail
        itemsInSo.push({
          saleOrderId: saleOrder.id,
          saleOrderName: saleOrder.name,
          itemName: item?.name,
          unit: item?.itemUnit,
          quantityPlan: quantity,
          quantityActual: actualQuantity,
          id: item?.bom?.id,
          bomName: item?.bom?.name,
          routingName: boq?.code,
          itemId: item?.itemId,
          isProductionObject: true
        })
      })
    })

    setItemsDetail(itemsInSo)
  }

  const changeToObjectCollapse = (data, parentBomId) => {
    return data.map((bom) => {
      const id = `${bom.item?.id}-${parentBomId}`
      let newItem = {
        id,
        itemId: bom.item?.id,
        itemCode: bom.item?.code,
        itemName: bom.item?.name,
        quantity: bom.quantity,
        unit: bom.item?.itemUnitName,
        itemType: bom.item?.itemType?.name,
        itemTypeCode: bom.item?.itemType?.code,
        isProductionObject: productionObjectByItemId[id] !== undefined
          ? productionObjectByItemId[id]
          : true
      }
      if (!isEmpty(bom.subBoms)) {
        newItem.subBom = [...changeToObjectCollapse(bom.subBoms, id)]
      } else {
        newItem.subBom = []
      }
      return newItem
    })
  }

  const handleGetBoms = (bomId) => {
    bomActions.getBOMStructureById(bomId, (response) => {
      const newItemsDetail = itemsDetail.map((item) => {
        if (item?.id === bomId && !item.subBom) {
          return {
            ...item,
            subBom: changeToObjectCollapse(
              response[0]?.subBoms,
              `${response[0]?.itemId}-${item.saleOrderId}`
            )
          }
        } else {
          return item
        }
      })
      setItemsDetail(newItemsDetail)

      let newProductionObjectState = { ...productionObjectByItemId }
      newItemsDetail.forEach((item) => {
        const parsedItem = mapValues(
          keyBy(parseItemsInSaleOrder(item.subBom, `${item.itemId}-${item.saleOrderId}`), 'id'),
          'isProductionObject'
        )
        newProductionObjectState = {
          ...newProductionObjectState,
          ...parsedItem
        }
      })
      setProductionObjectByItemId({ ...newProductionObjectState })
    })
  }

  const changeSaleOrdersObject = (id, value) => {
    const itemsBySaleOrder = groupBy(itemsDetail, 'saleOrderId')
    const result = Object.keys(itemsBySaleOrder).map((saleOrder) => ({
      id: Number(saleOrder),
      items: mapItemResults(itemsBySaleOrder[saleOrder], id, value)
    }))
    const newProductionObjectState = mapValues(
      keyBy(result.map((saleOrder) => (
        parseItemsInSaleOrder(saleOrder.items, saleOrder.id)
      )).flat(), 'id'),
      'isProductionObject'
    )
    setProductionObjectByItemId(newProductionObjectState)

    const newDisabledProductionObjects = { ...disabledProductionObjects }
    Object.keys(newProductionObjectState).forEach((key) => {
      if (id !== key.toString() && key.toString().includes(id)) {
        newDisabledProductionObjects[key] = !value
      }
    })
    setDisabledProductionObjects(newDisabledProductionObjects)

    if (props.updateSaleOrderObject) {
      props.updateSaleOrderObject(result)
    }
  }

  const mapItemResults = (items, id, value) => {
    return items.map((item) => {
      let isProductionObject = productionObjectByItemId[item.id] !== undefined
        ? productionObjectByItemId[item.id]
        : true
      if (item.id === id || item.id.toString().includes(id)) {
        isProductionObject = value
      }
      const itemResult = {
        itemId: item.itemId,
        isProductionObject,
        subBoms: []
      }
      if (!isEmpty(item.subBom)) {
        itemResult.subBoms = [...mapItemResults(item.subBom, id, value)]
      }
      return itemResult
    })
  }

  return (
    <TableCollapse
      hideSetting
      hideFooter
      rows={itemsDetail}
      columns={columns}
      additionColums={boms}
      handleGetData={handleGetBoms}
      isRoot={true}
      type={'list'}
      mode={'DETAIL'}
      isView={true}
    />
  )
}

export default ItemsDetailTable
