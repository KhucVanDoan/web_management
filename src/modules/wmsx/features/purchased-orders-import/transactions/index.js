import React from 'react'

import { useHistory, useParams } from 'react-router-dom'

import { MOVEMENT_TYPE } from '~/modules/wmsx/constants'
import MovementDetail from '~/modules/wmsx/features/movements/detail-import'
import Movements from '~/modules/wmsx/features/movements/list'
import { ROUTE } from '~/modules/wmsx/routes/config'

export const Transactions = () => {
  const history = useHistory()
  const breadcrumbs = [
    {
      title: 'orderManagement',
    },
    {
      route: ROUTE.PURCHASED_ORDER_IMPORT.LIST.PATH,
      title: ROUTE.PURCHASED_ORDER_IMPORT.LIST.TITLE,
    },
    {
      title: ROUTE.PURCHASED_ORDER_IMPORT.TRANSACTIONS.LIST.TITLE,
    },
  ]

  const movementType =
    MOVEMENT_TYPE.TRANSFER_IMPORT + ',' + MOVEMENT_TYPE.PO_IMPORT

  return (
    <Movements
      breadcrumbs={breadcrumbs}
      movementType={movementType}
      onBack={() => history.push(breadcrumbs[1].route)}
    />
  )
}

export const TransactionDetail = () => {
  const history = useHistory()
  const { parentId } = useParams()

  const breadcrumbs = [
    {
      title: 'warehouseSetup',
    },
    {
      route: ROUTE.PURCHASED_ORDER_IMPORT.LIST.PATH,
      title: ROUTE.PURCHASED_ORDER_IMPORT.LIST.TITLE,
    },
    {
      route: ROUTE.PURCHASED_ORDER_IMPORT.TRANSACTIONS.LIST.PATH.replace(
        ':parentId',
        `${parentId}`,
      ),
      title: ROUTE.PURCHASED_ORDER_IMPORT.TRANSACTIONS.LIST.TITLE,
    },
    {
      title: ROUTE.PURCHASED_ORDER_IMPORT.TRANSACTIONS.DETAIL.TITLE,
    },
  ]

  return (
    <MovementDetail
      breadcrumbs={breadcrumbs}
      onBack={() => history.push(breadcrumbs[2].route)}
    />
  )
}
