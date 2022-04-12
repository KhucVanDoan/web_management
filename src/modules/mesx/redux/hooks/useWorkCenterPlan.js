import { useMemo } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import workCenterPlanActions from '../actions/work-center-plan.action'

const useWorkCenterPlan = () => {
  const data = useSelector((state) => state.workCenterPlan)

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(workCenterPlanActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useWorkCenterPlan
