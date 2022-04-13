import { useMemo } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import inputQualityControlPlanActions from '~/modules/qmsx/redux/actions/input-quality-control-plan'

export const useInputQualityControlPlan = () => {
  const data = useSelector((state) => state.inputQualityControlPlan)

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(inputQualityControlPlanActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useInputQualityControlPlan
