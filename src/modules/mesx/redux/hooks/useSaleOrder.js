import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import saleOrderActions from '../actions/sale-order'

const useSaleOrder = () => {
  const data = useSelector((state) => get(state, 'mesx.saleOrder'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(saleOrderActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useSaleOrder
