import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import purchasedOrderActions from '~/modules/database/redux/actions/purchased-order'

const usePurchasedOrder = () => {
  const data = useSelector((state) => get(state, 'database.purchasedOrder'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(purchasedOrderActions, dispatch),
    [dispatch],
  )
  return {
    actions,
    data,
  }
}

export default usePurchasedOrder
