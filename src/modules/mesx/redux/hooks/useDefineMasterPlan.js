import { useMemo } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import masterPlanActions from '../actions/master-plan'

export const useDefineMasterPlan = () => {
  const data = useSelector((state) => state.defineMasterPlan)

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(masterPlanActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}
