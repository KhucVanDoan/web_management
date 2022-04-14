import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import inputQualityControlPlanActions from '~/modules/qmsx/redux/actions/input-quality-control-plan'

export const useInputQualityControlPlan = () => {
  const data = useSelector((state) =>
    get(state, 'qmsx.inputQualityControlPlan'),
  )

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
