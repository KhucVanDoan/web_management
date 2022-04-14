import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import workCenterPlanQualityControlActions from '../actions/work-center-quality-control-plan'

const useWorkCenterQualityControlPlan = () => {
  const data = useSelector((state) =>
    get(state, 'qmsx.workCenterQualityControlPlan'),
  )

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(workCenterPlanQualityControlActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useWorkCenterQualityControlPlan
