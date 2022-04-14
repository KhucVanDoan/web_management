import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import outputQualityControlPlanActions from '~/modules/qmsx/redux/actions/output-quality-control-plan'

export const useOutputQualityControlPlan = () => {
  const data = useSelector((state) =>
    get(state, 'qmsx.outputQualityControlPlan'),
  )

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(outputQualityControlPlanActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useOutputQualityControlPlan
