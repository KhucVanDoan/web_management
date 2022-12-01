import React from 'react'

import { useHistory, useParams } from 'react-router-dom'

import { MOVEMENT_TYPE } from '~/modules/wmsx/constants'
import MovementTransferDetail from '~/modules/wmsx/features/movements/detail-transfer'
import Movements from '~/modules/wmsx/features/movements/list'
import { ROUTE } from '~/modules/wmsx/routes/config'

export const Transactions = () => {
  const history = useHistory()
  const breadcrumbs = [
    {
      title: 'receiptCommandManagement',
    },
    {
      route: ROUTE.WAREHOUSE_TRANSFER.LIST.PATH,
      title: ROUTE.WAREHOUSE_TRANSFER.LIST.TITLE,
    },
    {
      title: ROUTE.WAREHOUSE_TRANSFER.TRANSACTIONS.LIST.TITLE,
    },
  ]

  const movementType = MOVEMENT_TYPE.TRANSFER_EXPORT

  const movementTypeOpts = [
    {
      id: 6,
      text: 'movementType.stored',
    },
    {
      id: 7,
      text: 'movementType.export',
    },
  ]

  return (
    <Movements
      breadcrumbs={breadcrumbs}
      movementType={movementType}
      movementTypeOpts={movementTypeOpts}
      onBack={() => history.push(breadcrumbs[1].route)}
    />
  )
}

export const TransactionDetail = () => {
  const history = useHistory()
  const { parentId } = useParams()

  const breadcrumbs = [
    {
      title: 'receiptCommandManagement',
    },
    {
      route: ROUTE.WAREHOUSE_TRANSFER.LIST.PATH,
      title: ROUTE.WAREHOUSE_TRANSFER.LIST.TITLE,
    },
    {
      route: ROUTE.WAREHOUSE_TRANSFER.TRANSACTIONS.LIST.PATH.replace(
        ':parentId',
        `${parentId}`,
      ),
      title: ROUTE.WAREHOUSE_TRANSFER.TRANSACTIONS.LIST.TITLE,
    },
    {
      title: ROUTE.WAREHOUSE_TRANSFER.TRANSACTIONS.DETAIL.TITLE,
    },
  ]

  return (
    <MovementTransferDetail
      breadcrumbs={breadcrumbs}
      onBack={() => history.push(breadcrumbs[2].route)}
    />
  )
}
