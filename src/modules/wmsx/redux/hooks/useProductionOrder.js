import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import productionOrderActions from '~/modules/wmsx/redux/actions/production-order'

const useProductionOrder = () => {
  const data = useSelector((state) => get(state, 'wmsx.productionOrder'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(productionOrderActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useProductionOrder
