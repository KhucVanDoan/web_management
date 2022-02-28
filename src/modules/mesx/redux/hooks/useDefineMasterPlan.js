import { useMemo } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import MasterPlanActions from '../actions/master-plan.action'

export const useDefineMasterPlan = () => {
  const data = useSelector((state) => state.defineMasterPlan)

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(MasterPlanActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}
