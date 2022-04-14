import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import workOrderActions from '../actions/work-order'

export const useWorkOrder = () => {
  const data = useSelector((state) => get(state, 'mesx.workOrder'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(workOrderActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}
