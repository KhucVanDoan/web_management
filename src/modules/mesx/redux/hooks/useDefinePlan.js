import { useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import PlanActions from '../actions/plan.action'

export const useDefinePlan = () => {
  const data = useSelector((state) => state.definePlan)

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(PlanActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}
