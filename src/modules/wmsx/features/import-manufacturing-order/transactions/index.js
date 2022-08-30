import React from 'react'

import { useHistory, useParams } from 'react-router-dom'

import { MOVEMENT_TYPE } from '~/modules/wmsx/constants'
import MovementDetail from '~/modules/wmsx/features/movements/detail'
import Movements from '~/modules/wmsx/features/movements/list'
import { ROUTE } from '~/modules/wmsx/routes/config'

export const Transactions = () => {
  const history = useHistory()
  const breadcrumbs = [
    {
      title: 'orderManagement',
    },
    {
      route: ROUTE.IMPORT_MANUFACTURING_ORDER.LIST.PATH,
      title: ROUTE.IMPORT_MANUFACTURING_ORDER.LIST.TITLE,
    },
    {
      title: ROUTE.IMPORT_MANUFACTURING_ORDER.TRANSACTIONS.LIST.TITLE,
    },
  ]

  const movementType =
    MOVEMENT_TYPE.TRANSFER_IMPORT +
    ',' +
    MOVEMENT_TYPE.IMO_IMPORT +
    ',' +
    MOVEMENT_TYPE.EMO_EXPORT

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
      route: ROUTE.IMPORT_MANUFACTURING_ORDER.LIST.PATH,
      title: ROUTE.IMPORT_MANUFACTURING_ORDER.LIST.TITLE,
    },
    {
      route: ROUTE.IMPORT_MANUFACTURING_ORDER.TRANSACTIONS.LIST.PATH.replace(
        ':parentId',
        `${parentId}`,
      ),
      title: ROUTE.IMPORT_MANUFACTURING_ORDER.TRANSACTIONS.LIST.TITLE,
    },
    {
      title: ROUTE.IMPORT_MANUFACTURING_ORDER.TRANSACTIONS.DETAIL.TITLE,
    },
  ]

  return (
    <MovementDetail
      breadcrumbs={breadcrumbs}
      onBack={() => history.push(breadcrumbs[2].route)}
    />
  )
}
