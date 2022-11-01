import React from 'react'

import { useHistory, useParams } from 'react-router-dom'

import { MOVEMENT_TYPE } from '~/modules/wmsx/constants'
import MovementImportDetail from '~/modules/wmsx/features/movements/detail-import'
import Movements from '~/modules/wmsx/features/movements/list'
import { ROUTE } from '~/modules/wmsx/routes/config'

export const Transactions = () => {
  const history = useHistory()
  const breadcrumbs = [
    {
      title: 'receiptCommandManagement',
    },
    {
      route: ROUTE.WAREHOUSE_IMPORT_RECEIPT.LIST.PATH,
      title: ROUTE.WAREHOUSE_IMPORT_RECEIPT.LIST.TITLE,
    },
    {
      title: ROUTE.WAREHOUSE_IMPORT_RECEIPT.TRANSACTIONS.LIST.TITLE,
    },
  ]

  const movementType = MOVEMENT_TYPE.PO_IMPORT_RECEIVE

  const movementTypeOpts = [
    {
      id: 18,
      text: 'movementType.import',
    },
    {
      id: 0,
      text: 'movementType.stored',
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
      route: ROUTE.WAREHOUSE_IMPORT_RECEIPT.LIST.PATH,
      title: ROUTE.WAREHOUSE_IMPORT_RECEIPT.LIST.TITLE,
    },
    {
      route: ROUTE.WAREHOUSE_IMPORT_RECEIPT.TRANSACTIONS.LIST.PATH.replace(
        ':parentId',
        `${parentId}`,
      ),
      title: ROUTE.WAREHOUSE_IMPORT_RECEIPT.TRANSACTIONS.LIST.TITLE,
    },
    {
      title: ROUTE.WAREHOUSE_IMPORT_RECEIPT.TRANSACTIONS.DETAIL.TITLE,
    },
  ]

  return (
    <MovementImportDetail
      breadcrumbs={breadcrumbs}
      onBack={() => history.push(breadcrumbs[2].route)}
    />
  )
}
