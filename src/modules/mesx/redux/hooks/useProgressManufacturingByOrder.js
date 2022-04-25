import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import progressManufacturingByOrderAction from '../actions/progress-by-order'
const useProgressManufacturingByOrder = () => {
  const data = useSelector((state) =>
    get(state, 'mesx.progressManufacturingByOrder'),
  )

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(progressManufacturingByOrderAction, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useProgressManufacturingByOrder
