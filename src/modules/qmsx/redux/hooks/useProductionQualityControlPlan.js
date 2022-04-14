import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import productionQualityControlPlanActions from '~/modules/qmsx/redux/actions/production-quality-control-plan'

export const useProductionQualityControlPlan = () => {
  const data = useSelector((state) =>
    get(state, 'qmsx.productionQualityControlPlan'),
  )

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(productionQualityControlPlanActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useProductionQualityControlPlan
