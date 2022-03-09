import { useMemo } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as materialDetailPlanAction from '../actions/material-detail-plan'

export const useMaterialPlanDetail = () => {
  const data = useSelector((state) => state.materialDetailPlan)

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(materialDetailPlanAction, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}
