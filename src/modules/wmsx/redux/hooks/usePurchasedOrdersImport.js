import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import purchasedOrdersImportActions from '../actions/purchased-orders-import'

const usePurchasedOrdersImport = () => {
  const data = useSelector((state) => get(state, 'wmsx.purchasedOrdersImport'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(purchasedOrdersImportActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default usePurchasedOrdersImport
